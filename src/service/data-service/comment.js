"use strict";

const { Comment } = require(`../models/index`);

class CommentService {
  async create(offerId, commentData) {
    const comment = await Comment.create({ offerId, ...commentData });
    return comment.get();
  }
}

module.exports = CommentService;
