// In src/services/messageService.js
const { v4: uuid } = require("uuid");
const Message = require("../database/Message");

const getAllMessages = (filterParams) => {
  try {
    const allMessages = Message.getAllMessages(filterParams);
    return allMessages;
  } catch (error) {
    throw error;
  }
};

const getOneMessage = (messageId) => {
  try {
    const message = Message.getOneMessage(messageId);
    return message;
  } catch (error) {
    throw error;
  }
};

const createNewMessage = (newMessage) => {
  const messageToInsert = {
    ...newMessage,
    id: uuid(),

  };
  try {
    const createdMessage = Message.createNewMessage(messageToInsert);
    return createdMessage;
  } catch (error) {
    throw error;
  }
};

const updateOneMessage = (messageId, changes) => {
  try {
    const updatedMessage = Message.updateOneMessage(messageId, changes);
    return updatedMessage;
  } catch (error) {
    throw error;
  }
};

const deleteOneMessage = (messageId) => {
  try {
    Message.deleteOneMessage(messageId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMessages,
  getOneMessage,
  createNewMessage,
  updateOneMessage,
  deleteOneMessage,
};