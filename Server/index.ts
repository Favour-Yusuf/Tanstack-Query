import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import postShema from "./Model";
const port: number = 3400;
const url: string = "mongodb://localhost/tanQueryDB";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(url).then(() => {
  console.log("database is connected");
});

// create a post

app.post("/api/createPosts", async (req: Request, res: Response) => {
  const { myTitle, description } = req.body;

  const creatingPost = await postShema.create({
    myTitle,
    description,
  });

  res.status(201).json(creatingPost);
});

// get All Post

app.get("/api/getPost", async (req: Request, res: Response) => {
  const retrievePost = await postShema.find();
  res.status(200).json(retrievePost);
});

// get single post
app.get("/api/getPost/:id", async (req: Request, res: Response) => {
  const retrieveSinglePost = await postShema.findById(req.params.id);
  res.status(200).json(retrieveSinglePost);
});

// edit single post
app.patch("/api/editPost/:id", async (req: Request, res: Response) => {
  const { myTitle } = req.body;
  const retrieveSinglePost = await postShema.findByIdAndUpdate(req.params.id, {
    myTitle,
  });
  res.status(200).json(retrieveSinglePost);
});

// delete single post
app.delete("/api/removePost/:id", async (req: Request, res: Response) => {
  const retrieveSinglePost = await postShema.findByIdAndRemove(req.params.id);
  res.status(200).json(retrieveSinglePost);
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
