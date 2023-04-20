import {WomenHealthAPI} from '@/api'
import {eventBus} from "../../../main";
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    womenHealths: [],
    generatedWomenHealth: {},
    womenHealthsPage: 1,
    womenHealthsLimit: 10,
    womenHealthsTotal: 0
};

const getters = {
    allWomenHealths: (state) => state.womenHealths,
    generatedWomenHealth: (state) => state.generatedWomenHealth
};

const actions = {
    async fetchWomenHealths({commit}, nextPage) {
        if (state.womenHealths.length === 0 || nextPage) {
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
                limit: state.womenHealthsLimit,
                skip: (!nextPage) ? 0 : (state.womenHealthsPage - 1) * state.womenHealthsLimit,
                order: 'createdAt DESC'
            };

            WomenHealthAPI.all({filter: filter}).then(res => {
                commit('setWomenHealths', res.rows);
                commit('setWomenHealthsTotal', res.count);
            });
        }
    },
    async fetchGeneratedWomenHealth({commit}) {
        WomenHealthAPI.generate(PatientService.getPatientId()).then(res => {
            commit('setGeneratedWomenHealth', res);
        });
    },
    async getMoreWomenHealths({state, commit, dispatch}){
        if (state.womenHealthsPage < Math.ceil(state.womenHealthsTotal / state.womenHealthsLimit)) {
            commit('scrollWomenHealthsPage');
            dispatch('fetchWomenHealths', true);
        }
    },
    async createWomenHealth({commit, dispatch}, womenHealth) {
        WomenHealthAPI.create(womenHealth).then(() => {
            commit('emptyWomenHealths');
            dispatch('fetchWomenHealths', false);
            eventBus.$emit('openSb', {message: 'Women Health is successfully added!', color: "primary"});
        });
    }
};

const mutations = {
    setWomenHealths: (state, womenHealths) => (state.womenHealths = state.womenHealths.concat(womenHealths)),
    resetWomenHealths: (state) => (state.womenHealths = []),
    setGeneratedWomenHealth: (state, generatedWomenHealth) => (state.generatedWomenHealth = generatedWomenHealth),
    emptyWomenHealths: (state) => (state.womenHealths = [], state.womenHealthsPage = 1, state.womenHealthsLimit = 10),
    scrollWomenHealthsPage: (state) => {
        state.womenHealthsPage++
    },
    setWomenHealthsTotal: (state, length) => {
        state.womenHealthsTotal = length
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
