import { prisma } from "../../../generated/prisma-client";

export default {
  Message: {
    from: root => prisma.message({ id: root.id }).from(),
    to: root => prisma.message({ id: root.id }).to(),
    room: root => prisma.message({ id: root.id }).room()
  }
}