import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Это обязательное поле",
  },
  string: {
    min: ({ min }) => `Не менее ${min} символов`,
    max: ({ max }) => `Не более ${max} символов`,
    email: "Ожидается правильный email",
  },
});

export default yup;
