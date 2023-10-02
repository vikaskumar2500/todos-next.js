import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    if (req.method === "DELETE") {
      const id = req.query.id;

      const client = await MongoClient.connect(
        "mongodb+srv://vikas:todos@cluster0.hkt90qy.mongodb.net/?retryWrites=true&w=majority&appName=todos"
      );

      const db = client.db();
      const meetupsCollection = db.collection("todos");

      const result = await meetupsCollection.deleteOne({ id: id });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Task deleted successfully" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }

      client.close();
    } else if (req.method === "POST") {
      const data = req.body;

      const client = await MongoClient.connect(
        "mongodb+srv://vikas:todos@cluster0.hkt90qy.mongodb.net/?retryWrites=true&w=majority&appName=todos"
      );

      const db = client.db();
      const meetupsCollection = db.collection("todos");
      const result = await meetupsCollection.insertOne(data);

      client.close();
      res.status(201).json({ message: "Task inserted!" });
    } else if (req.method === "PUT") {
      const data = req.body;
      const id = req.query.id;

      const client = await MongoClient.connect(
        "mongodb+srv://vikas:todos@cluster0.hkt90qy.mongodb.net/?retryWrites=true&w=majority&appName=todos"
      );

      const db = client.db();
      const meetupsCollection = db.collection("todos");
      const result = await meetupsCollection.updateOne(
        { id: id },
        { $set: data }
      );

      if (result.matchedCount === 1) {
        res.status(200).json({ message: "Task updated successfully" });
      } else res.status(404).json({ message: "Task not found" });

      client.close();
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
