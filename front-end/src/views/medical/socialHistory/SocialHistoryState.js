import {SocialHistoryAPI} from '@/api'
import {eventBus} from "../../../main";
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    socialHistories: [],
    generatedSocialHistory: {},
    socialHistoriesPage: 1,
    socialHistoriesLimit: 10,
    socialHistoriesTotal: 0
};

const getters = {
    allSocialHistories: (state) => state.socialHistories,
    generatedSocialHistory: (state) => state.generatedSocialHistory
};

const actions = {
    async fetchSocialHistories({commit}, nextPage) {
        if (state.socialHistories.length === 0 || nextPage) {
            const patientState = {
                patientId: (PatientService.getPatientId()) ? PatientService.getPatientId() : ''
            };
            const filter = {
                where: patientState,
                include: [
                    {
                        relation: "filledBy",
                        scope: {
                            fields: ["fullName"]
                        }
                    }
                ],
                limit: state.socialHistoriesLimit,
                skip: (!nextPage) ? 0 : (state.socialHistoriesPage - 1) * state.socialHistoriesLimit,
                order: 'createdAt DESC'
            };

            SocialHistoryAPI.all({filter: filter}).then(res => {
                commit('setSocialHistories', res.rows);
                commit('setSocialHistoriesTotal', res.count);
            });
        }
    },
    async fetchGeneratedSocialHistory({commit}) {
        SocialHistoryAPI.generate(PatientService.getPatientId()).then(res => {
            commit('setGeneratedSocialHistory', res);
        });
    },
    async getMoreSocialHistories({state, commit, dispatch}){
        if (state.socialHistoriesPage < Math.ceil(state.socialHistoriesTotal / state.socialHistoriesLimit)) {
            commit('scrollSocialHistoriesPage');
            dispatch('fetchSocialHistories', true);
        }
    },
    async createSocialHistory({commit, dispatch}, socialHistory) {
        SocialHistoryAPI.create(socialHistory).then(() => {
            commit('emptySocialHistories');
            dispatch('fetchSocialHistories', false);
            eventBus.$emit('openSb', {message: 'Social History is successfully added!', color: "primary"});
        });
    }
};

const mutations = {
    setSocialHistories: (state, socialHistories) => (state.socialHistories = state.socialHistories.concat(socialHistories)),
    resetSocialHistories: (state) => (state.socialHistories = []),
    setGeneratedSocialHistory: (state, generatedSocialHistory) => (state.generatedSocialHistory = generatedSocialHistory),
    emptySocialHistories: (state) => (state.socialHistories = [], state.socialHistoriesPage = 1, state.socialHistoriesLimit = 10),
    scrollSocialHistoriesPage: (state) => {
        state.socialHistoriesPage++
    },
    setSocialHistoriesTotal: (state, length) => {
        state.socialHistoriesTotal = length
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
