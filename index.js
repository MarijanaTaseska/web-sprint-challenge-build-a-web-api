
//pulling my server
require('dotenv').config()
const server = require('./api/server')

server.listen(9000, () => {
    console.log('server listening on http://localhost:9000')
})

