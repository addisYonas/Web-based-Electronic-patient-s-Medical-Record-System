import {OtherHealthAPI} from '@/api'
import {eventBus} from "../../../main";
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    otherHealths: [],
    generatedOtherHealth: {},
    otherHealthsPage: 1,
    otherHealthsLimit: 10,
    otherHealthsTotal: 0
};

const getters = {
    allOtherHealths: (state) => state.otherHealths,
    generatedOtherHealth: (state) => state.generatedOtherHealth
};

const actions = {
    async fetchOtherHealths({commit}, nextPage) {
        if (state.otherHealths.length === 0 || nextPage) {
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
                limit: state.otherHealthsLimit,
                skip: (!nextPage) ? 0 : (state.otherHealthsPage - 1) * state.otherHealthsLimit,
                order: 'createdAt DESC'
            };

            OtherHealthAPI.all({filter: filter}).then(res => {
                commit('setOtherHealths', res.rows);
                commit('setOtherHealthsTotal', res.count);
            });
        }
    },
    async fetchGeneratedOtherHealth({commit}) {
        OtherHealthAPI.generate(PatientService.getPatientId()).then(res => {
            commit('setGeneratedOtherHealth', res);
        });
    },
    async getMoreOtherHealths({state, commit, dispatch}) {
        if (state.otherHealthsPage < Math.ceil(state.otherHealthsTotal / state.otherHealthsLimit)) {
            commit('scrollOtherHealthsPage');
            dispatch('fetchOtherHealths', true);
        }
    },
    async createOtherHealth({commit, dispatch}, otherHealth) {
        OtherHealthAPI.create(otherHealth).then(() => {
            commit('emptyOtherHealths');
            dispatch('fetchOtherHealths', false);
            eventBus.$emit('openSb', {message: 'Other Health is successfully added!', color: "primary"});
        });
    }
};

const mutations = {
    setOtherHealths: (state, otherHealths) => (state.otherHealths = state.otherHealths.concat(otherHealths)),
    resetOtherHealths: (state) => (state.otherHealths = []),
    setGeneratedOtherHealth: (state, generatedOtherHealth) => (state.generatedOtherHealth = generatedOtherHealth),
    emptyOtherHealths: (state) => (state.otherHealths = [], state.otherHealthsPage = 1, state.otherHealthsLimit = 10),
    scrollOtherHealthsPage: (state) => {
        state.otherHealthsPage++
    },
    setOtherHealthsTotal: (state, length) => {
        state.otherHealthsTotal = length
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
