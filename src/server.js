import "./env";
import "./passport";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";

import { isAuthenticated } from "./middlewares";
import { authenticateJwt } from "./passport";
import schema from "./schema";
import { uploadController, uploadMiddleware } from "./upload";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: async ({ request, connection }) => {
    if (connection) {
      return { connection, isAuthenticated };
    } else {
      return { request, isAuthenticated };
    }
  }
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.express.post("/api/upload", uploadMiddleware, uploadController);

server.start({ port: PORT }, () =>
  console.log(`✅  Server running on port ${PORT}`)
);
