import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim().length === 0 ||
      !text ||
      text.trim().length === 0
    ) {
      res.status(403).json({message: 'Incorrect data!'});
      return;
    }

    const newMessage = { email, name, text };

    let client;

    let connnectionString = `mongodb+srv://${process.env.database_user}:${process.env.database_password}@${process.env.database_cluster}.ldo1rpm.mongodb.net/${process.env.database_name}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connnectionString);
    } catch (error) {
      res.status(500).json({ message: "Couldn't connect to database!" });
      return;
    }

    try {
      const db = client.db();
      const collection = db.collection("messages");
      const result = await collection.insertOne(newMessage);
      res.status(201).json({ message: "Message delivered successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!" });
    }

    client.close();
  }
}
