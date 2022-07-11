const { deleteFile } = require('../../middlewares/deleteFile');
const Pet = require('../models/pets.model.js');
const HTTPSTATUSCODE = require('../../utils/httpStatusCode');

const getAllPets = async (req, res, next) => {
  try {
    const allPets = await Pet.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      pets: allPets,
    });
  } catch (error) {
    return next(error);
  }
};

const getPetsByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const petsByID = await Pet.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      pet: petsByID,
    });
  } catch (error) {
    return next(error);
  }
};

const createPets = async (req, res, next) => {
  try {
    const newPets = new Pet(req.body);
    console.log(req.files.picture);
    if (req.files.picture) {
      newPets.picture = req.files.picture[0].path;
    }
    if (req.files.picture1) {
      newPets.picture1 = req.files.picture1[0].path;
    }
    if (req.files.picture2) {
      newPets.picture2 = req.files.picture2[0].path;
    }
    const createdPets = await newPets.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      console: createdPets,
    });
  } catch (error) {
    return next(error);
  }
};

const deletePets = async (req, res, next) => {
  try {
    const { id } = req.params;

    const petBorrado = await Pet.findByIdAndDelete(id);

    return res.status(200).json(petBorrado);
  } catch (error) {
    return next(error);
  }
};

const patchPet = async (req, res, next) => {
  try {
    const { id } = req.params;

    const patchPet = new Pet(req.body);

    patchPet._id = id;

    const petData = await Pet.findById(id);
    console.log(patchPet);

    if (req.files.picture) {
      patchPet.picture = req.files.picture[0].path;
    }
    if (req.files.picture1) {
      patchPet.picture1 = req.files.picture1[0].path;
    }
    if (req.files.picture2) {
      patchPet.picture2 = req.files.picture2[0].path;
    }
    // patchPet.picture =[...petData.picture, ...patchPet.picture]
    const PetDB = await Pet.findByIdAndUpdate(id, patchPet);

    return res.status(200).json({ nuevo: patchPet, vieja: PetDB });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllPets, getPetsByID, createPets, patchPet, deletePets };
