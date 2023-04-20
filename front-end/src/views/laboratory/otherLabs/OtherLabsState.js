import { OtherLabAPI } from '@/api'
import {PatientService} from "@/services"
import {AccountService} from "@/services"

const state = {
    otherLabs: [],
    otherLabsFilter: {},
    otLabPage: 1,
    otLabLimit: 5,
    otLabTotalItems: 0
};

const getters = {
    allOtherLab: (state) => state.otherLabs,
    otherLabsFilter: (state) => state.otherLabsFilter,
    otLabCurrentPage: (state) => state.otLabPage
};

const actions = {
    async fetchOtherLabs({commit, state}, nextPage) {
        if(state.otherLabs.length === 0 || nextPage){
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
                limit: state.otLabLimit,
                skip: (state.otLabPage - 1) * state.otLabLimit,
                order: 'createdAt DESC'
            };

            OtherLabAPI.all({filter: filter}).then(res => {
                commit('setAllOtherLabs', res.rows);
                commit('setTotalOtherLabs', res.count);
            });
        }
    },

    async goOtLabNextPageAction({state, commit, dispatch}) {
        if(state.otLabPage < Math.ceil(state.otLabTotalItems/ state.otLabLimit)) {
            commit('scrollOtLabPage');
            dispatch('fetchOtherLabs', true);
        }
    }
};

const mutations = {
    setAllOtherLabs: (state, newOtLab) => {
        state.otherLabs = state.otherLabs.concat(newOtLab);
    },
    resetAllOtherLabs: (state) => {
        state.otherLabs = [];
    },
    setOtherLabsFilter: (state, newOtLab) => {
        state.otherLabsFilter = newOtLab;
    },
    addOtherLab: (state, newOtLab) => (state.otherLabs.unshift(newOtLab)),
    scrollOtLabPage: (state) => {state.otLabPage++},
    setTotalOtherLabs: (state, length) => {state.otLabTotalItems = length}
};

export default {
    state,
    getters,
    actions,
    mutations
};
