import Message, { MessageInterface } from "../models/message-model";

export default async function mongooseSaveMessage(messageData: MessageInterface) {
  try {
    await Message.create([messageData]);
  }
  catch (err: any) {
    throw err;
  }
}