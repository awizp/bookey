const validate = (schema) => (req, res, next) => {
    try {
        const result = schema.parse(req.body);

        req.body = result;

        next();
    } catch (error) {
        return res.status(400).json({
            message: "Validation error",
            errors: error.issues || error.errors,
        });
    }
};

export default validate;
