"use strict";

const { Router } = require(`express`);
const myRouter = new Router();

myRouter.get(`/comments`, (req, res) => res.render(`my/comments`));
myRouter.get(`/`, (req, res) => res.render(`my/my-tickets`));

module.exports = myRouter;
