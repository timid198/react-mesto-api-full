const Card = require('../models/cards');
const BadRequestError = require('../errors/bad-request-err');
const AuthorizedButForbiddenError = require('../errors/authorized-but-forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports = {
  createCard(req, res, next) {
    const { name, link } = req.body;
    Card.create({ name, link, owner: req.user._id })
      .then((card) => {
        res.send({ data: card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          throw new BadRequestError('Переданы некорректные данные в метод создания карточки.');
        }
      })
      .catch(next);
  },

  getAllCards(req, res, next) {
    Card.find({})
      .populate(['owner', 'likes'])
      .then((cards) => res.send({ cards }))
      .catch(next);
  },

  deleteCardById(req, res, next) {
    const cardIdentificator = req.params.cardId;
    Card.findById(req.params.cardId)
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Карточка не найдена.');
        }
        if (`${req.user._id}` === `${card.owner._id}`) {
          Card.findByIdAndRemove(cardIdentificator)
            .then((data) => res.send(data));
        }
        throw new AuthorizedButForbiddenError('Вы пытаетесь изменить не свои данные.');
      })
      .catch((err) => {
        if (err.statusCode === 404 || err.statusCode === 403) {
          throw err;
        }
        if (err.name === 'CastError') {
          throw new BadRequestError('Переданы некорректные данные.');
        }
      })
      .catch(next);
  },

  likeCard(req, res, next) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
      console.log(`в лайках: карточка - ${req.params.cardId}, пользователь - ${req.user._id}`),
    )
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Карточка не найдена.');
        }
        res.send(card);
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          throw err;
        }
        if (err.name === 'CastError') {
          throw new BadRequestError('Переданы некорректные данные.');
        }
      })
      .catch(next);
  },

  dislikeCard(req, res, next) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
      console.log(`в дизлайках: карточка - ${req.params.cardId}, пользователь - ${req.user._id}`),
    )
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Карточка не найдена.');
        }
        res.send(card);
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          throw err;
        }
        if (err.name === 'CastError') {
          throw new BadRequestError('Переданы некорректные данные.');
        }
      })
      .catch(next);
  },
};
