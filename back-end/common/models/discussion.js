'use strict';

module.exports = function(Discussion) {

  //Find discussions
  Discussion.findDiscussions = async filter => {
    filter = filter ? (filter = JSON.parse(filter)) : undefined;

    const {Comment} = Discussion.app.models;

    const discussion = await Discussion.find(filter);
    const discussionCount = await Discussion.count(filter ? filter.where : {});

    for (let i = 0; i < discussion.length; i++) {
      const commentsCount = await Comment.count({discussionId: discussion[i].id});
      discussion[i].comments = commentsCount;
    }

    return {
      rows: discussion,
      count: discussionCount,
    };
  };
  Discussion.remoteMethod('findDiscussions', {
    description: 'Finds discussion',
    accepts: [{arg: 'filter', type: 'string'}],
    returns: {
      type: 'object',
      root: true,
    },
    http: {verb: 'get', path: '/find-discussions'},
  });

//Create discussion
  Discussion.createDiscussion = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    try {
      const discussion = await Discussion.create({
        ...body,
        createdById: accessToken.userId,
      });

      return discussion;
    } catch (err) {
      throw err;
    }
  };

  Discussion.remoteMethod('createDiscussion', {
    description: 'Creates discussion',
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
      arg: 'discussionObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/'},
  });

  //Find discussion by id
  Discussion.findDiscussionById = async id => {
    const discussion = await Discussion.findOne({
      where: {id},
      include: [
        {
          relation: 'createdBy',
          scope: {
            fields: ['fullName'],
          },
        },
      ],
    });

    if (!discussion) throw Error('Unknown discussion', 412);

    return discussion;
  };
  Discussion.remoteMethod('findDiscussionById', {
    description: 'Finds discussion by specified id',
    accepts: [{arg: 'id', type: 'string', required: true}],
    returns: {
      type: 'object',
      root: true,
    },
    http: {verb: 'get', path: '/:id'},
  });
};
