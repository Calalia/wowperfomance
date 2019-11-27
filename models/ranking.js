const mongoose = require('mongoose')

const rankingSchema = new mongoose.Schema({
    characterName: {
        type: String,
        required: true,
        minlength: 2
    },
    date: {
        type: Date,
        required: true
    },
    spec: String,
    bossid: String,
    percentile: String,
    totaltype: String,
    total: String
})

rankingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Ranking', rankingSchema)