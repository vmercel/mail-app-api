// In src/database/Message.js
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");


/**
 * @openapi
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         subject: 
 *           type: string
 *           example: Tommy V  
 *         content:
 *           type: string
 *           example: For Time
 *         isRead:
 *           type: boolean
 *           example: false
 *         owner:
 *           type: string
 *           example: "James"
 */

const getAllMessages = (filterParams) => {
  try {
    let messages = DB.messages;
    if (filterParams.mode) {
      return DB.messages.filter((message) =>
        message.content.toLowerCase().includes(filterParams.mode)
      );
    }
    // Other if-statements will go here for different parameters
    return messages;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneMessage = (messageId) => {
  try {
    const message = DB.messages.find((message) => message.id === messageId);
    if (!message) {
      throw {
        status: 400,
        message: `Can't find message with the id '${messageId}'`,
      };
    }
    return message;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewMessage = (newMessage) => {
  try {
    const isAlreadyAdded =
      DB.messages.findIndex((message) => message.name === newMessage.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Message with the name '${newMessage.name}' already exists`,
      };
    }
    DB.messages.push(newMessage);
    saveToDatabase(DB);
    return newMessage;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneMessage = (messageId, changes) => {
  try {
    const isAlreadyAdded =
      DB.messages.findIndex((message) => message.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Message with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.messages.findIndex(
      (message) => message.id === messageId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find message with the id '${messageId}'`,
      };
    }
    const updatedMessage = {
      ...DB.messages[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.messages[indexForUpdate] = updatedMessage;
    saveToDatabase(DB);
    return updatedMessage;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneMessage = (messageId) => {
  try {
    const indexForDeletion = DB.messages.findIndex(
      (message) => message.id === messageId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find message with the id '${messageId}'`,
      };
    }
    DB.messages.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllMessages,
  createNewMessage,
  getOneMessage,
  updateOneMessage,
  deleteOneMessage,
};