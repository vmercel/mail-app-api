// In src/controllers/messageController.js
const recordService = require("../services/recordService");



const getRecordForMessage = (req, res) => {
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
    const message = recordService.getRecordforMessage(messageId);
    res.send({ status: "OK", data: message });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};



module.exports = {

  getRecordForMessage,
};