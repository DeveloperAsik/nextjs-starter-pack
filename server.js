const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.listen(9000, (err) => {
        if (err)
            throw err
        console.log('> Ready on http://localhost:9000');
    });
    server.get('/welcome', (req, res) => {
        return app.render(req, res, '/welcome');
    });

    server.get('/index', (req, res) => {
        return app.render(req, res, '/index');
    });
    
    server.get('/', (req, res) => {
        return app.render(req, res, '/index');
    });
    
    server.get('*', (req, res) => {
        return handle(req, res);
    });
    

}).catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});
