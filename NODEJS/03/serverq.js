
const http = require('http');

const serverFunction = (req, res) => {
    console.log('Entrou um request!');
    
    res.setHeader('Content-Type',
         'text/html');
    
    //http://localhost:3000/home
    const baseURL = `${req.protocol}://
    ${req.headers.host}/`;
    const reqURL = new URL(req.url, baseURL);

    let route = reqURL.pathname;
    console.log('NOVA ' + route);
    console.log(reqURL);

    const queryPrms = reqURL.searchParams;

    res.statusCode = 200;
    if (route == '/'){
        res.write('Home')
    }
    else if (route == '/sopas') {
        res.write('Pagina das Sopas');
    }
    else if (route == '/flats'){
        if (queryPrms.has('city')){
            res.write(`Pagina dos Apartamentos filtrada 
                por cidade ${queryPrms.get('city')}`);
        }
        else {
            res.write('Pagina dos apartamentos')
        }
    }
    else {
        res.statusCode = 404;
        res.write('Not Found');
    }

    res.end();
}

const server = http.createServer(serverFunction);
server.listen(3000);

