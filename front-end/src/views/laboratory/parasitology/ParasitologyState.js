import { ParasitologyAPI } from '@/api'
import { PatientService } from '@/services'
import { AccountService } from '@/services'

const state = {
    parasitologies: [],
    parasitologyFilter: {},
    paraPage: 1,
    paraLimit: 5,
    totalParasitologies: 0
};

const getters = {
    allParasitology: (state) => state.parasitologies,
    parasitologyFilter: (state) => state.parasitologyFilter,
    paraCurrentPage: (state) => state.paraPage
};

const actions = {
    async fetchParasitologies({commit, state}, nextPage) {
        if(state.parasitologies.length === 0 || nextPage){
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
                limit: state.paraLimit,
                skip: (state.paraPage - 1) * state.paraLimit,
                order: 'createdAt DESC'
            };

            ParasitologyAPI.all({filter: filter}).then(res => {
                commit('setAllParasitologies', res.rows);
                commit('setTotalParasitologies', res.count);
            });
        }
    },

    async goParaNextPageAction({state, commit, dispatch}) {
        if(state.paraPage < Math.ceil(state.totalParasitologies / state.paraLimit)) {
            commit('scrollParaPage');
            dispatch('fetchParasitologies', true);
        }
    }
};

const mutations = {
    setAllParasitologies: (state, newPara) => {
        state.parasitologies = state.parasitologies.concat(newPara);
    },
    resetAllParasitologies: (state) => {
        state.parasitologies = [];
    },
    setParasitologyFilter: (state, newPara) => {
        state.parasitologyFilter = newPara;
    },
    addParasitology: (state, newPara) => (state.parasitologies.unshift(newPara)),
    scrollParaPage: (state) => {state.paraPage++},
    setTotalParasitologies: (state, length) => {state.totalParasitologies = length}
};

export default {
    state,
    getters,
    actions,
    mutations
};
