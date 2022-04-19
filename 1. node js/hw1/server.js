const http = require('http')

const getFullNameAndDateTimeString = () => "Nitipol Pattanapun " + new Date().toISOString();

const listeningHandler = () => {
    console.log("server started")
    console.log(getFullNameAndDateTimeString())
}

const requestHandler = (req, res) => {
    res.write(getFullNameAndDateTimeString())
    res.end()
}

const createServer = (port, requestHandler, listeningHandler) => {
    const server = http.createServer(requestHandler)
    server.listen(port, listeningHandler)
    return server;
}

createServer(2337, requestHandler, listeningHandler);