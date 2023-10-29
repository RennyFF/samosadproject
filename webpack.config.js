const path = require('path')
module.exports = {
    devServer: {
        watchOptions: {
            ignored: [
                path.resolve(__dirname, '/public/database')
            ]
        }},}