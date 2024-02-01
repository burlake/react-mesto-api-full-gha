const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserMe, getUserById, editUserData, editUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserMe); // GET /users/me - возвращает информацию о текущем пользователе

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().min(24).max(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), editUserData);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
  }),
}), editUserAvatar);

module.exports = router;