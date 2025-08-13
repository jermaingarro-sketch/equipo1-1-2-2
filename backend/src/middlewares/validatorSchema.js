export const validateSchema = (schema) => async (req, res, next) => {
    try {
        schema.parse(req.body);
        
    } catch (error) {
        return res
            .status(400)
            // .json({ fallo: error.errors.map((error) => error.message) });
            //esto es para que muestre los errores de error de errors de message
            .json(error.errors.map((error) => error.message));

    }


    next();
};
