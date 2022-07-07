const { deleteFile } = require("../../middlewares/deleteFile");
const Pet = require("../models/pets.model.js");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



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

    if (req.file) {
      newPets.picture = req.file.path;
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

      
      const petData= await Pet.findById(id)

      

      if (petData.picture) {
        
        deleteFile(petData.picture);
        }

      if (req.file) {
        patchPet.picture = req.file.path;
      }
  
      const PetDB = await Pet.findByIdAndUpdate(id, patchPet);
      
      return res.status(200).json({ nuevo: patchPet, vieja: PetDB });
    } catch (error) {

      return next(error);
    }
  };
  
module.exports = { getAllPets, getPetsByID, createPets,patchPet,deletePets };
