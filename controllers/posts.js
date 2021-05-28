import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const result = await PostMessage.findById(req.params._id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  
  try {
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params._id;
    const result = await PostMessage.findOneAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePosts = async (req, res) => {
  try {
    const result = await PostMessage.deleteMany();
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
};
