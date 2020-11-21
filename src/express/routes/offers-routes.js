"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const multer = require(`multer`);
const { nanoid } = require(`nanoid`);
const offersRouter = new Router();

const URL = `http://localhost:3000`;
const UPLOAD_DIR = `public/img`;

const MimeTypeExtension = {
  "image/png": `png`,
  "image/jpeg": `jpg`,
  "image/jpg": `jpg`,
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const fileExtention = MimeTypeExtension[file.mimetype];
    cb(null, `${nanoid()}.${fileExtention}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowTypes = Object.keys(MimeTypeExtension);
  const isValid = allowTypes.includes(file.mimetype);
  cb(null, isValid);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

offersRouter.get(`/add`, async (req, res) => {
  const { data: categories } = await axios.get(`${URL}/api/categories`);
  res.render(`offers/new-ticket`, {
    data: {},
    categories,
  });
});
offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const { file } = req;

  try {
    await axios.post(`${URL}/api/offers`, req.body);
    res.redirect(`/my`);
  } catch (error) {
    const { data: categories } = await axios.get(`${URL}/api/categories`);
    res.render(`offers/new-ticket`, { data: req.body, categories });
  }
});
offersRouter.get(`/category/:id`, (req, res) => res.render(`offers/category`));
offersRouter.get(`/edit/:id`, async (req, res) => {
  const { data: offer } = await axios.get(`${URL}/api/offers/${req.params.id}`);
  const { data: categories } = await axios.get(`${URL}/api/categories`);
  res.render(`offers/ticket-edit`, { offer, categories });
});
offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));

module.exports = offersRouter;
