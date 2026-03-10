function rankResponses(responses){

let best = ""

for(let r of responses){

if(!r) continue

if(r.length > best.length){
best = r
}

}

return best

}

module.exports = rankResponses