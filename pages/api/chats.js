import dbConnect from "../../lib/mongodb";
import Chat from "../../models/Chat";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const chat = await Chat.create(req.body);
        res.status(201).json({ success: true, data: chat });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const chats = await Chat.find({});
        res.status(200).json({ success: true, data: chats });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
