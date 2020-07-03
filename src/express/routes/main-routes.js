"use strict";

const { Router } = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/login`, (req, res) => res.render(`main/login`));
mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`));
mainRouter.get(`/search`, (req, res) => res.render(`main/search-result`));
mainRouter.get(`/`, (req, res) => res.render(`main/main`));

module.exports = mainRouter;
