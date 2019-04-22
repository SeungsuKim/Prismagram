import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: (root) => {
      return `${root.firstName} ${root.lastName}`;
    }
  }
}

export default {
  User: {
    amIFollowing: async (root, _, { request }) => {
      const { user } = request;

    }
  }
}