import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
/* import { version } from "../package.json"; */

const options: swaggerJSDoc.Operation = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Documentation",
      version: "1.0.0",
      description: "Documentation for your API",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts", "./src/app.ts", "./src/models/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("docs.json", (req: Request, res: Response) => {
    /* res.setHeader("Content-type", "application/json"); */
    res.send(swaggerSpec);
  });
  // eslint-disable-next-line quotes
  console.log(`SWAGGER DOCS RUN ON PORT: ${port}`);
}

export default swaggerDocs;
