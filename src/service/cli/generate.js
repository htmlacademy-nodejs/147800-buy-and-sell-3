"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const { nanoid } = require(`nanoid`);
const { getRandomInt, shuffle } = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const OfferType = {
  OFFER: `Куплю`,
  SALE: `Продам`
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16
};

const getPictureFileName = (number) =>
  `item${number.toString().padStart(2, 0)}.jpg`;

const generateOffers = (count, titles, categories, sentences, comments) =>
  Array(count)
    .fill({})
    .map(() => {
      const picture = getPictureFileName(
        getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)
      );
      return {
        id: nanoid(),
        category: [categories[getRandomInt(0, categories.length - 1)]],
        description: shuffle(sentences).slice(1, 5).join(` `),
        picture,
        title: titles[getRandomInt(0, titles.length - 1)],
        type: Object.values(OfferType)[
          Math.floor(Math.random() * Object.keys(OfferType).length)
        ],
        sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
        comments: shuffle(comments)
          .slice(1, getRandomInt(0, comments.length - 1))
          .map((comment) => ({ id: nanoid(), text: comment }))
      };
    });

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const run = async (args) => {
  const sentences = await readContent(FILE_SENTENCES_PATH);
  const titles = await readContent(FILE_TITLES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);
  const comments = await readContent(FILE_COMMENTS_PATH);

  const [count] = args;
  const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
  const content = JSON.stringify(
    generateOffers(countOffer, titles, categories, sentences, comments)
  );

  try {
    await fs.writeFile(FILE_NAME, content);
    console.info(chalk.green(`Operation success. File created.`));
  } catch (error) {
    console.error(chalk.red(`Can't write data to file...`));
  }
};

module.exports = {
  name: `--generate`,
  run,
  readContent
};
