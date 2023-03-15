const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { PORT, BINDING_KEY } = require("./config/serverConfig");

// const { sendBasicEmail } = require('./services/email-service');
const TicketController = require("./controller/ticket-controller");

const jobs = require("./utils/job");
const { subscribeMessage } = require("./utils/messageQueue");
const setupAndStartServer = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets", TicketController.create);
  await subscribeMessage(`hw`, `hoo`, BINDING_KEY);
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
    jobs();
    // sendBasicEmail(
    //     'support@admin.com',
    //     'moviebookingappservice@gmail.com',
    //     'This is a testing email',
    //     'Hey, how are you, I hope you like the support'
    // );
  });
};

setupAndStartServer();
