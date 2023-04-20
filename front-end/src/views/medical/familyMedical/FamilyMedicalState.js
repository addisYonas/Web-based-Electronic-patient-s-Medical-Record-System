import {FamilyMedicalAPI} from '@/api'
import {eventBus} from "../../../main";
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    familyMedicals: [],
    familyMedicalsPage: 1,
    familyMedicalsLimit: 10,
    familyMedicalsTotal: 0
};

const getters = {
    allFamilyMedicals: (state) => state.familyMedicals
};

const actions = {
    async fetchFamilyMedicals({commit}, nextPage) {
        if (state.familyMedicals.length == 0 || nextPage) {
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
                limit: state.familyMedicalsLimit,
                skip: (!nextPage) ? 0 : (state.familyMedicalsPage - 1) * state.familyMedicalsLimit,
                order: 'createdAt DESC'
            };

            FamilyMedicalAPI.all({filter: filter}).then(res => {
                commit('setFamilyMedicals', res.rows);
                commit('setFamilyMedicalsTotal', res.count);
            });
        }
    },
    async getMoreFamilyMedicals({state, commit, dispatch}) {
        if (state.familyMedicalsPage < Math.ceil(state.familyMedicalsTotal / state.familyMedicalsLimit)) {
            commit('scrollFamilyMedicalsPage');
            dispatch('fetchFamilyMedicals', true);
        }
    },
    async createFamilyMedical({commit, dispatch}, familyMedical) {
        FamilyMedicalAPI.create(familyMedical).then(() => {
            commit('emptyFamilyMedicals');
            dispatch('fetchFamilyMedicals', false);
            eventBus.$emit('openSb', {message: 'Family Medical is successfully added!', color: "primary"});
        });
    }
};

const mutations = {
    setFamilyMedicals: (state, familyMedicals) => (state.familyMedicals = state.familyMedicals.concat(familyMedicals)),
    resetFamilyMedicals: (state) => (state.familyMedicals = []),
    emptyFamilyMedicals: (state) => (state.familyMedicals = [], state.familyMedicalsPage = 1, state.familyMedicalsLimit = 10),
    scrollFamilyMedicalsPage: (state) => {
        state.familyMedicalsPage++
    },
    setFamilyMedicalsTotal: (state, length) => {
        state.familyMedicalsTotal = length
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
