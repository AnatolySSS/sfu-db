import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import db from "../models/_index.js";
const User = db.user
import authConfig from "../config/auth.config.js";

export const AuthController = {

  login(request, responce) {
    try {
      let { login, password } = request.body;
      User.findOne({ where: { login: login }, raw: true })
        .then((user) => {
          if (!user) {
            return responce.json({
              resultCode: 2,
              message: "Пользователя с данным логином не имеется в БД",
            });
          }
          var passwordIsValid = bcrypt.compareSync(
            password,
            user.password
          );
          if (!passwordIsValid) {
            return responce.json({
              resultCode: 1,
              accessToken: null,
              message: "Неверно указан пароль",
            });
          }
          User.update(
            { is_auth: 1, last_logon: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000) },
            {
              where: {
                login: login,
              },
            }
          ).then((res) => {
            const accessToken = jwt.sign({ login: user.login, role: user.role }, authConfig.secret);
            responce.json({
              resultCode: 0,
              accessToken: accessToken,
              message: "Аутентификация прошла успешно",
              user,
            });
          });
        })
        .catch((err) => responce.json(err));
    } catch (error) {
      responce.json(error);
    }
  },

  logout(request, responce) {
    try {
      let { login } = request.body;
      User.update(
        { is_auth: 0 },
        {
          where: {
            login: login,
          },
        }
      )
        .then((res) => {
          responce.json({
            resultCode: 0,
            accessToken: null,
            message: "Сессия завершена",
          });
        })
        .catch((err) => responce.json(err));
    } catch (error) {
      responce.json(error);
    }
  },

  auth(request, responce) {
    try {
      let { login } = request.body;
      
      User.findOne({ where: { login: login }, raw: true })
        .then((user) => {
          if (!user) return;
          if (user.is_auth == 1) {
            user.is_auth = true;
            responce.json({
              resultCode: 0,
              message: "Авторизация прошла успешно",
              user,
            });
          } else {
            user.is_auth = false;
            responce.json({
              resultCode: 1,
              message: "Пользователь не авторизован",
              user,
            });
          }
        })
        .catch((err) => responce.json(err));
    } catch (error) {
      responce.json(error);
    }
  },
  
};
