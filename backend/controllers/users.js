const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const BadRequestError = require('../errors/bad-request-err');
const AuthorizedButForbiddenError = require('../errors/authorized-but-forbidden-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

module.exports = {
  createUser(req, res, next) {
    const {
      email, password, name, about, avatar,
    } = req.body;
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        email, password: hash, name, about, avatar,
      })
        .then((user) => res.send({ user }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError('Переданы некорректные данные в метод создания пользователя.');
          }
          if (err.name === 'MongoError' && err.code === 11000) {
            throw new ConflictError('Адрес электронной почты уже используется.');
          }
        }))
      .catch(next);
  },

  getAllUsers(req, res, next) {
    User.find({})
      .then((users) => res.send({ users }))
      .catch(next);
  },

  getUserById(req, res, next) {
    const profile = req.params.userId;
    const authUser = req.user._id;
    User.findById(profile)
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Пользователь не найден.');
        }
        if (`${user._id}` === `${authUser}`) {
          res.send({ user });
        }
        throw new AuthorizedButForbiddenError('Вы не авторизованы.');
      })
      .catch((err) => {
        if (err.statusCode === 404 || err.statusCode === 403) {
          throw err;
        }
        if (err.name === 'CastError') {
          throw new BadRequestError('Переданы некорректные данные в метод создания пользователя.');
        }
      })
      .catch(next);
  },

  updateUserProfile(req, res, next) {
    const { name, about } = req.body;
    if (req.body.name && req.body.about) {
      User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
        .then((user) => {
          if (!user) {
            throw new NotFoundError('Пользователь не найден.');
          }
          res.send({ user });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError('Переданы некорректные данные в метод создания пользователя.');
          }
          if (err.name === 'CastError') {
            throw new BadRequestError('Переданы некорректные данные.');
          }
        })
        .catch(next);
    } else {
      throw new BadRequestError('Переданы некорректные данные.');
    }
  },

  updateUserAvatar(req, res, next) {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Пользователь не найден.');
        }
        res.send({ user });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequestError('Переданы некорректные данные в метод изменения аватара.');
        }
        if (err.name === 'CastError') {
          throw new BadRequestError('Переданы некорректные данные.');
        }
      })
      .catch(next);
  },

  findAuthorized(req, res, next) {
    const { email } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Пользователь не найден.');
        }
        res.send({ user });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequestError('Переданы некорректные данные в метод изменения аватара.');
        }
        if (err.name === 'CastError') {
          throw new BadRequestError('Переданы некорректные данные.');
        }
      })
      .catch(next);
  },

  login(req, res, next) {
    const { email, password } = req.body;
    return User.findUserByCredentials({ email, password })
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, 'cohort-22-web-development', { expiresIn: '7d' });
        res
          .cookie('jwt', token, {
            httpOnly: true,
          })
          .end();
      })
      .catch(() => { throw new UnauthorizedError('Неправильные почта или пароль'); })
      .catch(next);
  },
};
