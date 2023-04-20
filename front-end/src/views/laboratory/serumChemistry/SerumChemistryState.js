import { SerumChemistryAPI } from '@/api'
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    serumChemistries: [],
    serumChemistryFilter: {},
    scPage: 1,
    scLimit: 4,
    totalSerumChemistries: 0
};

const getters = {
    allSerumChemistry: (state) => state.serumChemistries,
    serumChemistryFilter: (state) => state.serumChemistryFilter,
    scCurrentPage: (state) => state.scPage
};

const actions = {
    async fetchSerumChemistries({commit, state}, nextPage) {
        if(state.serumChemistries.length === 0 || nextPage){
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
                limit: state.scLimit,
                skip: (state.scPage - 1) * state.scLimit,
                order: 'createdAt DESC'
            };

            SerumChemistryAPI.all({filter: filter}).then(res => {
                commit('setAllSerumChemistries', res.rows);
                commit('setTotalSerumChemistries', res.count);
            });
        }
    },

    async goScNextPageAction({state, commit, dispatch}) {
        if(state.scPage < Math.ceil(state.totalSerumChemistries / state.scLimit)) {
            commit('scrollScPage');
            dispatch('fetchSerumChemistries', true);
        }
    }
};

const mutations = {
    setAllSerumChemistries: (state, sc) => {
        state.serumChemistries = state.serumChemistries.concat(sc);
    },
    resetAllSerumChemistries: (state) => {
        state.serumChemistries = [];
    },
    setSerumChemistryFilter: (state, sc) => {
        state.serumChemistryFilter = sc;
    },
    addSerumChemistry: (state, sc) => (state.serumChemistries.unshift(sc)),
    scrollScPage: (state) => {state.scPage++},
    setTotalSerumChemistries: (state, length) => {state.totalSerumChemistries = length}
};

export default {
    state,
    getters,
    actions,
    mutations
};
