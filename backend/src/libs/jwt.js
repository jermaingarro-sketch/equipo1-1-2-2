import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";



// /**
//  * Creates an access token with the given payload.
//  *
//  * @param {Object} payload - The payload to include in the token.
//  * @returns {Promise<string>} A promise that resolves to the generated token.
//  */
export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}


// export function createAccessToken(payload) { //genera un token de acceso
//     return new Promise((resolve, reject) => { //ponemos return
//         //sin el return no se puede hacer el await
//         jwt.sign( //sirve
//             // {
//             //     id: userSaved._id,
//             // },
//             // "secret123",
//             payload, //payload es el id del usuario
//             TOKEN_SECRET,
//             {
//                 expiresIn: "1d",
//             },
//                 (err, token) => {
//             if(err) reject(err);
//             resolve(token);
//         }
//         );
//     });
// }