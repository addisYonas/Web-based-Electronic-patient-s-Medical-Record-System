import {PatientAPI} from '@/api'

const state = {
    patients: [],
    patientsPage: 1,
    patientsLimit: 10,
    patientsTotal: 0
};

const getters = {
    allPatients: (state) => state.patients
};

const actions = {
    async fetchPatients({commit}, nextPage) {
        if (state.patients.length === 0 || nextPage) {
            const filter = {
                include: [
                    {
                        relation: "createdBy",
                        scope: {
                            fields: ["fullName"]
                        }
                    }
                ],
                limit: state.patientsLimit,
                skip: (!nextPage) ? 0 : (state.patientsPage - 1) * state.patientsLimit,
                order: 'createdAt DESC'
            };

            PatientAPI.all({filter: filter}).then(res => {
                commit('setPatients', res.rows);
                commit('setPatientsTotal', res.count);
                console.log(res.count)
            });
        }
    },
    async getMorePatients({state, commit, dispatch}) {
        if (state.patientsPage < Math.ceil(state.patientsTotal / state.patientsLimit)) {
            commit('scrollPatientsPage');
            dispatch('fetchPatients', true);
        }
    }
};

const mutations = {
    setPatients: (state, patients) => (state.patients = state.patients.concat(patients)),
    emptyPatients: (state) => (state.patients = [], state.patientsPage = 1, state.patientsLimit = 10),
    scrollPatientsPage: (state) => {
        state.patientsPage++
    },
    setPatientsTotal: (state, length) => {
        state.patientsTotal = length
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
