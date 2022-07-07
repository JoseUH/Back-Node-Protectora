const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    picture: { type: String, required: false },
    date: { type: String, required: false },
    
  },
  { timestamps: true }
);

const Blog = mongoose.model("blogs", BlogSchema);

module.exports = Blog;
