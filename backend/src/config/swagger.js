import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web Light Novel API",
      version: "1.0.0",
      description: "Tài liệu API cho hệ thống Web Light Novel",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Quét các file router để lấy comment cấu hình
};

const specs = swaggerJsDoc(options);

const initSwagger = (app) => {
  // User có thể vào 1 trong 2 URL
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = initSwagger;
