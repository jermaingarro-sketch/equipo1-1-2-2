import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const authRequired = (req, res, next) => {
//     // const cookies = req.cookies;
//     // console.log(cookies);

//     const {token} = req.cookies;
//     if(!token) return res.status(401).json({message: "Unauthorized, bcs no token provided"});

//     jwt.verify(token, TOKEN_SECRET, (err, user) => { 
//         if(err) return res.status(403).json({message: "Unauthorized, invalid token"});
//         req.user = user;
//     }); 
//     next();

// }
//esto es para que continue con la siguiente funcion