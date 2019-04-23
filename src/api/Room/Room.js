import { prisma } from "../../../generated/prisma-client";

export default {
  Room: {
    participants: root => prisma.room({ id: root.id }).participants(),
    messages: root => prisma.room({ id: root.id }).messages()
  }
}