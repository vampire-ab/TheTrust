// import { Server } from "socket.io";

// export default function SocketHandler(req, res) {
//   if (res.socket.server.io) {
//     console.log("Already set up");
//     res.end();
//     return;
//   }

//   const io = new Server(res.socket.server);
//   res.socket.server.io = io;

//   io.on("connection", (socket) => {
//     console.log("Socket id is: ");
//     console.log(socket.id);
//     socket.on("send-message", (obj) => {
//       console.log(obj);
//       io.emit("receive-message", obj);
//     });
//   });

//   console.log("Setting up socket");
//   res.end();
// }
