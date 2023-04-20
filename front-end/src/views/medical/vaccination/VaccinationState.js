import {VaccinationAPI} from '@/api'
import {eventBus} from "../../../main";
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    vaccinations: [],
    vaccinationsPage: 1,
    vaccinationsLimit: 10,
    vaccinationsTotal: 0
};

const getters = {
    allVaccinations: (state) => state.vaccinations
};

const actions = {
    async fetchVaccinations({commit}, nextPage) {
        if (state.vaccinations.length === 0 || nextPage) {
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
                limit: state.vaccinationsLimit,
                skip: (!nextPage) ? 0 : (state.vaccinationsPage - 1) * state.vaccinationsLimit,
                order: 'createdAt DESC'
            };

            VaccinationAPI.all({filter: filter}).then(res => {
                commit('setVaccinations', res.rows);
                commit('setVaccinationsTotal', res.count);
            });
        }
    },
    async getMoreVaccinations({state, commit, dispatch}){
        if (state.vaccinationsPage < Math.ceil(state.vaccinationsTotal / state.vaccinationsLimit)) {
            commit('scrollVaccinationsPage');
            dispatch('fetchVaccinations', true);
        }
    },
    async createVaccination({commit, dispatch}, vaccination) {
        VaccinationAPI.create(vaccination).then(() => {
            commit('emptyVaccinations');
            dispatch('fetchVaccinations', false);
            eventBus.$emit('openSb', {message: 'Vaccination is successfully added!', color: "primary"});
        });
    }
};

const mutations = {
    setVaccinations: (state, vaccinations) => (state.vaccinations = state.vaccinations.concat(vaccinations)),
    resetVaccinations: (state) => (state.vaccinations = []),
    emptyVaccinations: (state) => (state.vaccinations = [], state.vaccinationsPage = 1, state.vaccinationsLimit = 10),
    scrollVaccinationsPage: (state) => {
        state.vaccinationsPage++
    },
    setVaccinationsTotal: (state, length) => {
        state.vaccinationsTotal = length
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
