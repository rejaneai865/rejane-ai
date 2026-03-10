function rankResponses(responses){

responses.sort((a,b)=>{

return b.text.length - a.text.length

})

return responses[0]

}

module.exports = rankResponses