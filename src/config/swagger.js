import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Sistema de Facturación",
    version: "1.0.0",
    description: "API para gestión de clientes y usuarios"
  },
  servers: [
    { url: "http://localhost:3000" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Ingresa tu token JWT aquí"
      }
    }
  },
  
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // tus archivos de rutas con comentarios Swagger
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };
