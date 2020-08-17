exports.validadorDeRegistro = (req,res,next)=>{
        req.check('nombre', 'Nombre es requerido').notEmpty();
        req.check('correo', 'Correo debe contener entre 3 a 23 caracteres')
            .notEmpty()
            .matches(/.+\@.+\..+/)
            .withMessage('Correo debe contener @')
            .isLength({
                min: 4,
                max: 32
            });
        req.check('contrasena', 'Contraseña es requerida').notEmpty();
        req.check('contrasena')
            .isLength({ min: 6 })
            .withMessage('Contrasena debe contener al menos 6 caracteres')
            .matches(/\d/)
            .withMessage('Contraseña debe contener al menos 1 numero');
        const errors = req.validationErrors();
        if (errors) {
            const firstError = errors.map(error => error.msg)[0];
            return res.status(400).json({ error: firstError });
        }
        next();
    };
    