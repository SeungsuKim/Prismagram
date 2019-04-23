import { prisma } from "../../../generated/prisma-client";

export default {
  Like: {
    user: root => prisma.like({ id: root.id }).user(),
    post: root => prisma.like({ id: root.id }).post()
  }
}