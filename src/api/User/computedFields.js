import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: (root) => {
      return `${root.firstName} ${root.lastName}`;
    },
    isFollowing: (root, _, { request }) => {
      const { user } = request;
      const { id: rootId } = root;
      try {
        return prisma.$exists.user({
          AND: [{ id: rootId }, { followers_some: { id: user.id } }]
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    isSelf: (root, _, { request }) => {
      const { user } = request;
      const { id: rootId } = root;
      return user.id === rootId;
    }
  }
};