'use strict';

var path = require('path');
var http = require('http');
const cors = require('cors');
const express = require('express');
const swaggerTools = require('swagger-tools');
const swaggerDocument = require('./api/portfolio-swagger.json');
require('dotenv').config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';


// const swaggerDocument = (() => {
//     const fs = require('fs');
//     const yaml = require('yaml');

//     const yamlConfig = path.join(__dirname, 'api/openapi.yaml');
//     console.log(yamlConfig);


//     var yamlSource;
//     try {
//         yamlSource = fs.readFileSync(yamlConfig, 'utf-8');
//     } catch (error) {
//         console.error('Error reading OpenAPI file:', error);
//         process.exit(1);
//     }
//     return yaml.parse(yamlSource);
// })();

const options = {
    controllers: path.join(__dirname, './controllers'),
    middleware: {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
        }
    }
};

const app = express();

app.use(cors());

swaggerTools.initializeMiddleware(swaggerDocument, (middleware) => {
    console.log('Swagger middleware initialized');

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    // Start the server
    http.createServer(app).listen(port, function () {
        console.log('Your server is listening on http://%s:%d', host, port);
        console.log('Swagger-ui is available on http://%s:%d/docs', host, port);
    });
});


