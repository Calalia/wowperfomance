require('dotenv').config()

let PORT = process.env.PORT
let DBURL = process.env.DBURL
let APIKEY = process.env.APIKEY

module.exports = {
    DBURL,
    PORT,
    APIKEY
}