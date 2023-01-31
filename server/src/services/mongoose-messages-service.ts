import MessageModel, { IMessage } from "../models/message-model";

export async function SaveMessage(messageData: IMessage) {
  try {
    await MessageModel.create([messageData]);
  }
  catch (err: any) {
    throw err;
  }
}

export async function GetLastHundredMessages(room: string) {
  try {
    return await MessageModel.find({ room: room }, { message: 1, username: 1, createdAt: 1 }).limit(100);
  }
  catch (err: any) {
    throw err;
  }
}