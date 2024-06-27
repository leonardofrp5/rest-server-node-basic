const { Router } = require('express');
const { fieldValidations } = require('../middlewares/field-validations');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user');
const { check } = require('express-validator');
const { isValidRol, emailExists, userExistsById } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExistsById),
    check('rol').custom(isValidRol),
    fieldValidations
  ],
  usuariosPut
);

router.post(
  '/',
  [
    check('name', 'Nombre es un campo obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe tener más de 6 letras')
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    // check('email', 'No es un correo valido').isEmail(),
    check('email', 'No es un correo').custom(emailExists).isEmail(),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom(isValidRol),
    fieldValidations
  ],
  usuariosPost
);

router.delete(
  '/:id',
  [check('id', 'No es un ID valido').isMongoId(), check('id').custom(userExistsById), fieldValidations],
  usuariosDelete
);

module.exports = router;
