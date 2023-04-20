import {ClinicalNoteAPI} from '@/api'
import {eventBus} from "../../../main";
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    clinicalNotes: [],
    clinicalNotesPage: 1,
    clinicalNotesLimit: 10,
    clinicalNotesTotal: 0
};

const getters = {
    allClinicalNotes: (state) => state.clinicalNotes
};

const actions = {
    async fetchClinicalNotes({commit}, nextPage) {
        if (state.clinicalNotes.length === 0 || nextPage) {
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
                limit: state.clinicalNotesLimit,
                skip: (!nextPage) ? 0 : (state.clinicalNotesPage - 1) * state.clinicalNotesLimit,
                order: 'createdAt DESC'
            };

            ClinicalNoteAPI.all({filter: filter}).then(res => {
                commit('setClinicalNotes', res.rows);
                commit('setClinicalNotesTotal', res.count);
            });
        }
    },
    async getMoreClinicalNotes({state, commit, dispatch}) {
        if (state.clinicalNotesPage < Math.ceil(state.clinicalNotesTotal / state.clinicalNotesLimit)) {
            commit('scrollClinicalNotesPage');
            dispatch('fetchClinicalNotes', true);
        }
    },
    async createClinicalNote({commit, dispatch}, clinicalNote) {
        ClinicalNoteAPI.create(clinicalNote).then(() => {
            commit('emptyClinicalNotes');
            dispatch('fetchClinicalNotes', false);
            eventBus.$emit('openSb', {message: 'Clinical Note is successfully added!', color: "primary"});
        });
    }
};

const mutations = {
    setClinicalNotes: (state, clinicalNotes) => (state.clinicalNotes = state.clinicalNotes.concat(clinicalNotes)),
    resetClinicalNotes: (state) => (state.clinicalNotes = []),
    emptyClinicalNotes: (state) => (state.clinicalNotes = [], state.clinicalNotesPage = 1, state.clinicalNotesLimit = 10),
    scrollClinicalNotesPage: (state) => {
        state.clinicalNotesPage++
    },
    setClinicalNotesTotal: (state, length) => {
        state.clinicalNotesTotal = length
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
