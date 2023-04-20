'use strict';

module.exports = function(Comment) {
//Create comment
  Comment.createComment = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    try {
      const comment = await Comment.create({
        ...body,
        createdById: accessToken.userId,
      });

      return comment;
    } catch (err) {
      throw err;
    }
  };

  Comment.remoteMethod('createComment', {
    description: 'Creates comment',
    accepts: [
      {
        arg: 'accessToken',
        type: 'object',
        http: ctx => {
          const req = ctx && ctx.req;
          const accessToken = req && req.accessToken;
          return accessToken ? req.accessToken : null;
        },
      },
      {arg: 'body', type: 'object', http: {source: 'body'}},
    ],
    returns: {
      arg: 'commentObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/'},
  });
};
