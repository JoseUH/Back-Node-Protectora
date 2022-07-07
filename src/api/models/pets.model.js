const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PetSchema = new Schema(
  {
    picture:  { type: String, required: true },
    picture1:  { type: String, required: false },
    picture2:  { type: String, required: false },
    
    type: { type: String, required: true },
    name: { type: String, required: true },
    sex: { type: String, required: true },
    size: { type: String, required: true },
    age: { type: String, required: true },
    adopted: { type: Boolean, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

const Pet = mongoose.model("pets", PetSchema);

module.exports = Pet;