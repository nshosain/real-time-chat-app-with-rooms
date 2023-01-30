import Message, { MessageInterface } from "../models/message-model";
import { FilterQuery } from "mongoose";


export async function SaveMessage(messageData: MessageInterface) {
  try {
    await Message.create([messageData]);
  }
  catch (err: any) {
    throw err;
  }
}

export async function GetLastHundredMessage(room: string) {
  try {
    return await Message.find({ room: room }, { message: 1, username: 1, createdAt: 1 }).limit(100);
  }
  catch (err: any) {
    throw err;
  }
}