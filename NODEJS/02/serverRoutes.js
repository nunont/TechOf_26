
const http = require('http');

const serverFunction = (req, res) => {
    console.log('Entrou um request!');
    
    res.setHeader('Content-Type',
         'text/html');
    
    let route = req.url;
    console.log(route);

    res.statusCode = 200;
    if (route == '/'){
        res.write('Home')
    }
    else if (route == '/sopas') {
        res.write('Pagina das Sopas');
    }
    else if (route == '/flats'){
        res.write('Pagina dos apartamentos')
    }
    else {
        res.statusCode = 404;
        res.write('Not Found');
    }

    res.end();
}

const server = http.createServer(serverFunction);
server.listen(3000);

