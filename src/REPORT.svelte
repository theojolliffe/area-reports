<script>
    import { adjectify, remainsBecame, uncap1, regionThe, ordinal_suffix_of } from './robo_utils_pure_functions.js';
    import robojournalist from "robojournalist";

    import ladLookup from './data/censusAreaLookup.csv';
    import subGroupLookup from './data/subGroupLookup.js';
    import topicLookup from './data/topicLookup.js';
	import variableChange from './data/populationChange.csv';

    import strings from './rosae-strings.js';
    import EnglishVerbs from 'english-verbs-helper';
    import Irregular from 'english-verbs-irregular/dist/verbs.json';
    import Gerunds from 'english-verbs-gerunds/dist/gerunds';
    const VerbsData = EnglishVerbs.mergeVerbsData(Irregular, Gerunds);  

	export let place;
	export let ew;
	export let priorities;
	export let section;
    let res = {0: "Loading"};
    let load = false
    const onRosaeNlgLoad = () => { load = true }

    // Transform lad lookup csv to object and write gss lookup objects
    let ladType = {}; ladLookup.forEach(d => {ladType[d['Code']] = d['Subgroup code']});
    let gssLookupShort = {"E09": "borough", "E08": "district", "E07": "district", "E06": "authority"}
    let gssLookup = {"E09": "London borough", "E08": "metropolitan district", "E07": "non-metropolitan district", "E06": "unitary authority"}

    function results(place, priorities) {

        let dataSelect = priorities[section] // Create variable selecting the priority rank for the given article section
        // Split selected label to get single selector tokens
        let selectors = dataSelect['label'].split("_"); if (selectors[4]) { selectors[3] = selectors[3] + "_" + selectors[4] }
        let topic = topicLookup[selectors[0] + "_" + selectors[3]];
        let perc= dataSelect.label.split("_")[1]=='perc'

        // Find out if area is first second, third or significantly higher
        function nationComp(place, breaks, natRank, selectors, verb) {
            verb = EnglishVerbs.getIngPart(VerbsData[verb], verb);
            if (natRank<2) { return " is " + verb + " faster here than any other " + gssLookupShort[place.code.slice(0,3)] }
            if (natRank<4) { return " the " + ordinal_suffix_of(Math.abs(natRank)) + " fastest " + verb + " of any " + gssLookupShort[place.code.slice(0,3)] }
            else { return " is " + verb + " " + adjectify(place['data'][selectors[0]][selectors[1]+'_rank'][selectors[2]][selectors[3]], ['faster here', 'slower here'], breaks) + " the average" } }

        //  Finds one lower district within region
        function oneLower(place, selectors) {
            // filter region and topic
            let variableFilter = variableChange.filter( item => {
                return item["parent"] == place.parents[0].name &&
                    item["topic"] == selectors[0]+"_"+selectors[3]
            });
            variableFilter.sort(function(a, b) {
                return Math.abs(b['2011']) - Math.abs(a['2011']);
            });
            let index = variableFilter.map((item) => {return item['lad']}).indexOf(place.name)
            return variableFilter[index+1] }

        //  Finds one higher district within region
        function oneHigher(place, selectors) {
            // filter region and topic
            let variableFilter = variableChange.filter( item => {
                return item["parent"] == place.parents[0].name &&
                    item["topic"] == selectors[0]+"_"+selectors[3]
            });
            variableFilter.sort(function(a, b) {
                return Math.abs(b['2011']) - Math.abs(a['2011']);
            });
            let index = variableFilter.map((item) => {return item['lad']}).indexOf(place.name)
            return [variableFilter[index-1], index-1] }

        // Finds the top areas nationally if rank is 2 or 3, if rank is 1 find next highest
        function topBelow(place, selectors, natRank) {
            if (natRank>1) {
                // If change rank is lower than 1 keep only items with higher change value then sort
                let variableFilter = variableChange.filter( item => {
                    return  item["change"] > place.data[selectors[0]][selectors[1]]['change'][selectors[3]] &&
                    item["topic"] == selectors[0]+"_"+selectors[3]
                });
                variableFilter.sort(function(a, b) {
                    return Math.abs(b['change']) - Math.abs(a['change']);
                });            

                return variableFilter[0].lad + " (+" + dec(variableFilter[0].change) + "%)" + (variableFilter[1]?" and " + variableFilter[1].lad  + " (+" + dec(variableFilter[0].change) + "%)" + " have":" has")
            } else {
                let variableFilter = variableChange.filter( item => {
                    return item["topic"] == selectors[0]+"_"+selectors[3];
                });
                variableFilter.sort(function(a, b) {
                    return Math.abs(b['change']) - Math.abs(a['change']);
                });
                let index = variableFilter.map((item) => {return item['lad']}).indexOf(place.name)    
                return variableFilter[index+1].lad + " (+" + dec(variableFilter[index+1].change) + (perc?"pp)":"%)") } }

        //  Finds districts that have been overtaken by spotlight area
        function overTake(place, selectors) {
            let var01 = place['data'][selectors[0]][selectors[1]][2001][selectors[3]]
            let var11 = place['data'][selectors[0]][selectors[1]][2011][selectors[3]]
            let variableFilter = variableChange.filter( item => {
                return  item["2001"] > var01 &&
                        item["2011"] < var11 && 
                        item["topic"] == selectors[0]+"_"+selectors[3]
            });
            if (variableFilter.length > 10) {
                return variableFilter.length + " areas"
            } else if (variableFilter.length > 3) {
                return variableFilter.length + " areas, including " + variableFilter[0].lad + " and " + variableFilter[1].lad 
            } else if (variableFilter.length == 3) {
                return variableFilter[0].lad + ", " + variableFilter[1].lad + " and " + variableFilter[2].lad; 
            } else {
                return variableFilter[0].lad + (variableFilter[1]?" and " + variableFilter[1].lad:"") } }

        function sig(place, subject) {
            return ( place['data'][selectors[0]][selectors[1]+'_rank'][2011][subject]<breaks[2]|
                        place['data'][selectors[0]][selectors[1]+'_rank'][2011][subject]>breaks[8])?
                        adjectify(place['data'][selectors[0]][selectors[1]+'_rank'][2011][subject], ['higher', 'lower'], breaks):"" }

        function fracPerc(place, selectors) {
            var sortable = [];
            for (var obj in place['data'][selectors[0]]['perc'][2011]) {
                sortable.push([obj, dec(place['data'][selectors[0]]['perc'][2011][obj])]);
            }
            sortable.sort(function(a, b) {
                return Math.abs(b[1]) - Math.abs(a[1]);
            });
            let fraction = sortable[1][1]/100
            let words = get_word(fraction)
            return [OverUnder==0? "About " + words + " (" + dec(sortable[1][1]) + "%)": (OverUnder<0?"Almost ":"Just over ") + words + " (" + dec(sortable[1][1]) + "%)", sortable] }

        let fraction_map = {'one in two': 0.5, 'one in three': 0.333, 'one in four': 0.25, 'one in five': 0.2, 'one in six': 0.167, 'one in seven': 0.143, 'one in eight': 0.125, 'one in nine': 0.111, '1 in 10': 0.1,'1 in 11' : 0.09, '1 in 12' : 0.083, '1 in 13' : 0.077, '1 in 14' : 0.071, '1 in 15' : 0.067, '1 in 16' : 0.063, '1 in 17' : 0.059, '1 in 18' : 0.056, '1 in 19' : 0.053 ,'1 in 20': 0.05, '2 in 10': 0.2, '3 in 10': 0.3, '4 in 10': 0.4, '6 in 10': 0.6, '7 in 10': 0.7, '8 in 10': 0.8, '9 in 10': 0.9, 'all': 1.0}

        let OverUnder;
        function get_word(fraction) {
            let lowest = 2;
            let lowest_label;
            for (const label in fraction_map) {
                if (Math.abs(fraction-fraction_map[label])<lowest) {
                    lowest = Math.abs(fraction-fraction_map[label]) 
                    lowest_label = label
                    if (fraction-fraction_map[label]==0) {
                        OverUnder = 0; 
                    }
                    else if (fraction-fraction_map[label]>0) {
                        OverUnder = 1;
                    }
                    else if (fraction-fraction_map[label]<0) {
                        OverUnder = -1;
                    } } }
            return lowest_label }

        function dec(num) { return Math.round(num * 10)/10 }

        let natRank = place['data'][selectors[0]][selectors[1]+'_rank'][selectors[2]][selectors[3]]
        let natRankTot = place['data'][selectors[0]][selectors[1]+'_rank'][2011][selectors[3]]
        let locRank = place['data'][selectors[0]][selectors[1]+'_rank_local'][selectors[2]][selectors[3]]
        let locRankTot = place['data'][selectors[0]][selectors[1]+'_rank_local']['2011'][selectors[3]]

        // Decile breaks are used as a crude calculation for significance
        let breaks = []; for (let i=0; i<10; i++) {breaks.push(Math.round((i * ((place.type=="wd")?8056:336)) / 10))}

        // If agemed is topic then check if redirected from 10yr and if so use as alt subject
        let subj; if (selectors[0]=="agemed") {
            if (!dataSelect.alt) { subj = "_70plus" } 
            else { subj = "_"+dataSelect.alt.split("_")[3] }
        } else { subj = "_all"}

        for (const [key, value] of Object.entries(strings)) {
            res[key] = rosaenlg_en_US.render(value, {...{
                language: 'en_UK',
                section: section,
                place: place,
                selectors: selectors,
                topicLookup: topicLookup,
                topic: topic,
                percChange: dec(place.data[selectors[0]][selectors[1]][selectors[2]][selectors[3]]),
                perc: perc,
                gssShort: gssLookupShort,
                gss: gssLookup,
                subGroup: subGroupLookup,
                ladType: ladType,
                fasterSlower: nationComp(place, breaks, natRank, selectors, topic['verb']['positive']),
                natRank: natRank,
                natRankTot: natRankTot,
                locRank: locRank,
                top: topBelow(place, selectors, natRank),
                parent: uncap1(robojournalist('{place ^regionThe}', {place: place.parents[0].name, regionThe})),
                remainsBecame: remainsBecame(place['data'][selectors[0]][selectors[1]+'_rank'][2001][selectors[3]], place['data'][selectors[0]][selectors[1]+'_rank'][2011][selectors[3]], breaks),
                moreLess: adjectify(place['data'][selectors[0]][selectors[1]+'_rank'][2011][selectors[3]], ['more '+ topic['adjective'], 'less '+ topic['adjective']], breaks),
                overTake: overTake(place, selectors),
                localRank11: ordinal_suffix_of(place['data'][selectors[0]][selectors[1]+'_rank_local']['2011'][selectors[3]]),
                oneLower: oneLower(place, selectors),
                locRankTot: locRankTot,
                oneHigher: oneHigher(place, selectors),
                ew: ew,
                highLow: (!perc)? adjectify(place['data'][topic['alternative']][selectors[1]+'_rank'][2011][selectors[3]], ['higher', 'lower'], breaks):"",
                subj: subj,
            },...(perc)? {
                sig: sig(place, fracPerc(place, selectors)[1][1][0]).length>5?" (" + sig(place, fracPerc(place, selectors)[1][1][0]) + " average) ":"",
                sig2: (fracPerc(place, selectors)[1][2])? sig(place, fracPerc(place, selectors)[1][2][0]).length>5?"; " + sig(place, fracPerc(place, selectors)[1][2][0]) + " average":"":"", 
                fracPerc: fracPerc(place, selectors),

            }:{}})
        }
        if ((res[3]+res[4]).length<250) {
            res[3] = res[3] + " " + res[4]
            delete res[4]
        }
        return res }
</script>

<svelte:head>
	<script src="https://unpkg.com/rosaenlg@3.0.1/dist/rollup/rosaenlg_tiny_en_US_3.0.1_comp.js" on:load="{onRosaeNlgLoad}"></script>
</svelte:head>

{#if load}
    {#each Object.values(results(place, priorities)) as sentence}
        <p>{sentence}</p>
    {/each}
{/if}
