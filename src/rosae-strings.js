export default{
    0: `
mixin headline
    if (perc)
      | #[+value(topic.topic)] 
      protect
        | #[+value(topic.verb.positive)]s 
      | in #[+value(place.name)]
    else
      | Large rise in #[+value(place.name)] #[+value(topic.topic)]
| #[+headline]`,
    1: `
mixin sigShift
    if (section==1)
        | The 2021 Census also appears to show a significant shift in the local population's #[+value(topic.theme)].

mixin sinceA
    | since 2011, 

mixin sinceB
    | in the ten years following 2011

mixin percSent
    | the proportion of #[+value(place.name)] #[+value(topic.topicLong)] increased by #[+value(percChange)] percentage points (pp)

mixin absoSent
    | the #[+value(topic.topicLong)] of the #[+value(gssShort[place.code.slice(0,3)])] of #[+value(place.name)] rose #[+value(percChange/100, {'FORMAT': '0.0%'})]

mixin accordingTo
    | , according to the 2021 census

mixin printSentence
  | #[+sigShift]
  if (section!=0)
    | #[+sinceA]
  if (perc)
    | #[+percSent]
  if !(perc)
    | #[+absoSent]
  if (section==0)
    | #[+sinceB]
    | #[+accordingTo] 
  | .
| #[+printSentence]`,
    2: `
mixin start1
    | The proportion of #[+value(topic.synonym)] 

mixin start2
    | #[+value(place.name)]'s #[+value(topic.topic)] is

mixin middle 
    | #[+value(fasterSlower)] across England and Wales

mixin Ord(rankArg) 
    if (rankArg>1)
        | #[+value(rankArg, {'ORDINAL_TEXTUAL':true})] 

mixin fastestGrowing
    | and is the 
    | #[+Ord(locRank)] 
    | fastest growing in #[+value(parent)].

mixin topProt
    protect
        | #[+value(top)]

mixin nextFastestGrowing
    | the next fastest growing is
    | #[+topProt]

mixin acrossAllTypes
    | Across all #[+value(gssShort[place.code.slice(0,3)], {number:'P'})], only 
    | #[+topProt]
    | a faster growing #[+value(topic.topicLong)]

mixin printSentence
    if (perc)
        | #[+start1]
    if !(perc)
        | #[+start2]
    | #[+middle]
    if (natRank!=1)
        | #[+fastestGrowing]
    | .
    if (natRank<4)
        if (natRank==1)
            | #[+nextFastestGrowing]
        else
            | #[+acrossAllTypes]
        | .

| #[+printSentence]`,
    3: `
mixin tenYears
  if (section==0)
    | Between 2011 and 2021, 
  else  
    | In the decade to 2021,
    

mixin placeType
  if (section==0)
    | the #[+value(subGroup[ladType[place.code]])]
  else
    | the #[+value(gss[place.code.slice(0,3)])]

mixin outOf
  if (natRankTot>15)
    | out of 336 districts
  else
    | district

mixin adject
  if (natRankTot>10)
    | This means #[+value(place.name)] #[+value(remainsBecame)] #[+value(moreLess)] the average district.

mixin Ord(rankArg) 
    if (rankArg>1)
        | #[+value(rankArg, {'ORDINAL_TEXTUAL':true})] 

mixin third
  | #[+tenYears]
  | #[+placeType]
  | overtook #[+value(overTake)] to become England and Wales' 
  | #[+value(natRankTot, {'ORDINAL_NUMBER':true})] 
  | most #[+value(topic.adjective)] 
  | #[+outOf] . 
  | #[+adject]

| #[+third]`,
    4: `
mixin fourth_1
  | #[+value(place.name)] now has #[+value(place.data[selectors[0]].value['2011'][selectors[3]])] residents (#[+value((place.data[selectors[0]].perc['2011'][selectors[3]])/100, {'FORMAT': '0.0%'})]) #[+value(topic.topicMed)]—the #[+value(localRank11)] highest proportion in #[+value(parent)].

mixin fourth_2
  | During this period the #[+value(topic.topic)] grew by #[+value(place.data.population.value['2011'].all - place.data.population.value['2001'].all)]. The #[+value(gssShort[place.code.slice(0,3)])] now has #[+value(place.data.population.value['2011'].all)] residents, giving it the #[+value(localRank11)] largest #[+value(topic.synonym)] in #[+value(parent)].

mixin fourth_described1
  protect
    | #[+value(fracPerc[0])]
  | respondents described their #[+value(topic.topic)] as #[+value(fracPerc[1][1][0])]#[+value(sig)] and 
  | #[+value((fracPerc[1][2][1])/100, {'FORMAT': '0.0%'})]
  | reported
  | #[+value(fracPerc[1][2][0])] #[+value(topic.topic)] #[+value(sig2)].

mixin fourth_said1
  protect
    | #[+value(fracPerc[0])] 
  | said they 
  | #[+value(topicLookup[selectors[0]+"_"+fracPerc[1][1][0]].topic)]
  | #[+value(sig)] and 
  | #[+value((fracPerc[1][2][1])/100, {'FORMAT': '0.0%'})] 
  | #[+value(topicLookup[selectors[0]+"_"+fracPerc[1][2][0]].topic)]
  | #[+value(sig2)].

mixin fourth
  if (perc)
    | #[+fourth_1]
    if (topic['desc']=='described')
      | #[+fourth_described1]
    if (topic['desc']=='said')
      | #[+fourth_said1]
  else
    | #[+fourth_2] 

| #[+fourth]`,
    5: `
mixin fiveA
  | #[+value(place.name)] is behind #[+value(oneHigher[0].lad,)]—the 
  if ((oneHigher[1]+1)>1)
    | #[+value((oneHigher[1]+1), {'ORDINAL_NUMBER':true})] 
  | most #[+value(topic.adjective)] #[+value(gssShort[place.code.slice(0,3)])] in #[+value(parent)] with 
  | #[+value((oneHigher[0][2011])/100, {'FORMAT': '0.0%'})] 
  | #[+value(topic.topicMed)].

mixin fifth_1
  | After #[+value(place.name)], 
  | #[+value(oneLower.lad)] is the next most 
  | #[+value(topic.adjective)]
  if (locRankTot==1) 
    | #[+value(gssShort[place.code.slice(0,3)])]  in #[+value(parent)] 
  | , with #[+value((oneLower['2011'])/100, {'FORMAT': '0.0%'})] 
  if (topic['desc']=='described')
    | of residents describing their #[+value(topic.topic)] as good.
  else
    | #[+value(topic.synonym)].

mixin fifth_2
  | #[+value(oneLower.lad)] is the next most #[+value(topic.adjective)]
  if (locRankTot==1)
    | #[+value(gssShort[place.code.slice(0,3)])] in #[+value(parent)]
  | , with #[+value(parseInt(oneLower['2011']))] residents.

mixin fifth
  if (locRankTot!=1)
    | #[+fiveA]
  if (perc)
    | #[+fifth_1]
  else
    | #[+fifth_2]

| #[+fifth]`,
    6: `
mixin sixth_1said
  | Across England and Wales, 
  | #[+value((ew.data[selectors[0]][selectors[1]]['2011'][selectors[3]])/100, {'FORMAT': '0.0%'})] 
  | #[+value(topic.topicMed2)], 
  | #[+value((ew.data[selectors[0]][selectors[1]]['2011'][fracPerc[1][1][0]])/100, {'FORMAT': '0.0%'})] 
  | #[+value(topicLookup[selectors[0]+"_"+fracPerc[1][1][0]]['topicMed2'])] and 
  | #[+value((ew.data[selectors[0]][selectors[1]]['2011'][fracPerc[1][2][0]])/100, {'FORMAT': '0.0%'})] 
  | #[+value(topicLookup[selectors[0]+"_"+fracPerc[1][2][0]]['topicMed2'])].

mixin sixth_1described
  | Across England and Wales, 
  | #[+value((ew.data[selectors[0]][selectors[1]]['2011'][selectors[3]])/100, {'FORMAT': '0.0%'})] of the population describe their 
  | #[+value(topic.topic)] as 
  | #[+value(fracPerc[1][0][0])], 
  | #[+value((ew.data[selectors[0]][selectors[1]]['2011'][fracPerc[1][1][0]])/100, {'FORMAT': '0.0%'})] report 
  | #[+value(fracPerc[1][1][0])] 
  | #[+value(topic.topic)] and 
  | #[+value((ew.data[selectors[0]][selectors[1]]['2011'][fracPerc[1][2][0]])/100, {'FORMAT': '0.0%'})] report 
  | #[+value(fracPerc[1][2][0])] 
  | #[+value(topic.topic)].

mixin sixth_2
  | #[+value(place.name)] has a 
  | #[+value(topicLookup[topic['alternative']+subj]['topic'])] of 
  | #[+value(place.data[topic['alternative']][selectors[1]]['2011']['all'], {'FORMAT': '0.0'})] 
  | #[+value(topicLookup[topic['alternative']+subj]['topicLong'])], which is 
  | #[+value(highLow)] the average across England and Wales; 
  | #[+value(ew.data[topic['alternative']][selectors[1]]['2011']['all'], {'FORMAT': '0.0'})] 
  | #[+value(topicLookup[topic['alternative']+subj]['topicLong'])].

mixin sixth
  if (perc)
    if (topic['desc']=='said')
      | #[+sixth_1said]
    if (topic['desc']=='described')
      | #[+sixth_1described]
  else
    | #[+sixth_2]

| #[+sixth]`
}