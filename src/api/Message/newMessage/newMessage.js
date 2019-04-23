import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args) => {
        const { roomId } = args;
        // TODO: Subscription for only participants who did not send the message
        return prisma.$subscribe.message({
          AND: [
            { mutation_in: "CREATED" },
            {
              node: {
                AND: [
                  { room: { id: roomId } }
                ]
              }
            }
          ]
        }).node();
      },
      resolve: payload => payload
    }
  }
}