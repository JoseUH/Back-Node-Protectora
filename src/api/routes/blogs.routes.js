const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllBlogs,
  getBlogsByID,
  createBlogs,
  deleteBlogs,
  patchBlog,
} = require("../controllers/blogs.controller");

router.get("/", getAllBlogs);
router.get("/:id", getBlogsByID);
router.post("/",[isAuth], upload.single("picture"), createBlogs);
router.delete('/:id',[isAuth], upload.single("picture"), deleteBlogs);
router.patch('/:id',[isAuth], upload.single("picture"), patchBlog)

module.exports = router;
