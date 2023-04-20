import { UrinalysisAPI } from '@/api'
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    urinalyses: [],
    urinalysisFilter: {},
    urPage: 1,
    urLimit: 4,
    totalUrinalyses: 0
};

const getters = {
    allUrinalysis: (state) => state.urinalyses,
    urinalysisFilter: (state) => state.urinalysisFilter,
    urCurrentPage: (state) => state.urPage
};

const actions = {
    async fetchUrinalyses({commit, state}, nextPage) {
        if(state.urinalyses.length === 0 || nextPage){
            const patientState = {
                patientId: (PatientService.getPatientId()) ? PatientService.getPatientId() : ''
            };

            const doctorState = {
                orderedById: (AccountService.getProfile()) ? AccountService.getProfile().id : ''
            };

            const labTechnicianState = {
                filledById: (AccountService.getProfile()) ? AccountService.getProfile().id : ''
            };
            const filter = {
                where:
                    (PatientService.isPatientThere()) ?
                        patientState
                        : (AccountService.getProfile().role === 'Doctor') ?
                        doctorState : labTechnicianState,
                include: [
                    {
                        relation: "filledBy",
                        scope: {
                            fields: ["fullName"]
                        }
                    },
                    {
                        relation: "orderedBy",
                        scope: {
                            fields: ["fullName"]
                        }
                    }
                ],
                limit: state.urLimit,
                skip: (state.urPage - 1) * state.urLimit,
                order: 'createdAt DESC'
            };

            UrinalysisAPI.all({filter: filter}).then(res => {
                commit('setAllUrinalyses', res.rows);
                commit('setTotalUrinalyses', res.count);
            });
        }
    },

    async goUrNextPageAction({state, commit, dispatch}) {
        if(state.urPage < Math.ceil(state.totalUrinalyses / state.urLimit)) {
            commit('scrollUrPage');
            dispatch('fetchUrinalyses', true);
        }
    }
};

const mutations = {
    setAllUrinalyses: (state, newUr) => {
        state.urinalyses = state.urinalyses.concat(newUr);
    },
    resetAllUrinalyses: (state) => {
        state.urinalyses = [];
    },
    setUrinalysisFilter: (state, newUr) => {
        state.urinalysisFilter = newUr;
    },
    addUrinalysis: (state, newUr) => (state.urinalyses.unshift(newUr)),
    scrollUrPage: (state) => {state.urPage++},
    setTotalUrinalyses: (state, length) => {state.totalUrinalyses = length}
};

export default {
    state,
    getters,
    actions,
    mutations
};
