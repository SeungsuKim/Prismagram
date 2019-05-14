import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const usernameExists = await prisma.$exists.user({ username });
      const emailExists = await prisma.$exists.user({ email });
      if (usernameExists) {
        throw Error("This username is already taken");
      }
      if (emailExists) {
        throw Error("This email is already taken");
      }
      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });
      return true;
    }
  }
}