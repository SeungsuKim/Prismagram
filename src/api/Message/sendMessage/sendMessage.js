import { RoboMaker } from "aws-sdk";
import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { roomId, toId, message } = args;
      const { user } = request;
      let room;
      if (roomId === undefined) {
        if (user.id !== toId) {
          const rooms = await prisma.user({ id: user.id }).rooms().$fragment(ROOM_FRAGMENT);
          room = rooms.find((room) => room.participants.find(participant => participant.id === toId));
          if (!room) {
            room = await prisma.createRoom({
              participants: {
                connect: [{ id: toId }, { id: user.id }]
              }
            }).$fragment(ROOM_FRAGMENT);
          }
        }
      } else {
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      }
      if (!room) {
        throw Error("Room not found");
      }
      const to = room.participants.filter(
        participant => participant.id !== user.id
      )[0]
      const newMessage = await prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: {
            id: room ? to.id : toId
          }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });
      return newMessage;
    }
  }
}