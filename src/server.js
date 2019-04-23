import "./env";
import logger from "morgan";
import schema from "./schema";
import "./passport"
import { GraphQLServer } from "graphql-yoga";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

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

server.start({ port: PORT }, () =>
  console.log(`✅  Server running on port ${PORT}`)
);