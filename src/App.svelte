<script>
	import { getData, suffixer } from "./utils";
	import { urls, types } from "./config";
	import Select from "./ui/Select.svelte";
	import Warning from "./ui/Warning.svelte";
	import { LineChart } from '@onsvisual/svelte-charts';
	import Report from './Report.svelte';
	import data from './data/example';

	let options, selected, place, ew, quartiles;
	let defaultLoc = 'Manchester';
	// Data load functions
	getData(urls.options).then(res => {
		res.forEach(d => {
			d.typepl = types[d.type].pl;
			d.typenm = types[d.type].name;
		});
		options = res.sort((a, b) => a.name.localeCompare(b.name));
		selected = options.find(d => d.name == defaultLoc);
		loadEW();
		loadArea(selected.code)});

	function loadArea(code) {
		fetch(urls.places + code + '.json')
		.then(res => res.json())
		.then(json => {
			json.children = options.filter(d => d.parent == code);
			json.siblings = options.filter(d => d.parent == json['parents'][0]['code']);
			
			if (json.count > 20) {
				fetch(urls.quantiles + json.type + '.json')
				.then(res => res.json())
				.then(quart => {
					quartiles = quart;
					place = json;
					console.log("Place", place)
				});
			} else {
				quartiles = null;
				place = json;
				console.log("Place", place)
			}
		})}

	function loadEW() {
		const code = 'K04000001';
		fetch(urls.places + code + '.json')
		.then(res => res.json())
		.then(json => {
			json.children = options.filter(d => d.parent == code);
			ew = json;
		})}

	// Create lists of topics and subjects that we want to weight against in the priority list
	let topicList = ["agemed", "travel", "tenure", "density"] 
	let subjectList = ["bus"] 

	// Creates a list of data objects to prioritise based on local rank, topic weightings, and magnitude of change
	function priorities(place) {
		let dataSelect = [];
		for (let i=0; i<50; i++) {
			// Filter ranks to only include change ranks and not include male and female population sizes
			if (place.Priorities[i].label.split("_")[2] == "change" & place.Priorities[i].label.split("_")[3] != "female" & place.Priorities[i].label.split("_")[3] != "male") {
				// If topic is age10yr then redirect to median age (keep age10yr sqrt as it is used to form weighting)
				if (place.Priorities[i].label.split("_")[0] == "age10yr") { place.Priorities[i] = {
						"label": "agemed_value_change_all", "value": place.data.agemed.value_rank_local.change.all, "abVal": place.data.agemed.value.change.all, "sqrt": place.Priorities[i].sqrt, "alt": place.Priorities[i].label } }
				// Less interested in these groups, this will be expanded into a more general rule for prioritising certain topics
				if (topicList.includes(place.Priorities[i].label.split("_")[0])) {
					place.Priorities[i].weight = place.Priorities[i].sqrt + 1;
				} else { place.Priorities[i].weight = place.Priorities[i].sqrt }
				// Less interested in these groups, this will be expanded into a more general rule for prioritising certain subjects
				if (subjectList.includes(place.Priorities[i].label.split("_")[3])) {
					place.Priorities[i].weight = place.Priorities[i].weight + 2;
				} else { place.Priorities[i].weight = place.Priorities[i].weight }
				dataSelect.push(place.Priorities[i])
			}
		}

		// Sort items by weight
		dataSelect.sort(function(a, b) { if (a.weight < b.weight) return -1; if (a.weight > b.weight) return 1; return 0; });
		// Sort by abVal for equally weighted items
		dataSelect.sort(function(a, b) { if (Math.abs(a.weight) == Math.abs(b.weight)) { if (a.abVal < b.abVal) return 1; if (a.abVal > b.abVal) return -1;} return 0; });

		// If there are two of the same topic in a row, remove the seoncd topic 
		for (let i = 0; i < (dataSelect.length-2); i++) {
			if (i+1>dataSelect.length) { return } // Exit loop if index exceeds length
			// if this index and next have same label then splice second item
			if (dataSelect[i].label.split("_")[0] == dataSelect[i+1].label.split("_")[0]) { dataSelect.splice(i+1, 1) }
			// if there are another two in a row after first removal, decrement i to rerun loop
			if (dataSelect[i].label.split("_")[0] == dataSelect[i+1].label.split("_")[0]) { i--; } }

		return dataSelect }
</script>
<Warning/>

