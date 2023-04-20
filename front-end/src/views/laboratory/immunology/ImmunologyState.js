import { ImmunologyAPI } from '@/api'
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    immunologies: [],
    immunoFilter: {},
    immuPage: 1,
    immuLimit: 5,
    totalImmunologies: 0
};

const getters = {
    allImmunology: (state) => state.immunologies,
    immunoFilter: (state) => state.immunoFilter,
    immuCurrentPage: (state) => state.immuPage
};

const actions = {
    async fetchImmunologies({commit, state}, nextPage) {
        if(state.immunologies.length === 0 || nextPage){
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
                limit: state.immuLimit,
                skip: (state.immuPage - 1) * state.immuLimit,
                order: 'createdAt DESC'
            };

            ImmunologyAPI.all({filter: filter}).then(res => {
                commit('setAllImmunologies', res.rows);
                commit('setTotalImmunologies', res.count);
            });
        }
    },

    async goImmuNextPageAction({state, commit, dispatch}) {
        if(state.immuPage < Math.ceil(state.totalImmunologies/ state.immuLimit)) {
            commit('scrollImmuPage');
            dispatch('fetchImmunologies', true);
        }
    }
};

const mutations = {
    setAllImmunologies: (state, newImmu) => {
        state.immunologies = state.immunologies.concat(newImmu);
    },
    resetAllImmunologies: (state) => {
        state.immunologies = [];
    },
    setImmunoFilter: (state, newImm) => {
        state.immunoFilter = newImm;
    },
    addImmunology: (state, newImmu) => (state.immunologies.unshift(newImmu)),
    scrollImmuPage: (state) => {state.immuPage++},
    setTotalImmunologies: (state, length) => {state.totalImmunologies = length}
};

export default {
    state,
    getters,
    actions,
    mutations
};
