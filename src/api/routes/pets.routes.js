
const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllPets,
  getPetsByID,
  createPets,
  deletePets,
  patchPet,
} = require("../controllers/pets.controller");

router.get("/", getAllPets);
router.get("/:id",  getPetsByID);
router.post("/", upload.fields([
  { name: "picture", maxCount: 1 },
  { name: "picture1", maxCount: 1 },
  { name: "picture2", maxCount: 1 }
]), createPets);
router.delete("/:id",[isAuth],upload.fields([
  { name: "picture", maxCount: 1 },
  { name: "picture1", macCount: 1 },
  { name: "picture2", maxCount: 1}
]), deletePets);

router.patch("/:id",[isAuth], upload.fields([
  { name: "picture", maxCount: 1 },
  { name: "picture1", macCount: 1 },
  { name: "picture2", maxCount: 1}
]), patchPet);

module.exports = router;
