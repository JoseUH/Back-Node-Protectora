const { deleteFile } = require("../../middlewares/deleteFile");
const Blog = require("../models/blogs.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllBlogs = async (req, res, next) => {
  try {
    const allBlogs = await Blog.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      blogs: allBlogs,
    });
  } catch (error) {
    return next(error);
  }
};


const getBlogsByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blogsByID = await Blog.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Blog: blogsByID,
    });
  } catch (error) {
    return next(error);
  }
};


const createBlogs = async (req, res, next) => {
  try {
    const newBlogs = new Blog(req.body);
    if (req.file) {
      newBlogs.picture = req.file.path;
    }
    const createdBlogs = await newBlogs.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      blog: createdBlogs,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteBlogs = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const blogBorrado = await Blog.findByIdAndDelete(id);
  
      return res.status(200).json(blogBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchBlog = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchBlog = new Blog(req.body);
  
      patchBlog._id = id;

      const blogData= await Blog.findById(id)


      if (blogData.picture) {
        deleteFile(blogData.picture);
        }

      if (req.file) {
        patchBlog.picture = req.file.path;
      }
  
      const BlogDB = await Blog.findByIdAndUpdate(id, patchBlog);
      
      return res.status(200).json({ nuevo: patchBlog, vieja: BlogDB });
    } catch (error) {
      return next(error);
    }
  };

module.exports = { getAllBlogs, getBlogsByID, createBlogs,patchBlog,deleteBlogs};
