import { UserInterface } from "../models/user-model";

export default function leaveRoom(userID: string, chatRoomUsers: [UserInterface]) {
  return chatRoomUsers.filter((user: UserInterface) => user.id != userID);
}