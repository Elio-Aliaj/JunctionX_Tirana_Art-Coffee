export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Digital Café Companion API',
        version: '1.0.0',
        description: 'API for Digital Café Companion application',
        contact: {
          name: 'API Support',
          email: 'support@digitalcafe.com'
        }
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      tags: [
        {
          name: 'Authentication',
          description: 'Authentication endpoints'
        },
        {
          name: 'Users',
          description: 'User management endpoints'
        }
      ]
    },
    apis: ['./src/controllers/*.js']
  };