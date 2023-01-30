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
    const query: FilterQuery<MessageInterface> = { room: room };
    return await Message.find(query).sort({ createdAt: -1 }).limit(100);
  }
  catch (err: any) {
    throw err;
  }
}