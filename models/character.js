const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
    characterName: {
        type: String,
        required: true,
        minlength: 2
    },
    serverName: {
        type: String,
        required: true,
        minlength:2
    },
    serverRegion: {
        type: String,
        required: true,
        minlength: 2
    },
    class:String,
    rankings: Array
})
characterSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Character', characterSchema)