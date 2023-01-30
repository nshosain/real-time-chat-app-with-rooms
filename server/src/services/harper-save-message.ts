import axios from "axios";
import { SaveMessageInterface } from "../models/message-model";

export default function harperSaveMessage(saveMessage: SaveMessageInterface) {

  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

  var data = JSON.stringify({
    operation: "insert",
    schema: "realtime_chat_app",
    table: "messages",
    records: [saveMessage],
  });

  var config = {
    method: "post",
    url: dbUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: dbPw,
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
