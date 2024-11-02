import db from "../models/_index.js";
const Users = db.user;

export const usersController = {

  async getUsers(request, responce) {
    try {

      let users = await Users.findAll({
        attributes: ['full_name', 'workType'],
        // where: {role: "user"},
        raw: true,
      });
      
      users = users.map(user => {return {...user, workType: JSON.parse(user.workType)}})

      responce.json({
        resultCode: 0,
        users,
        message: `Данные получены`,
      });
    } catch (err) {
      console.log('error usersController getUsers');
      responce.json(err);
    }
  },

};
