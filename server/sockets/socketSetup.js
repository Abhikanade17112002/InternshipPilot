const { Server } = require("socket.io");
const sendEmail = require("../utiils/sendEmails");

const disconnect = (socket) => {
  console.log(`CLIENT DISCONNECTED SOCKET ID ${socket.id}`);

  for (const [userId, socketId] of userSocketMapping.entries()) {
    if (socketId === socket.id) {
      userSocketMapping.delete(userId);
      break;
    }
  }
};
const userSocketMapping = new Map();
const socketSetup = (httpServer) => {
  // Creating An IO Instance
  const IO = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  IO.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMapping.set(userId, socket.id);
      console.log(
        `CLIENT CONNECTED WITH SOCKET ID ${socket.id} AND USER ID ${userId}`
      );
    } else {
      console.log("NO USER ID FOUND");
    }

    socket.on("update-appilcation-status", (data) => {
      const reciverSocketId = userSocketMapping.get(data.applicantId);
      const Mydata = {
        subject: "STATUSUPDATE",
        status: data?.status,
        emailId: data?.emailId,
        name: data?.name,
        jobTitle: data?.jobTitle,
        companyName: data?.companyName,
        companyEmail: data?.companyEmail,
      };
      sendEmail(Mydata);

      IO.to(reciverSocketId).emit("updated-application-status", {
        status: data.status,
        applicationId: data.applicationId,
      });
    });
    
  });
};

module.exports = socketSetup;
