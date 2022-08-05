// In src/v1/routes/messageRoutes.js
const express = require("express");
const apicache = require("apicache");
const messageController = require("../../controllers/messageController");
const recordController = require("../../controllers/recordController");

const router = express.Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/messages:
 *   get:
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a message
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Message"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */

router.get("/", cache("2 minutes"), messageController.getAllMessages);

router.get("/:messageId", messageController.getOneMessage);

router.get("/:messageId/records", recordController.getRecordForMessage);

router.post("/", messageController.createNewMessage);

router.patch("/:messageId", messageController.updateOneMessage);

router.delete("/:messageId", messageController.deleteOneMessage);

module.exports = router;