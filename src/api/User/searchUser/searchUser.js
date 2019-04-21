import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, args) => {
      const { term } = args;
      const users = await prisma.users({
        where: {
          OR: [
            { username_contains: term },
            { firstName_contains: term },
            { lastName_contains: term }
          ]
        }
      });
      return users;
    }
  }
}