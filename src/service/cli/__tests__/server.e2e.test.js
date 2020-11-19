"use strict";

const request = require(`supertest`);
const { app: server } = require(`../server`);

describe(`server test`, () => {
  describe(`offers API`, () => {
    test(`GET offers successfully`, async () => {
      const res = await request(server).get(`/api/offers`);

      expect(res.statusCode).toBe(200);
    });

    test(`POST offer successfully`, async () => {
      const res = await request(server).post(`/api/offers`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(`Add new offer`);
    });

    test(`GET offer successfully`, async () => {
      const res = await request(server).get(`/api/offers/1`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(`Return offer by offerId="1"`);
    });

    test(`GET offer with error`, async () => {
      const res = await request(server).get(`/api/offers/-1`);

      expect(res.statusCode).toBe(404);
      expect(res.text).toEqual(`Offer not found`);
    });

    test(`PUT offer successfully`, async () => {
      const res = await request(server).put(`/api/offers/1`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(`Update offer with offerId="1"`);
    });

    test(`DELETE offer successfully`, async () => {
      const res = await request(server).delete(`/api/offers/1`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(`Delete offer with offerId="1"`);
    });

    test(`GET comments successfully`, async () => {
      const offers = await request(server).get(`/api/offers`);
      const res = await request(server).get(
        `/api/offers/${offers.body[0].id}/comments`
      );

      expect(res.statusCode).toBe(200);
    });

    test(`GET comments with error`, async () => {
      const res = await request(server).get(`/api/offers/0/comments`);

      expect(res.statusCode).toBe(404);
      expect(res.text).toBe(`Offer not found`);
    });

    test(`POST comment successfully`, async () => {
      const res = await request(server).post(`/api/offers/1/comments`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(`Add new comment to offer with offerId="1"`);
    });

    test(`DELETE comment successfully`, async () => {
      const res = await request(server).delete(`/api/offers/1/comments/1`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(
        `Delete comment with commentId="1" of offer with offerId="1"`
      );
    });
  });

  test(`GET categories successfully`, async () => {
    const res = await request(server).get(`/api/categories`);

    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual(`Send categories`);
  });

  test(`GET search successfully`, async () => {
    const res = await request(server).get(`/api/search?query=offer`);

    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual(`Search with query param "offer"`);
  });
});
