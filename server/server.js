require("dotenv").config();
const socketSetup = require("./sockets/socketSetup");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./utiils/connectToDatabase");
const autheticationRoter = require("./routes/authentication.routes");
const companyRouter = require("./routes/company.routes");
const jobsRouter = require("./routes/job.routes");
const applicationRouter = require("./routes/application.routes");
const featuresRouter = require("./routes/features.routes");
const { createServer } = require("http");
const path = require("path");

connectToDatabase()
  .then(() => {
    const app = express();
    const httpServer = createServer(app);
    // const _dirname = path.resolve() ;
    // Middlewares
    app.use(
      cors({
        origin: `${process.env.FRONTEND_BASE_URL}`,
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // Routes
    // This Is A Comment
    app.get("/", (request, response) => {
      response.send("Hello Abhishek");
    });

    app.use("/api/job", jobsRouter);

    app.use("/api/company", companyRouter);
    app.use("/api/features", featuresRouter);
    app.use("/api/auth", autheticationRoter);
    app.use("/api/application", applicationRouter);

    // Static
    // app.use(express.static(path.join(_dirname,"/client/dist"))) ;
    // app.get("*",(request,response)=>{
    //     response.sendFile(path.join(_dirname,"/client/dist/index.html"));
    //     });
    socketSetup(httpServer);
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
