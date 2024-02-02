import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Online shop API',
            version: '0.0.0',
            description: 'API documentation for the online shop',
        },
        servers: [{ url: 'http://localhost:5400' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/index.js', './src/model/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDoc = (app, port, host) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    console.log(
        'Swagger UI is available at: http://' + host + ':' + port + '/api/docs'
    )
}

export default swaggerDoc
