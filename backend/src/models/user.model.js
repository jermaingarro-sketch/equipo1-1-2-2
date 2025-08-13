import mongoose from "mongoose";

const userSchema = new mongoose.Schema(  //mongoose.schema es un constructor que toma
//  un objeto de esquema que define la forma de los documentos que se pueden almacenar en la coleccion
//su funcion es definir la estructura de los documentos que se pueden almacenar en la coleccion
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema); //sirve para imteractuar con la base de datos con el modelo de usuario
