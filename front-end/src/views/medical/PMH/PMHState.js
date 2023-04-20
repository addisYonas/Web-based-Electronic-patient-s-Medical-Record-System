import {PersonalHealthAPI} from '@/api'
import {eventBus} from "../../../main";
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    pmhs: [],
    pmhsPage: 1,
    pmhsLimit: 10,
    pmhsTotal: 0
};

const getters = {
    allPMHs: (state) => state.pmhs
};

const actions = {
    async fetchPMHs({commit}, nextPage) {
        if (state.pmhs.length === 0 || nextPage) {
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
                limit: state.pmhsLimit,
                skip: (!nextPage) ? 0 : (state.pmhsPage - 1) * state.pmhsLimit,
                order: 'createdAt DESC'
            };

            PersonalHealthAPI.all({filter: filter}).then(res => {
                commit('setPMHs', res.rows);
                commit('setPMHsTotal', res.count);
            });
        }
    },
    async getMorePMHs({state, commit, dispatch}) {
        if (state.pmhsPage < Math.ceil(state.pmhsTotal / state.pmhsLimit)) {
            commit('scrollPMHsPage');
            dispatch('fetchPMHs', true);
        }
    },
    async createPMH({commit, dispatch}, pmh) {
        PersonalHealthAPI.create(pmh).then(() => {
            commit('emptyPMHs');
            dispatch('fetchPMHs', false);
            eventBus.$emit('openSb', {message: 'Personal Medical Health is successfully added!', color: "primary"});
        });
    }
};

const mutations = {
    setPMHs: (state, pmhs) => (state.pmhs = state.pmhs.concat(pmhs)),
    resetPMHs: (state, pmhs) => (state.pmhs = []),
    emptyPMHs: (state) => (state.pmhs = [], state.pmhsPage = 1, state.pmhsLimit = 10),
    scrollPMHsPage: (state) => {
        state.pmhsPage++
    },
    setPMHsTotal: (state, length) => {
        state.pmhsTotal = length
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
