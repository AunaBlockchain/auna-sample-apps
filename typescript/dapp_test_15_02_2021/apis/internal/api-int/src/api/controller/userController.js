import { Request, Response } from "express";

const mockUserData = {
  users: [
    {
      address: "0x00FF0011",
      id: 1,
      name: "Admin",
      balance: 0,
      lastTransactions: [
        { from: "0x00FF0011", to: "0x00559988", quantity: 0.00000125 },
        { from: "0x00875988", to: "0x00FF0011", quantity: 0.00000125 },
        { from: "0x00A5F888", to: "0x00FF0011", quantity: 0.00005 },
      ],
    },
  ],
};

/**
 * @param {Response} res
 * @param {Request} req
 * */
const getUsers = (req, res) => {
  let usersList = mockUserData.users.map(({id, name, ...other}) => ({id, name}));
  res.json(usersList);
};

/**
 * @param {Response} res
 * @param {Request} req
 * */
const getUser = (req, res) => {
  let user = mockUserData[0];
  user.id = req.params.id;
  user.balance = getUserBalance(user.id);
  res.json(user);
};

// todo: tomar el balaance desde la api interna que está conectada al blockchain
/**
 * @param {number} id
 * */
const getUserBalance = (id) => {
  let balance = 0.0001;
  return balance;
};

module.exports = {
  getUsers,
  getUser,
};
