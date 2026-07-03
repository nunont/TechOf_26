
const http = require('http');

const serverFunction = (req, res) => {
    console.log('Entrou um request!');
    
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('<h1>Ola TechOf 2026!</h1>')

    res.end();
}

const server = http.createServer(serverFunction);
server.listen(3000);

