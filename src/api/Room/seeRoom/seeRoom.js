import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const rooms = await prisma.user({ id: user.id }).rooms();
      const room = rooms.find((room) => room.id === id);
      if (room) {
        return room;
      }
      throw Error("You can't see this room");
    }
  }
}