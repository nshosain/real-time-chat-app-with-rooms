import { model, Document, Schema } from "mongoose";

export interface MessageInterface extends Document {
    message: string,
    username: string,
    room: string
}

export const MessageSchema = new Schema(
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

const Message = model<MessageInterface>("Message", MessageSchema);

export default Message;