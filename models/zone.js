const mongoose = require('mongoose')

const zoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    encounters: [{
        bossName: {
            type: String,
            required: true
        },
        bossid: {
            type: String,
            required:true
        }
    }],
    partitions:[]
})



zoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Zone', zoneSchema)