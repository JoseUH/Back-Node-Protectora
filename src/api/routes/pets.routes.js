
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
router.post("/",[isAuth],upload.single("picture"), createPets);
router.delete('/:id',[isAuth],upload.single("picture"), deletePets);
router.patch('/:id',[isAuth],upload.single("picture"), patchPet)

module.exports = router;
