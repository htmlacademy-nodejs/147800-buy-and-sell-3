"use strict";

const request = require(`supertest`);
const { HttpCode } = require(`../../../constants`);
const { app: server } = require(`../server`);

describe(`server test`, () => {
  describe(`offers API`, () => {
    test(`GET offers successfully`, async () => {
      const res = await request(server).get(`/api/offers`);

      expect(res.statusCode).toBe(200);
    });

    test(`POST offer successfully`, async () => {
      const newOffer = {
        categories: [1],
        title: `Электрическая воздуходувка Makita`,
        description: `Качество сборки, качество пластика и элементов, зарекомендовавший себя брэнд, прекрасно справляется со своими задачами!`,
        picture: `img.jpg`,
        type: `Куплю`,
        sum: 200,
        userId: 1
      };
      const res = await request(server).post(`/api/offers`).send(newOffer);

      expect(res.statusCode).toBe(HttpCode.CREATED);
      const { categories, ...newOfferDataWithoutCategories } = newOffer;
      expect(res.body).toEqual(
        expect.objectContaining(newOfferDataWithoutCategories)
      );
    });

    test.skip(`GET offer successfully`, async () => {
      const offers = await request(server).get(`/api/offers`);
      const res = await request(server).get(`/api/offers/${offers.body[0].id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(offers.body[0]);
    });

    test.skip(`GET offer with error`, async () => {
      const res = await request(server).get(`/api/offers/-1`);

      expect(res.statusCode).toBe(404);
      expect(res.text).toEqual(`Offer not found`);
    });

    test(`PUT offer successfully`, async () => {
      const updatedOffer = {
        categories: [1],
        title: `Выгодное предложение`,
        description: `Быть обладателем надувного сапа – это прекрасно. Берешь его с собой куда хочешь, специальный багажник не нужен, хранишь его там, где он поместится, да и долговечности его можно позавидовать.`,
        picture: `item01.jpg`,
        type: `Куплю`,
        sum: 3000,
        userId: 1
      };

      const res = await request(server).put(`/api/offers/1`).send(updatedOffer);

      expect(res.statusCode).toBe(HttpCode.OK);

      const getResponse = await request(server).get(`/api/offers/1`);
      expect(getResponse.body.description).toEqual(updatedOffer.description);
    });

    test(`DELETE offer successfully`, async () => {
      const res = await request(server).delete(`/api/offers/1`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(`Delete offer with offerId="1"`);
    });

    test(`GET comments with error`, async () => {
      const res = await request(server).get(`/api/offers/0/comments`);

      expect(res.statusCode).toBe(404);
      expect(res.text).toBe(`Offer not found`);
    });

    test(`POST comment successfully`, async () => {
      const newComment = {
        text: `Валидному комментарию достаточно этих полей`,
        userId: 1
      };
      const res = await request(server)
        .post(`/api/offers/1/comments`)
        .send(newComment);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(expect.objectContaining(newComment));
    });

    test(`DELETE comment successfully`, async () => {
      const res = await request(server).delete(`/api/offers/1/comments/1`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(
        `Delete comment with commentId="1" of offer with offerId="1"`
      );
    });
  });

  describe(`users API`, () => {
    const validUserData = {
      name: `Сидор Сидоров`,
      email: `sidorov@example.com`,
      password: `sidorov`,
      passwordRepeated: `sidorov`,
      avatar: `sidorov.jpg`
    };

    test(`creates user if data is valid`, async () => {
      const response = await request(server)
        .post(`/api/user`)
        .send(validUserData);

      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test(`don't create user if there is a user with the same email`, async () => {
      const badUserData = {
        name: `Иван Иванов`,
        email: `ivan.ivanov@yandex.ru`,
        password: `sidorov`,
        passwordRepeated: `sidorov`,
        avatar: `sidorov.jpg`
      };
      await request(server)
        .post(`/api/user`)
        .send(badUserData)
        .expect(HttpCode.BAD_REQUEST);
    });
  });

  test.skip(`GET categories successfully`, async () => {
    const res = await request(server).get(`/api/categories`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        label: `Дом`,
        picture: `cat.jpg`,
        count: `9`
      },
      {
        id: 2,
        label: `Электроника`,
        picture: `cat02.jpg`,
        count: `4`
      },
      {
        id: 3,
        label: `Одежда`,
        picture: `cat03.jpg`,
        count: `1`
      },
      {
        id: 4,
        label: `Спорт/отдых`,
        picture: `cat04.jpg`,
        count: `1`
      },
      {
        id: 5,
        label: `Авто`,
        picture: `cat05.jpg`,
        count: `2`
      },
      {
        id: 6,
        label: `Книги`,
        picture: `cat06.jpg`,
        count: `1`
      }
    ]);
  });

  test.skip(`GET search successfully`, async () => {
    const res = await request(server).get(`/api/search?query=`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).not.toEqual(0);
  });
});
