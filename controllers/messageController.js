// In src/controllers/messageController.js
const messageService = require("../services/messageService");

const getAllMessages = (req, res) => {
  
 const { mode } = req.query;
  try {
    const allMessages = messageService.getAllMessages({ mode });
    res.send({ status: "OK", data: allMessages });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneMessage = (req, res) => {
  const {
    params: { messageId },
  } = req;
  if (!messageId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':messageId' can not be empty" },
      });
  }
  try {
    const message = messageService.getOneMessage(messageId);
    res.send({ status: "OK", data: message });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewMessage = (req, res) => {
  const { body } = req;
  if (
    !body.subject ||
    !body.content ||
    !body.isRead ||
    !body.owner 
  ) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
        },
      });
    return;
  }
  const newMessage = {
    name: body.subject,
    mode: body.content,
    equipment: body.isRead,
    exercises: body.owner
  };
  try {
    const createdMessage = messageService.createNewMessage(newMessage);
    res.status(201).send({ status: "OK", data: createdMessage });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneMessage = (req, res) => {
  const {
    body,
    params: { messageId },
  } = req;
  if (!messageId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':messageId' can not be empty" },
      });
  }
  try {
    const updatedMessage = messageService.updateOneMessage(messageId, body);
    res.send({ status: "OK", data: updatedMessage });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneMessage = (req, res) => {
  const {
    params: { messageId },
  } = req;
  if (!messageId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':messageId' can not be empty" },
      });
  }
  try {
    messageService.deleteOneMessage(messageId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllMessages,
  getOneMessage,
  createNewMessage,
  updateOneMessage,
  deleteOneMessage,
  //getRecordsForMessage,
};