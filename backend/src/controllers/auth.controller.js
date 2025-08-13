//controllers es la carpeta que se encarga de la logica de la aplicacion y manejar la 
//interaccion entre el modelo y la vista
//en este caso se encarga de la autenticacion de los usuarios
//*la diferencia entre res.json y res.send es que res.json devuelve un objeto json
//*y res.send devuelve un string
//* export const login = (req, res) => res.send("Loginn");

import User from "../models/user.model.js"; //importamos el modelo de usuario
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";


export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {

    const userExists = await User.findOne({ email });
    if (userExists)
      //  return res.status(400).json({ message: "Email already exists" });
      return res.status(400).json(["Ya existe ese emaillllll"]);


    const passwordHash = await bcrypt.hash(password, 10); //encripta la contraseña
    const newUser = new User({
      username,
      email,
      password: passwordHash //passwordHash es la contraseña encriptada pero
      //  no altera el valor de password en la base de datos de esta manera
      // se mantiene la seguridad de la contraseña del usuario
    });


    //guardar usuario en la base de datos
    const userSaved = await newUser.save(); //el metodo save() guarda el usuario en la base de datos
    // res.json(userSaved); //devuelve el usuario guardado en formato json
    // res.send("User registered successfully"); //devuelve un mensaje de exito

    const token = await createAccessToken({ id: userSaved._id }); //guarda el id del usuario en el token en la
    //propiedad payload

    res.cookie("token", token) //metodo de express para guardar el token en una cookie,
    //el "token" es el nombre de la cookie y token es el valor de la cookie

    //lo que se le muestra al frontend
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    })


  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  //necesita async porque se hace una peticion a la base de datos
  const { email, password } = req.body;

  try {


    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found, look email" });

    const matchPassword = await bcrypt.compare(password, userFound.password);
    if (!matchPassword) return res.status(400).json(["Incorrect password"]);

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    // res.json({
    //   message: "User logged successfully",
    // });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// export const logout = (req, res) => { //no necesita async porque no se hace ninguna peticion a la base de datos
//   //en cambio se hace una peticion al servidor para borrar la cookie
//   res.clearCookie("token"); //
//   res.json({
//     message: "User logged out successfully"
//   });
// }

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  // console.log(req.user);
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  });
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies; //obtiene la cookie del token

  if (!token) return res.status(401).json({ message: "no token provided" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => { //verifica el token con el TOKEN_SECRET
    if (err) return res.status(401).json({ message: "unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "user not found" });

    return res.json(
      {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
  });
}

// export const verifyToken = async (req, res) => {
//   const { token } = req.cookies;
//   if (!token) return res.send(false);

//   jwt.verify(token, TOKEN_SECRET, async (error, user) => {
//     if (error) return res.sendStatus(401);

//     const userFound = await User.findById(user.id);
//     if (!userFound) return res.sendStatus(401);

//     return res.json({
//       id: userFound._id,
//       username: userFound.username,
//       email: userFound.email,
//     });
//   });
// };
