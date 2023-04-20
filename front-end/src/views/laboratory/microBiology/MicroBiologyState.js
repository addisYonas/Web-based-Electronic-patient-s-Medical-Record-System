import { MicroBiologyAPI } from '@/api'
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    microBiologies: [],
    microBiologyFilter: {},
    microBioPage: 1,
    microBioLimit: 5,
    totalMicroBiologies: 0
};

const getters = {
    allMicroBiology: (state) => state.microBiologies,
    microBiologyFilter: (state) => state.microBiologyFilter,
    microBioCurrentPage: (state) => state.microBioPage
};

const actions = {
    async fetchMicroBiologies({commit, state}, nextPage) {
        if(state.microBiologies.length === 0 || nextPage){
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
                limit: state.microBioLimit,
                skip: (state.microBioPage - 1) * state.microBioLimit,
                order: 'createdAt DESC'
            };

            MicroBiologyAPI.all({filter: filter}).then(res => {
                commit('setAllMicroBiologies', res.rows);
                commit('setTotalMicroBiologies', res.count);
            });
        }
    },

    async goMicroBioNextPageAction({state, commit, dispatch}) {
        if(state.microBioPage < Math.ceil(state.totalMicroBiologies/ state.microBioLimit)) {
            commit('scrollMicroBioPage');
            dispatch('fetchMicroBiologies', true);
        }
    }
};

const mutations = {
    setAllMicroBiologies: (state, newMb) => {
        state.microBiologies = state.microBiologies.concat(newMb);
    },
    resetAllMicroBiologies: (state) => {
        state.microBiologies = [];
    },
    setMicroBiologyFilter: (state, newMb) => {
        state.microBiologyFilter = newMb;
    },
    addMicroBiology: (state, newMb) => (state.microBiologies.unshift(newMb)),
    scrollMicroBioPage: (state) => {state.microBioPage++},
    setTotalMicroBiologies: (state, length) => {state.totalMicroBiologies = length}
};

export default {
    state,
    getters,
    actions,
    mutations
};
