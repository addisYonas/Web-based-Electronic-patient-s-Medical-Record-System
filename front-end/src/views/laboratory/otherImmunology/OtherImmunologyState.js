import { OtherImmunologyAPI } from '@/api'
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    otherImmunologies: [],
    otherImmunologyFilter: {},
    otImmuPage: 1,
    otImmuLimit: 5,
    totalOtherImmunologies: 0
};

const getters = {
    allOtherImmunology: (state) => state.otherImmunologies,
    otherImmunologyFilter: (state) => state.otherImmunologyFilter,
    otImmuCurrentPage: (state) => state.otImmuPage
};

const actions = {
    async fetchOtherImmunologies({commit, state}, nextPage) {
        if(state.otherImmunologies.length === 0 || nextPage){
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
                limit: state.otImmuLimit,
                skip: (state.otImmuPage - 1) * state.otImmuLimit,
                order: 'createdAt DESC'
            };

            OtherImmunologyAPI.all({filter: filter}).then(res => {
                commit('setAllOtherImmunologies', res.rows);
                commit('setTotalOtherImmunologies', res.count);
            });
        }
    },

    async goOtImmuNextPageAction({state, commit, dispatch}) {
        if(state.otImmuPage < Math.ceil(state.totalOtherImmunologies / state.otImmuLimit)) {
            commit('scrollOtImmuPage');
            dispatch('fetchOtherImmunologies', true);
        }
    }
};

const mutations = {
    setAllOtherImmunologies: (state, newOtImm) => {
        state.otherImmunologies = state.otherImmunologies.concat(newOtImm);
    },
    resetAllOtherImmunologies: (state) => {
        state.otherImmunologies = [];
    },
    setOtherImmunologyFilter: (state, newOtImm) => {
        state.otherImmunologyFilter = newOtImm;
    },
    addOtherImmunology: (state, newOtImm) => (state.otherImmunologies.unshift(newOtImm)),
    scrollOtImmuPage: (state) => {state.otImmuPage++},
    setTotalOtherImmunologies: (state, length) => {state.totalOtherImmunologies = length}
};

export default {
    state,
    getters,
    actions,
    mutations
};
