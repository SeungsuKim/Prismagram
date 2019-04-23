import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    files: root => prisma.post({ id: root.id }).files(),
    comments: root => prisma.post({ id: root.id }).comments(),
    user: root => prisma.post({ id: root.id }).user(),
    likes: root => prisma.post({ id: root.id }).likes(),
    isLiked: async (root, _, { request }) => {
      const { user } = request;
      const { id } = root;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      })
    },
    likeCount: (parent) =>
      prisma
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
}