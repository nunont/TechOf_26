
const http = require('http');

const serverFunction = (req, res) => {
    res.setHeader('Content-Type',
         'text/html');
    
    const baseURL = `${req.protocol}://${req.headers.host}/`;
    const reqURL = new URL(req.url, baseURL);
    console.log(reqURL);
    let route = reqURL.pathname;
    const queryPrms = reqURL.searchParams;

    res.statusCode = 200;
    if (route == '/params'){
        //res.write(reqURL.search.replace('?', ''))
        res.write(queryPrms.toString())
    }
    else {
        res.statusCode = 404;
        res.write('Not Found');
    }

    res.end();
}

const server = http.createServer(serverFunction);
server.listen(3000);

