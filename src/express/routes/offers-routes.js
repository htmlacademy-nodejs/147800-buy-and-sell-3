"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const multer = require(`multer`);
const { nanoid } = require(`nanoid`);
const upload = require(`../middlewares/upload`);
const { ensureArray } = require(`../../utils`);
const offersRouter = new Router();

const URL = `http://localhost:3000`;
const UPLOAD_DIR = `public/img`;
const OFFERS_PER_PAGE = 8;

const MimeTypeExtension = {
  "image/png": `png`,
  "image/jpeg": `jpg`,
  "image/jpg": `jpg`
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const fileExtention = MimeTypeExtension[file.mimetype];
    cb(null, `${nanoid()}.${fileExtention}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowTypes = Object.keys(MimeTypeExtension);
  const isValid = allowTypes.includes(file.mimetype);
  cb(null, isValid);
};

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024
//   }
// });

offersRouter.get(`/add`, async (req, res) => {
  const { data: categories } = await axios.get(`${URL}/api/categories`);
  res.render(`offers/new-ticket`, {
    categories
  });
});
offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const { user } = req.session;
  const { body, file } = req;
  console.log({ body, file });
  const offerData = {
    picture: file.filename,
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    categories: ensureArray(body.category),
    userId: user.id
  };

  try {
    await axios.post(`${URL}/api/offers`, offerData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(
      `/offers/add?error=${encodeURIComponent(error.response.data)}`
    );
  }
});
offersRouter.get(`/category/:id`, async (req, res) => {
  const id = Number(req.params.id);
  const { data: categories } = await axios.get(`${URL}/api/categories`);
  const { data: category } = await axios.get(`${URL}/api/categories/${id}`);

  let { page = 1 } = req.query;
  page = +page;
  const limit = OFFERS_PER_PAGE;
  const offset = (page - 1) * OFFERS_PER_PAGE;

  const {
    data: { count, offers }
  } = await axios.get(`${URL}/api/offers`, {
    params: { categoryId: id, limit, offset }
  });
  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);

  res.render(`offers/category`, {
    id,
    selectedCategory: category,
    categories,
    offers,
    page,
    totalPages
  });
});
offersRouter.get(`/edit/:id`, async (req, res) => {
  const { data: offer } = await axios.get(`${URL}/api/offers/${req.params.id}`);
  const { data: categories } = await axios.get(`${URL}/api/categories`);
  res.render(`offers/ticket-edit`, { offer, categories });
});
offersRouter.get(`/:id`, async (req, res) => {
  const { data: offer } = await axios.get(`${URL}/api/offers/${req.params.id}`);
  res.render(`offers/ticket`, { offer });
});

module.exports = offersRouter;
