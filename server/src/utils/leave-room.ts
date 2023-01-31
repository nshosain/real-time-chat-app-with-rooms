import { IUser } from "../models/user-model";

export default function leaveRoom(userID: string, chatRoomUsers: [IUser]) {
  return chatRoomUsers.filter((user: IUser) => user.id != userID);
}