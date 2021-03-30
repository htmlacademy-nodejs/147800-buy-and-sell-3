"use strict";

const path = require(`path`);
const express = require(`express`);
const chalk = require(`chalk`);
const offersRoutes = require(`./routes/offers-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

const PORT = 8080;
const PUBLIC_DIR = `public`;
const HttpCode = {
  BAD_REQUEST: 400
};

const app = express();
app.use(express.urlencoded({ extended: false }));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);
app.use(`/500`, (req, res) => res.render(`errors/500`));

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use((req, res) => res.status(HttpCode.BAD_REQUEST).render(`errors/404`));

app.listen(PORT, () => {
  console.info(chalk.green(`Frontend server starts on PORT ${PORT}`));
});
