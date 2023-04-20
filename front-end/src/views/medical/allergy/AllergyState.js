import {AllergyAPI} from '@/api'
import {eventBus} from "../../../main";
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    allergies: [],
    allergiesPage: 1,
    allergiesLimit: 10,
    allergiesTotal: 0
};

const getters = {
    allAllergies: (state) => state.allergies
};

const actions = {
    async fetchAllergies({commit}, nextPage) {
        if (state.allergies.length === 0 || nextPage) {
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
                limit: state.allergiesLimit,
                skip: (!nextPage) ? 0 : (state.allergiesPage - 1) * state.allergiesLimit,
                order: 'createdAt DESC'
            };

            AllergyAPI.all({filter: filter}).then(res => {
                commit('setAllergies', res.rows);
                commit('setAllergiesTotal', res.count);
            });
        }
    },
    async getMoreAllergies({state, commit, dispatch}) {
        if (state.allergiesPage < Math.ceil(state.allergiesTotal / state.allergiesLimit)) {
            commit('scrollAllergiesPage');
            dispatch('fetchAllergies', true);
        }
    },
    async createAllergy({commit, dispatch}, allergy) {
        AllergyAPI.create(allergy).then(() => {
            commit('emptyAllergies');
            dispatch('fetchAllergies', false);
            eventBus.$emit('openSb', {message: 'Allergy is successfully added!', color: "primary"});
        });
    }
};

const mutations = {
    setAllergies: (state, allergies) => (state.allergies = state.allergies.concat(allergies)),
    resetAllergies: (state) => (state.allergies = []),
    emptyAllergies: (state) => (state.allergies = [], state.allergiesPage = 1, state.allergiesLimit = 10),
    scrollAllergiesPage: (state) => {
        state.allergiesPage++
    },
    setAllergiesTotal: (state, length) => {
        state.allergiesTotal = length
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
