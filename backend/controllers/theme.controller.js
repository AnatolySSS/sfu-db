import db from "../models/_index.js";
const User = db.user

export const ThemeController = {

  update(request, responce) {
    try {
      let { login, theme } = request.body;
      User.update(
        { theme: theme },
        {
          where: {
            login: login,
          },
        }
      )
        .then((res) => {
          responce.json({
            resultCode: 0,
            message: "Тема обновлена",
          });
        })
        .catch((err) => responce.json(err));
    } catch (error) {
      responce.json(error);
    }
  },

};
