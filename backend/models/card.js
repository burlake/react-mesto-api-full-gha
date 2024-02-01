const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: {
      value: true,
      message: 'Поле является обязательным',
    },
    minlength: [2, 'Минимальная длинна 2 символа'],
    maxlength: [30, 'Максимальная длинна 30 символ'],
  },
  link: {
    type: String,
    required: {
      value: true,
      message: 'Поле является обязательным',
    },
    validate: {
      validator(v) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(v);
      },
      message: 'Введите URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: {
      value: true,
      message: 'Поле является обязательным',
    },
    ref: 'user',
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('card', cardSchema);
