require('dotenv').config();
const express = require('express');
// const helmet = require('helmet');
const mongoose = require('mongoose');
// const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const validator = require('validator');
const {
  celebrate, Joi, isCelebrateError,
} = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allowedCors = require('./middlewares/allowedCors');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');
const BadRequestError = require('./errors/bad-request-err');
const NotFoundError = require('./errors/not-found-err');
const ServerError = require('./errors/serverError');

const { PORT = 3000 } = process.env;
const app = express();

const validateEmail = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Неверная электронная почта');
};

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);

app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.use(allowedCors);

// app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required().min(8).messages({
      'string.min': 'Минимальная длина поля "password" - 8',
      'string.empty': 'Поле "password" должно быть заполнено',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля "name" - 2',
      'string.max': 'Максимальная длина поля "name" - 30',
      'string.empty': 'Поле "name" должно быть заполнено',
    }),
    about: Joi.string().min(2).max(200).messages({
      'string.min': 'Минимальная длина поля "about" - 2',
      'string.max': 'Максимальная длина поля "about" - 200',
      'string.empty': 'Поле "about" должно быть заполнено',
    }),
    avatar: Joi.string().pattern(/^(https|http):\/\/(www\.)?[A-Za-z0-9-]*\.[A-Za-z0-9]{2}[A-Za-z0-9-._~:\\/?#[\]@!$&'()*+,;=]*#?$/)
      .messages({
        'string.pattern.base': 'Поле "avatar" должно быть ссылкой.',
      }),
  }, { abortEarly: false }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required().messages({
      'string.min': 'Минимальная длина поля "password" - 8',
      'string.empty': 'Поле "password" должно быть заполнено',
    }),
  }, { abortEarly: false }),
}), login);

app.use(auth);

app.use('/users', routerUser);
app.use('/cards', routerCards);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден.'));
});
app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    throw new BadRequestError(err.details.get('body').message);
  }
  next(err);
});
app.use(ServerError);

app.listen(PORT);
