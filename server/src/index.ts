import express, { Express } from "express";
import config from "config";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import logger, { throwBadRequestError } from "./utils/logger";

import { UserInterface } from "./models/user-model";

import createDBConnection from "./db/db-connection";

import leaveRoom from "./utils/leave-room";
// import harperSaveMessage from "./services/harper-save-message";
// import harperGetMessages from "./services/harper-get-messages";

const PORT = config.get<number>('PORT');
const ORIGIN = config.get<string>('ORIGIN');

const app: Express = express();

app.use(cors()); // Add cors middleware

createDBConnection();

const server = http.createServer(app);

// Create an io server and allow for CORS from specified origin with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: ORIGIN,
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";

let chatRoom: string = ""; // E.g. javascript, node,...
let allUsers: any = []; // All users in current chat room

// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  // Add a user to a room
  socket.on("join_room", (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted

    if (!username || !room) throwBadRequestError('Username and Room must be selected');

    socket.join(room); // Join the user to a socket room

    let createdAt = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      createdAt,
    });

    // Send welcome msg to only the user that just joined chat
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      createdAt,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    let chatRoomUsers = allUsers.filter((user: UserInterface) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    // harperGetMessages(room)
    //   .then((last100Messages) => {
    //     // console.log('latest messages', last100Messages);
    //     socket.emit("last_100_messages", last100Messages);
    //   })
    //   .catch((err) => console.log(err));
  });

  // socket.on("send_message", (data) => {
  //   const { message, username, room, __createdtime__ } = data;
  //   io.in(room).emit("receive_message", data); // Send to all users in room, including sender
  //   harperSaveMessage(message, username, room, __createdtime__) // Save message in db
  //     .then((response) => console.log(response))
  //     .catch((err) => console.log(err));
  // });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    const createdAt = Date.now();
    // Remove user from memory
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(room).emit("chatroom_users", allUsers);
    socket.to(room).emit("receive_message", {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      createdAt,
    });
  });

  socket.on("disconnect", () => {
    const user = allUsers.find((user: UserInterface) => user.id == socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit("chatroom_users", allUsers);
      socket.to(chatRoom).emit("receive_message", {
        message: `${user.username} has disconnected from the chat.`,
        username: CHAT_BOT,
        createdAt: Date.now()
      });
    }
  });
});

server.listen(PORT, async () => {
  logger.info(`Server is running on port ${PORT}`);
});
