// In src/services/recordService.js
const Record = require("../database/Record");

const getRecordForMessage = (messageId) => {
  try {
    const record = Record.getRecordForMessage(messageId);
    return record;
  } catch (error) {
    throw error;
  }
};
module.exports = { getRecordForMessage };