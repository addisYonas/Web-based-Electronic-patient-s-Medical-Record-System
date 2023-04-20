import {SurgeryAPI} from '@/api'
import {eventBus} from "../../../main";
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    surgeries: [],
    surgeriesPage: 1,
    surgeriesLimit: 10,
    surgeriesTotal: 0
};

const getters = {
    allSurgeries: (state) => state.surgeries
};

const actions = {
    async fetchSurgeries({commit}, nextPage) {
        if (state.surgeries.length === 0 || nextPage) {
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
                limit: state.surgeriesLimit,
                skip: (!nextPage) ? 0 : (state.surgeriesPage - 1) * state.surgeriesLimit,
                order: 'createdAt DESC'
            };

            SurgeryAPI.all({filter: filter}).then(res => {
                commit('setSurgeries', res.rows);
                commit('setSurgeriesTotal', res.count);
            });
        }
    },
    async getMoreSurgeries({state, commit, dispatch}){
        if (state.surgeriesPage < Math.ceil(state.surgeriesTotal / state.surgeriesLimit)) {
            commit('scrollSurgeriesPage');
            dispatch('fetchSurgeries', true);
        }
    },
    async createSurgery({commit, dispatch}, surgery) {
        SurgeryAPI.create(surgery).then(() => {
            commit('emptySurgeries');
            dispatch('fetchSurgeries', false);
            eventBus.$emit('openSb', {message: 'Surgery is successfully added!', color: "primary"});
        });
    }
};

const mutations = {
    setSurgeries: (state, surgeries) => (state.surgeries = state.surgeries.concat(surgeries)),
    resetSurgeries: (state) => (state.surgeries = []),
    emptySurgeries: (state) => (state.surgeries = [], state.surgeriesPage = 1, state.surgeriesLimit = 10),
    scrollSurgeriesPage: (state) => {
        state.surgeriesPage++
    },
    setSurgeriesTotal: (state, length) => {
        state.surgeriesTotal = length
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
