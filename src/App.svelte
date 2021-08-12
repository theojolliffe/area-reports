<script>
	import { getData, suffixer } from "./utils";
	import { urls, types } from "./config";
	import Select from "./ui/Select.svelte";
	import Warning from "./ui/Warning.svelte";
	import { ScatterChart } from '@onsvisual/svelte-charts';
	import Report from './Report.svelte';
	let dataScatter =  [
	{
		year: 503127,
		value: 7.19,
    alt: 12,
    group: 'Manchester'
	},
	{
		year: 91004,
		value: 7.83,
    alt: 15,
    group: 'North West'
	},
	{
		year: 254100,
		value: 7.24,
    alt: 17,
    group: 'Rest of England and Wales'
	},
	{
		year: 132200,
		value: 7.44,
    alt: 28,
    group: 'North West'
	},
	{
		year: 471300,
		value: 7.51,
    alt: 28,
    group: 'North West'
	},
	{
		year: 198400,
		value: 7.1,
    alt: 17,
    group: 'North West'
	},
	{
		year: 218500,
		value: 6.91,
    alt: 11,
    group: 'North West'
	},
	{
		year: 474600,
		value: 7.53,
    alt: 13,
    group: 'North West'
	},
	{
		year: 291700,
		value: 7.47,
    alt: 18,
    group: 'North West'
	},
	{
		year: 198800,
		value: 7.48,
    alt: 20,
    group: 'North West'
	},
	{
		year: 288900,
		value: 7.03,
    alt: 24,
    group: 'North West'
	},
	{
		year: 119000,
		value: 6.23,
    alt: 26,
    group: 'North West'
	},
	{
		year: 291100,
		value: 6.54,
    alt: 16,
    group: 'North West'
	},
	{
		year: 479200,
		value: 7.54,
    alt: 25,
    group: 'North West'
	},
	{
		year: 95300,
		value: 6.5,
    alt: 28,
    group: 'North West'
	},
	{
		year: 139400,
		value: 7.18,
    alt: 11,
    group: 'North West'
	},
	{
		year: 411500,
		value: 6.12,
    alt: 19,
    group: 'North West'
	},
	{
		year: 194600,
		value: 7.87,
    alt: 14,
    group: 'North West'
	},
	{
		year: 259700,
		value: 6.73,
    alt: 22,
    group: 'North West'
	},
	{
		year: 479800,
		value: 6.55,
    alt: 13,
    group: 'North West'
	},
	{
		year: 391900,
		value: 6.23,
    alt: 30,
    group: 'North West'
	},
	{
		year: 210000,
		value: 6.31,
    alt: 27,
    group: 'North West'
	},
	{
		year: 474200,
		value: 6.74,
    alt: 13,
    group: 'North West'
	},
	{
		year: 280200,
		value: 5.95,
    alt: 18,
    group: 'North West'
	},
	{
		year: 301300,
		value: 6.13,
    alt: 15,
    group: 'North West'
	},
	{
		year: 470400,
		value: 6.04,
    alt: 11,
    group: 'North West'
	},
	{
		year: 310500,
		value: 5.56,
    alt: 29,
    group: 'Rest of England and Wales'
	},
	{
		year: 53400,
		value: 5.91,
    alt: 26,
    group: 'Rest of England and Wales'
	},
	{
		year: 431700,
		value: 4.29,
    alt: 10,
    group: 'Rest of England and Wales'
	},
	{
		year: 250800,
		value: 4.72,
    alt: 14,
    group: 'Rest of England and Wales'
	},
	{
		year: 320900,
		value: 5.38,
    alt: 21,
    group: 'Rest of England and Wales'
	},
	{
		year: 411000,
		value: 4.92,
    alt: 20,
    group: 'Rest of England and Wales'
	},
	{
		year: 321100,
		value: 4.61,
    alt: 24,
    group: 'Rest of England and Wales'
	},
	{
		year: 251200,
		value: 3.62,
    alt: 19,
    group: 'Rest of England and Wales'
	},
	{
		year: 431300,
		value: 5.35,
    alt: 12,
    group: 'Rest of England and Wales'
	},
	{
		year: 281400,
		value: 5.28,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 311500,
		value: 4.63,
    alt: 28,
    group: 'Rest of England and Wales'
	},
	{
		year: 434600,
		value: 4.72,
    alt: 30,
    group: 'Rest of England and Wales'
	},
	{
	year: 329450,
		value: 7.18,
    alt: 11,
    group: 'Rest of England and Wales'
	},
	{
		year: 139550,
		value: 6.12,
    alt: 19,
    group: 'Rest of England and Wales'
	},
	{
		year: 93150,
		value: 7.87,
    alt: 14,
    group: 'Rest of England and Wales'
	},
	{
		year: 119750,
		value: 6.73,
    alt: 22,
    group: 'Rest of England and Wales'
	},
	{
		year: 324850,
		value: 6.55,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 439950,
		value: 6.23,
    alt: 30,
    group: 'Rest of England and Wales'
	},
	{
		year: 351000,
		value: 6.31,
    alt: 27,
    group: 'Rest of England and Wales'
	},
	{
		year: 250100,
		value: 6.74,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 410200,
		value: 5.95,
    alt: 18,
    group: 'Rest of England and Wales'
	},
	{
		year: 284300,
		value: 6.13,
    alt: 15,
    group: 'Rest of England and Wales'
	},
	{
		year: 351400,
		value: 6.04,
    alt: 11,
    group: 'Rest of England and Wales'
	},
	{
		year: 430500,
		value: 5.56,
    alt: 29,
    group: 'Rest of England and Wales'
	},
	{
		year: 350600,
		value: 5.91,
    alt: 26,
    group: 'Rest of England and Wales'
	},
	{
		year: 210700,
		value: 4.29,
    alt: 10,
    group: 'Rest of England and Wales'
	},
	{
		year: 431800,
		value: 4.72,
    alt: 14,
    group: 'Rest of England and Wales'
	},
	{
		year: 50900,
		value: 5.38,
    alt: 21,
    group: 'Rest of England and Wales'
	},
	{
		year: 351000,
		value: 4.92,
    alt: 20,
    group: 'Rest of England and Wales'
	},
	{
		year: 471100,
		value: 4.61,
    alt: 24,
    group: 'Rest of England and Wales'
	},
	{
		year: 311200,
		value: 3.62,
    alt: 19,
    group: 'Rest of England and Wales'
	},
	{
		year: 254300,
		value: 5.35,
    alt: 12,
    group: 'Rest of England and Wales'
	},
	{
		year: 471400,
		value: 5.28,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 281500,
		value: 4.63,
    alt: 28,
    group: 'Rest of England and Wales'
	},
	{
		year: 351600,
		value: 4.72,
    alt: 30,
    group: 'Rest of England and Wales'
	},
	{
		year: 419450,
		value: 7.18,
    alt: 11,
    group: 'Rest of England and Wales'
	},
	{
		year: 324550,
		value: 6.12,
    alt: 19,
    group: 'Rest of England and Wales'
	},
	{
		year: 139650,
		value: 7.87,
    alt: 14,
    group: 'Rest of England and Wales'
	},
	{
		year: 431750,
		value: 6.73,
    alt: 22,
    group: 'Rest of England and Wales'
	},
	{
		year: 199850,
		value: 6.55,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 91950,
		value: 6.23,
    alt: 30,
    group: 'Rest of England and Wales'
	},
	{
		year: 434000,
		value: 6.31,
    alt: 27,
    group: 'Rest of England and Wales'
	},
	{
		year: 321100,
		value: 6.74,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 250200,
		value: 5.95,
    alt: 18,
    group: 'Rest of England and Wales'
	},
	{
		year: 430300,
		value: 6.13,
    alt: 15,
    group: 'Rest of England and Wales'
	},
	{
		year: 210400,
		value: 6.04,
    alt: 11,
    group: 'Rest of England and Wales'
	},
	{
		year: 321500,
		value: 5.56,
    alt: 29,
    group: 'Rest of England and Wales'
	},
	{
		year: 430600,
		value: 5.91,
    alt: 26,
    group: 'Rest of England and Wales'
	},
	{
		year: 320700,
		value: 4.29,
    alt: 10,
    group: 'Rest of England and Wales'
	},
	{
		year: 280800,
		value: 4.72,
    alt: 14,
    group: 'Rest of England and Wales'
	},
	{
		year: 411900,
		value: 5.38,
    alt: 21,
    group: 'Rest of England and Wales'
	},
	{
		year: 254000,
		value: 4.92,
    alt: 20,
    group: 'Rest of England and Wales'
	},
	{
		year: 321100,
		value: 4.61,
    alt: 24,
    group: 'Rest of England and Wales'
	},
	{
		year: 53200,
		value: 3.62,
    alt: 19,
    group: 'Rest of England and Wales'
	},
	{
		year: 351300,
		value: 5.35,
    alt: 12,
    group: 'Rest of England and Wales'
	},
	{
		year: 211400,
		value: 5.28,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 284500,
		value: 4.63,
    alt: 28,
    group: 'Rest of England and Wales'
	},
	{
		year: 281600,
		value: 4.72,
    alt: 30,
    group: 'Rest of England and Wales'
	},
	{
		year: 351000,
		value: 4.92,
    alt: 20,
    group: 'Rest of England and Wales'
	},
	{
		year: 281100,
		value: 4.61,
    alt: 24,
    group: 'Rest of England and Wales'
	},
	{
		year: 311200,
		value: 3.62,
    alt: 19,
    group: 'Rest of England and Wales'
	},
	{
		year: 284300,
		value: 5.35,
    alt: 12,
    group: 'Rest of England and Wales'
	},
	{
		year: 281400,
		value: 5.28,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 251500,
		value: 4.63,
    alt: 28,
    group: 'Rest of England and Wales'
	},
	{
		year: 351600,
		value: 4.72,
    alt: 30,
    group: 'Rest of England and Wales'
	},
	{
	year: 419450,
		value: 7.18,
    alt: 11,
    group: 'Rest of England and Wales'
	},
	{
		year: 99150,
		value: 6.12,
    alt: 19,
    group: 'Rest of England and Wales'
	},
	{
		year: 199650,
		value: 7.87,
    alt: 14,
    group: 'Rest of England and Wales'
	},
	{
		year: 289750,
		value: 6.73,
    alt: 22,
    group: 'Rest of England and Wales'
	},
	{
		year: 139850,
		value: 6.55,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 311950,
		value: 6.23,
    alt: 30,
    group: 'Rest of England and Wales'
	},
	{
		year: 284000,
		value: 6.31,
    alt: 27,
    group: 'Rest of England and Wales'
	},
	{
		year: 350100,
		value: 6.74,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 280200,
		value: 5.95,
    alt: 18,
    group: 'Rest of England and Wales'
	},
	{
		year: 281300,
		value: 6.13,
    alt: 15,
    group: 'Rest of England and Wales'
	},
	{
		year: 210400,
		value: 6.04,
    alt: 11,
    group: 'Rest of England and Wales'
	},
	{
		year: 354500,
		value: 5.56,
    alt: 29,
    group: 'Rest of England and Wales'
	},
	{
		year: 430600,
		value: 5.91,
    alt: 26,
    group: 'Rest of England and Wales'
	},
	{
		year: 351700,
		value: 4.29,
    alt: 10,
    group: 'Rest of England and Wales'
	},
	{
		year: 50800,
		value: 4.72,
    alt: 14,
    group: 'Rest of England and Wales'
	},
	{
		year: 210900,
		value: 5.38,
    alt: 21,
    group: 'Rest of England and Wales'
	},
	{
		year: 284000,
		value: 4.92,
    alt: 20,
    group: 'Rest of England and Wales'
	},
	{
		year: 351100,
		value: 4.61,
    alt: 24,
    group: 'Rest of England and Wales'
	},
	{
		year: 281200,
		value: 3.62,
    alt: 19,
    group: 'Rest of England and Wales'
	},
	{
		year: 351300,
		value: 5.35,
    alt: 12,
    group: 'Rest of England and Wales'
	},
	{
		year: 211400,
		value: 5.28,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 231500,
		value: 4.63,
    alt: 28,
    group: 'Rest of England and Wales'
	},
	{
		year: 251600,
		value: 4.72,
    alt: 30,
    group: 'Rest of England and Wales'
	},
	{
		year: 359450,
		value: 7.18,
    alt: 11,
    group: 'Rest of England and Wales'
	},
	{
		year: 479550,
		value: 6.12,
    alt: 19,
    group: 'Rest of England and Wales'
	},
	{
		year: 311650,
		value: 7.87,
    alt: 14,
    group: 'Rest of England and Wales'
	},
	{
		year: 194750,
		value: 6.73,
    alt: 22,
    group: 'Rest of England and Wales'
	},
	{
		year: 239850,
		value: 6.55,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 139950,
		value: 6.23,
    alt: 30,
    group: 'Rest of England and Wales'
	},
	{
		year: 321000,
		value: 6.31,
    alt: 27,
    group: 'Rest of England and Wales'
	},
	{
		year: 210100,
		value: 6.74,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 324200,
		value: 5.95,
    alt: 18,
    group: 'Rest of England and Wales'
	},
	{
		year: 230300,
		value: 6.13,
    alt: 15,
    group: 'Rest of England and Wales'
	},
	{
		year: 231400,
		value: 6.04,
    alt: 11,
    group: 'Rest of England and Wales'
	},
	{
		year: 250500,
		value: 5.56,
    alt: 29,
    group: 'Rest of England and Wales'
	},
	{
		year: 310600,
		value: 5.91,
    alt: 26,
    group: 'Rest of England and Wales'
	},
	{
		year: 474700,
		value: 4.29,
    alt: 10,
    group: 'Rest of England and Wales'
	},
	{
		year: 321800,
		value: 4.72,
    alt: 14,
    group: 'Rest of England and Wales'
	},
	{
		year: 250900,
		value: 5.38,
    alt: 21,
    group: 'Rest of England and Wales'
	},
	{
		year: 231000,
		value: 4.92,
    alt: 20,
    group: 'Rest of England and Wales'
	},
	{
		year: 211100,
		value: 4.61,
    alt: 24,
    group: 'Rest of England and Wales'
	},
	{
		year: 321200,
		value: 3.62,
    alt: 19,
    group: 'Rest of England and Wales'
	},
	{
		year: 281300,
		value: 5.35,
    alt: 12,
    group: 'Rest of England and Wales'
	},
	{
		year: 321400,
		value: 5.28,
    alt: 13,
    group: 'Rest of England and Wales'
	},
	{
		year: 281500,
		value: 4.63,
    alt: 28,
    group: 'Rest of England and Wales'
	},
	{
		year: 281600,
		value: 4.72,
    alt: 30,
    group: 'Rest of England and Wales'
	}
];
























	let animation = true;

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
	
	let beeswarm = {
		yKey: false,
		zKey: true,
		rKey: false,
	};

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
        {#if quartiles}
		<section>
			<div class="grid">
				<div>
					<ScatterChart data={dataScatter} xKey="year" yKey={beeswarm.yKey ? "value" : null} zKey={beeswarm.zKey ? "group": null} rKey={beeswarm.rKey ? "alt" : null} r={[3, 6]} animation={animation} legend={beeswarm.zKey} title="Population distribution across all districts">
					</ScatterChart>
				</div>
			</div>
		</section>
        {/if}</div>

	<div>
		<Report place={place} priorities={priorities(place)} ew={ew} section=1></Report>
	</div></div>

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
	section {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		margin: 0;
		margin-bottom: 20px;
		padding: 0;
	}
	.wrapper {
		width: 100%;
		max-width: 768px;
		margin: 0 16;
	}
	.grid {
		display: grid;
		width: 100%;
		max-width: 768px;
		margin: 0 16;
		grid-gap: 30px;
		grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
		justify-content: stretch;
	}
	h2 {
		font-size: 1.2em;
		font-weight: bold;
	}
	.controls > label {
		display: inline;
		margin-right: 8px;
	}
	.small {
		font-size: .8em;
	}



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