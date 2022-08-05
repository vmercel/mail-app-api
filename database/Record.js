// In src/database/Record.js
const DB = require("./db.json");

const getRecordForMessage = (messageId) => {
  try {
    const record = DB.records.filter((record) => record.message === messageId);
    if (!record) {
      throw {
        status: 400,
        message: `Can't find message with the id '${messageId}'`,
      };
    }
    return record;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};
module.exports = { getRecordForMessage };