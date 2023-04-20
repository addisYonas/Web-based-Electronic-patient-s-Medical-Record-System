import { RadiologyAPI } from '@/api'
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    radiologies: [],
    radiologyFilter: {},
    radPage: 1,
    radLimit: 4,
    radTotalRadiologies: 0
};

const getters = {
    allRadiology: (state) => state.radiologies,
    radiologyFilter: (state) => state.radiologyFilter,
    radCurrentPage: (state) => state.radPage
};

const actions = {
    async fetchRadiologies({commit, state}, nextPage) {
        if(state.radiologies.length === 0 || nextPage){
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
                limit: state.radLimit,
                skip: (state.radPage - 1) * state.radLimit,
                order: 'createdAt DESC'
            };

            RadiologyAPI.all({filter: filter}).then(res => {
                commit('setAllRadiologies', res.rows);
                commit('setTotalRadiologies', res.count);
            });
        }
    },

    async goRadNextPageAction({state, commit, dispatch}) {
        if(state.radPage < Math.ceil(state.radTotalRadiologies / state.radLimit)) {
            commit('scrollRadPage');
            dispatch('fetchRadiologies', true);
        }
    }
};

const mutations = {
    setAllRadiologies: (state, newRad) => {
        state.radiologies = state.radiologies.concat(newRad);
    },
    resetAllRadiologies: (state) => {
        state.radiologies = [];
    },
    setRadiologyFilter: (state, newRad) => {
        state.radiologyFilter = newRad;
    },
    addRadiology: (state, newRad) => (state.radiologies.unshift(newRad)),
    scrollRadPage: (state) => {state.radPage++},
    setTotalRadiologies: (state, length) => {state.radTotalRadiologies = length}
};

export default {
    state,
    getters,
    actions,
    mutations
};
