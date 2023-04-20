import { HaematologyAPI } from '@/api'
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    haematologies: [],
    haematoFilter: {},
    hemaPage: 1,
    hemaLimit: 5,
    hemaTotalHaematologies: 0
};

const getters = {
    allHaematology: (state) => state.haematologies,
    haematoFilter: (state) => state.haematoFilter,
    hemaCurrentPage: (state) => state.hemaPage
};

const actions = {
    async fetchHaematologies({commit, state}, nextPage) {
        if(state.haematologies.length === 0 || nextPage){
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
                limit: state.hemaLimit,
                skip: (state.hemaPage - 1) * state.hemaLimit,
                order: 'createdAt DESC'
            };

            HaematologyAPI.all({filter: filter}).then(res => {
                commit('setAllHaematologies', res.rows);
                commit('setTotalHaematologies', res.count);
            });
        }
    },

    async goHemaNextPageAction({state, commit, dispatch}) {
        if(state.hemaPage < Math.ceil(state.hemaTotalHaematologies/ state.hemaLimit)) {
            commit('scrollHemaPage');
            dispatch('fetchHaematologies', true);
        }
    }
};

const mutations = {
    setAllHaematologies: (state, newHaematology) => {
        state.haematologies = state.haematologies.concat(newHaematology);
    },
    resetAllHaematologies: (state) => {
        state.haematologies = [];
    },
    setHaematoFilter: (state, hmFilter) => {
        state.haematoFilter = hmFilter;
    },
    addHaematology: (state, newHaematology) => (state.haematologies.unshift(newHaematology)),
    scrollHemaPage: (state) => {state.hemaPage++},
    setTotalHaematologies: (state, length) => {state.hemaTotalHaematologies = length}
};

export default {
    state,
    getters,
    actions,
    mutations
};
