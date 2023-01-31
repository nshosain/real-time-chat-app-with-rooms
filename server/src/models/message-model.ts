import mongoose, { Document, Schema } from "mongoose";

export interface IMessage {
    message: string,
    username: string,
    room: string
}

export interface IMessageSchema extends IMessage, Document { }

export const MessageSchema: Schema = new Schema(
    {
        message: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        room: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const MessageModel = mongoose.model<IMessageSchema>("message", MessageSchema);
export default MessageModel;