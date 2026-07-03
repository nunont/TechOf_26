
const http = require('http');

const serverFunction = (req, res) => {
    console.log('Entrou um request!');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('Ola TechOf 2027!')

    res.end();
}

const server = http.createServer(serverFunction);
server.listen(3001);
