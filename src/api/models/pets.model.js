const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PetSchema = new Schema(
  {
    picture: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    sex: { type: String, required: true },
    size: { type: String, required: true },
    age: { type: Number, required: true },
    adopted: { type: Boolean, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

const Pet = mongoose.model("pets", PetSchema);

module.exports = Pet;