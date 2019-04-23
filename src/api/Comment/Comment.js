import { prisma } from "../../../generated/prisma-client";

export default {
  Comment: {
    user: root => prisma.comment({ id: root.id }).user(),
    post: root => prisma.comment({ id: root.id }).post()
  }
}