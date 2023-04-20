import {DiscussionAPI} from '@/api'
import {eventBus} from "../../main.js";
import {PatientService} from "@/services"

const state = {
    discussions: [],
    discussion: {
        createdBy: {
            fullName: ''
        }
    },
    discussionId: '',
    selectedIndex: 0,
    discussionsPage: 1,
    discussionsLimit: 6,
    discussionsTotal: 0
};

const getters = {
    discussions: (state) => state.discussions,
    discussion: (state) => state.discussion,
    discussionId: (state) => state.discussionId,
};

const actions = {
    async fetchDiscussion({commit}, id) {
        DiscussionAPI.get(id).then(res => {
            commit('setDiscussion', res);
        });
    },
    async fetchDiscussions({commit}, nextPage) {
        if (state.discussions.length === 0 || nextPage) {
            const filter = {
                where: {
                    patientId: PatientService.getPatientId()
                },
                fields: ["id", "title"],
                order: 'createdAt ASC'
            };

            DiscussionAPI.all({filter: filter}).then(res => {
                commit('setDiscussions', res.rows);
            });
        }
    },
    async createDiscussion({commit, dispatch}, discussion) {
        DiscussionAPI.create(discussion).then(() => {
            commit('emptyDiscussions');
            dispatch('fetchDiscussions');
            eventBus.$emit('openSb', {message: 'Discussion is successfully added!', color: "primary"});
        });
    },
    async updateDiscussion({commit, dispatch}, discussion) {
        DiscussionAPI.update(discussion).then(() => {
            commit('setDiscussions', []);
            dispatch('fetchDiscussions');
            eventBus.$emit('openSb', {message: 'Discussion is successfully updated!', color: "primary"});
        });
    },
    async getMoreDiscussions({state, commit, dispatch}) {
        if (state.discussionsPage < Math.ceil(state.discussionsTotal / state.discussionsLimit)) {
            commit('scrollDiscussionsPage');
            dispatch('fetchDiscussions', true);
        }
    }
};

const mutations = {
    setDiscussions: (state, discussions) => (state.discussions = state.discussions.concat(discussions)),
    setDiscussion: (state, discussion) => (state.discussion = discussion),
    setDiscussionId: (state, discussionId) => (state.discussionId = discussionId),
    selectDiscussionIndex: (state, index) => (state.selectedIndex = index),
    incrementComment: (state) => (state.discussions[state.selectedIndex].comments += 1),
    emptyDiscussions: (state) => (state.discussions = [], state.discussionsPage = 1, state.discussionsLimit = 6),
    scrollDiscussionsPage: (state) => {
        state.discussionsPage++
    },
    setDiscussionsTotal: (state, length) => {
        state.discussionsTotal = length
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
