import {CommentAPI} from '@/api'
import {eventBus} from "../../main.js";

const state = {
    comments: [],
    commentId: '',
    commentFilter: {}
};

const getters = {
    comments: (state) => state.comments,
    commentId: (state) => state.commentId,
};

const actions = {
    async fetchComments({commit}) {
        const filter = {
            where: state.commentFilter,
            order: 'createdAt ASC',
            include: [
                {
                    relation: "createdBy",
                    scope: {
                        fields: ["fullName"]
                    }
                }
            ]
        };

        CommentAPI.all({filter: filter}).then(res => {
            commit('setComments', res.rows);
        });
    },
    async createComment({commit, dispatch}, comment) {
        CommentAPI.create(comment).then(() => {
            commit('emptyComments');
            dispatch('fetchComments');
            eventBus.$emit('openSb', {message: 'Comment is successfully added!', color: "primary"});
        });
    },
    async updateComment({commit, dispatch}, comment) {
        CommentAPI.update(comment).then(() => {
            commit('setComments', []);
            dispatch('fetchComments');
            eventBus.$emit('openSb', {message: 'Comment is successfully updated!', color: "primary"});
        });
    },
    async getMoreComments({state, commit, dispatch}) {
        if (state.commentsPage < Math.ceil(state.commentsTotal / state.commentsLimit)) {
            commit('scrollCommentsPage');
            dispatch('fetchComments', true);
        }
    }
};

const mutations = {
    setComments: (state, comments) => (state.comments = comments),
    emptyComments: (state) => (state.comments = []),
    setCommentId: (state, commentId) => (state.commentId = commentId),
    setCommentFilter: (state, commentFilter) => (state.commentFilter = commentFilter),
};

export default {
    state,
    getters,
    actions,
    mutations
};
