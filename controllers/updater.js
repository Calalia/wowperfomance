const config = require('../utils/config')
const Axios = require('axios')
const Zone = require('../models/zone')
const Ranking = require('../models/ranking')
const Character = require('../models/character')



const healspecs = [
    "Restoration",
    "Holy",
    "Discipline",
    "Mistweaver"]
const dpsspecs = [
    "Frost",
    "Unholy",
    "Havoc",
    "Balance",
    "Feral",
    "Beast Mastery",
    "Marksmanship",
    "Survival",
    "Arcane",
    "Fire",
    "Windwalker",
    "Retribution",
    "Shadow",
    "Assasination",
    "Outlaw",
    "Subtlety",
    "Elemental",
    "Enchancement",
    "Affliction",
    "Demonology",
    "Destruction",
    "Arms",
    "Fury"]

const updateZones = async () => {
    await Zone.deleteMany({})
    const data = Axios.get( `https://www.warcraftlogs.com:443/v1/zones?api_key=${config.APIKEY}`).then(response => {
        response.data.map((element) => {
            const zone = new Zone({
                name: element.name,
                encounters: element.encounters.map((e) => {
                    return {
                        bossName: e.name,
                        bossid: e.id
                    }
                }),
                partitions: (element.partitions != undefined) ? element.partitions.map((e)=>e.name) : []
            })
            zone.save().then(saved => saved.toJSON()).catch(error => console.log('Error in saving zone: ', error))
        })
    })
}

const fetchCharacter = async (input) => {
    if (!input.characterName || !input.serverName || !input.serverRegion)
        throw new Error('parameter character has to have: characterName, serverName and serverRegion fields. Has: ' + JSON.stringify(input))
    let char = await Character.find({
        characterName: input.characterName,
        serverName: input.serverName,
        serverRegion: input.serverRegion
    }).exec()
    char=char[0]
    let exists = char != undefined
    if (char === undefined) char = new Character({
        characterName: input.characterName,
        serverName: input.serverName,
        serverRegion: input.serverRegion,
        rankings: []
    })
    console.log(char)
    await fetchCharacterRankings(char, 'hps')
    await fetchCharacterRankings(char, 'dps')

    if (exists) Character.findByIdAndUpdate(char._id, char).catch(error => console.log('Error in saving character: ', error))
    else char.save().then(saved => saved.toJSON()).catch(error => console.log('Error in saving character: ', error))
}
const fetchCharacterRankings = async (character, type) => {

    if (!character.characterName || !character.serverName || !character.serverRegion)
        throw new SyntaxError("parameter character has to have: characterName, serverName and serverRegion fields Has: " + character)
    if (type != 'hps' && type != 'dps')
        throw new SyntaxError("type has to be 'hps' or 'dps'")
    
    await Axios.get(`https://www.warcraftlogs.com:443/v1/parses/character/${character.characterName}/${character.serverName}/EU?metric=${type}&api_key=${config.APIKEY}`)
        .then(response => {
            const char = response.data.reduce((char, element) => {
                if ((type === 'hps' && healspecs.includes(element.spec)) || (type === 'dps' && dpsspecs.includes(element.spec))) {
                    const ranking = {
                            characterName: char.characterName,
                            date: new Date(element.startTime),
                            spec: element.spec,
                            bossid: element.encounterID,
                            percentile: element.percentile,
                            totaltype: type,
                            total: element.total
                    }
                    if (!char.rankings.includes(ranking)) {
                        char.rankings.push(ranking)
                    }
                }
                return char
            }, character)
            
            return char
        })
        .catch((error) => console.log('Error in UpdateZones ', error))
}

module.exports = {
    updateZones,
    fetchCharacter,
}