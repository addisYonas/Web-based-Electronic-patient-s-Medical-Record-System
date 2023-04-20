import { LabOrderAPI } from '@/api'
import {PatientService} from "@/services"
import {AccountService} from "@/services";

const state = {
    labOrders: [],
    labOrderPage: 1,
    labOrderLimit: 5,
    totalLabOrders: 0
};


const getters = {
    allLabOrder: (state) => state.labOrders,
    labOrderCurrentPage: (state) => state.labOrderPage
};

const actions = {
    async fetchLabOrders({commit, state}, nextPage) {
        if(state.labOrders.length === 0 || nextPage){
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
                limit: state.labOrderLimit,
                skip: (state.labOrderPage - 1) * state.labOrderLimit,
                order: 'createdAt DESC'
            };

            LabOrderAPI.all({filter: filter}).then(res => {
                if(nextPage === 'replace')
                    commit('replaceAllLabOrders', res.rows);
                else
                    commit('setAllLabOrders', res.rows);
                commit('setTotalLabOrders', res.count);
            });
        }
    },

    async goLabOrderNextPageAction({state, commit, dispatch}) {
        if(state.labOrderPage < Math.ceil(state.totalLabOrders/ state.labOrderLimit)) {
            commit('scrollLabOrderPage');
            dispatch('fetchLabOrders', true);
        }
    }
};

const mutations = {
    setAllLabOrders: (state, newLab) => {
        state.labOrders = state.labOrders.concat(newLab);
    },
    replaceAllLabOrders: (state, newLab) => {
        state.labOrders = newLab;
    },
    addLabOrder: (state, newLab) => (state.labOrders.unshift(newLab)),
    scrollLabOrderPage: (state) => {state.labOrderPage++},
    setTotalLabOrders: (state, length) => {state.totalLabOrders = length}
};

export default {
    state,
    getters,
    actions,
    mutations
};