{#if place && ew}
<div class="grid">
	<div class="text-small">
		{#if place.parents[0]}
		{#each [...place.parents].reverse() as parent, i}
		<a href="#{parent.code}" on:click="{() => loadArea(parent.code)}">{parent.name}</a>{@html ' &gt; '}
		{/each}
		{/if}
		{place.name}
	</div></div>
	
<div class="grid-2">
	<div>
		<div style="width: 440px; margin: 40px;">
			<span class="text-big">{place.name}</span><br/>
			{#if place.parents[0]}
			{types[place.type].name} in {place.parents[0].name}
			{/if}
		</div>
	</div>
	<div>
		<div style="width: 440px; float: right; margin: 80px;">
		<Select {options} bind:selected group="typenm" search={true} on:select="{() => { if (selected) { loadArea(selected.code) }}}"/>
		</div>
	</div></div>


<div class="section-2">
	<div>
		<Report place={place} priorities={priorities(place)} ew={ew} section=0></Report>
	</div>
	<div style="margin-top: 50px; margin-bottom: 50px; width: 80%">
        <span class="text-label">Population</span>
        <span>This chart is a placeholder</span>
        <br/>
        <span class="text-big">{place.data.population.value['2011'].all.toLocaleString()}</span>
        <span class="text-change" class:increase="{place.data.population.value.change.all > 0}">{place.data.population.value.change.all}%</span>
        {#if quartiles}
		<div class="chart">
			<LineChart data={data} xKey="year" yKey="value" zKey="group" stacked={true} line={false} areaOpacity={1}/>
		</div>
        {/if}
        {#if place.data.population.value_rank}
        <div class="text-small muted">{place.data.population.value_rank['2011'].all.toLocaleString()}{suffixer(place.data.population.value_rank['2011'].all)} most populous of {place.count.toLocaleString()} UK {types[place.type].pl.toLowerCase()}</div>
        {/if}</div>

	<div>
		<Report place={place} priorities={priorities(place)} ew={ew} section=1></Report>
	</div>
</div>

{#if place.children[0]}
<div class="grid mt">
	<div>
		<span class="text-label">{place.children[0].typepl} within {place.name}</span><br/>
		<span class="text-small">
		{#each place.children as child, i}
		<a href="#{child.code}" on:click="{() => loadArea(child.code)}">{child.name}</a>{ i < place.children.length - 1 ? ', ' : ''}
		{/each}
		</span>
	</div></div>
{/if}

<div class="grid-2 mt">
	<div>
		<img src="https://onsvisual.github.io/svelte-scrolly/img/ons-logo-pos-en.svg" alt="Office for National Statistics"/>
	</div>
	<div class="right">
		<span class="text-small">Source: Census 2011, with change +/- from Census 2001.</span>
	</div></div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
	:global(body) {
		font-family: 'Open Sans', sans-serif;
		padding: 20px;
		font-size: x-large;
		line-height: 2;
	}
	a {
		color: rgb(0, 60, 87);
	}
	img {
		width: 200px;
	}
	.text-big {
		font-size: 2em;
		font-weight: bold;
	}
	.text-small {
		font-size: 0.85em;
	}
	.text-label {
		font-weight: bold;
	}
	.text-change {
		color: red;
	}
	.muted {
		color: grey;
	}
	.increase {
		color: green;
	}
	.increase::before {
		content: "+";
	}
	.right {
		text-align: right;
	}
	.mt {
		margin-top: 20px;
	}
	.grid {
		display: grid;
		width: 100%;
		grid-gap: 20px;
		grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
		justify-content: stretch;
		grid-auto-flow: row dense;
	}
	.grid-2 {
		display: grid;
		width: 100%;
		grid-gap: 10px;
		grid-template-columns: auto auto;
	}
	.chart {
		width: 100%;
	}
	.section-2 {
		margin: auto;
		width: 60%;
		margin-top: 100px;
		margin-bottom: 100px;
	}
	.section-2 > div {
		margin-top: 60px;
	}
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
	:global(body) {
		font-family: 'Open Sans', sans-serif;
		padding: 20px;
	}
	a {
		color: rgb(0, 60, 87);
	}
	img {
		width: 200px;
	}
	.text-big {
		font-size: 2em;
		font-weight: bold;
	}
	.text-small {
		font-size: 0.85em;
	}
	.text-label {
		font-weight: bold;
	}
	.text-change {
		color: red;
	}
	.muted {
		color: grey;
	}
	.increase {
		color: green;
	}
	.increase::before {
		content: "+";
	}
	.right {
		text-align: right;
	}
	.mt {
		margin-top: 20px;
	}
	.grid {
		display: grid;
		width: 100%;
		grid-gap: 20px;
		grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
		justify-content: stretch;
		grid-auto-flow: row dense;
	}
	.grid-2 {
		display: grid;
		width: 100%;
		grid-gap: 10px;
		grid-template-columns: auto auto;
	}
	.chart {
		display: inline-block;
		height: 250px;
		width: 600px;
		margin-right: 20px;
		margin-bottom:  20px;
	}
	.section-2 {
		margin: auto;
		width: 60%;
		margin-top: 100px;
		margin-bottom: 100px;
	}
	.section-2 > div {
		margin-top: 30px;
	}
	</style>