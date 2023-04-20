import {PrescriptionAPI} from '@/api'
import {eventBus} from "../../main.js";
import {PatientService} from "@/services"

const state = {
    prescriptions: [],
    prescriptionsPage: 1,
    prescriptionsLimit: 6,
    prescriptionsTotal: 0
};

const getters = {
    prescriptions: (state) => state.prescriptions,
};

const actions = {
    async fetchPrescriptions({commit}, nextPage) {
        if (state.prescriptions.length === 0 || nextPage) {
            const filter = {
                where: {
                    patientId: PatientService.getPatientId()
                },
                limit: state.prescriptionsLimit,
                skip: (!nextPage) ? 0 : (state.prescriptionsPage - 1) * state.prescriptionsLimit,
                order: 'createdAt DESC',
                include: [
                    {
                        relation: "drug",
                        scope: {
                            fields: ["name", "form", "drugClassId", "drugUtilityId"],
                            include: [
                                {
                                    relation: "drugClass",
                                    scope: {
                                        fields: ["name"]
                                    }
                                },
                                {
                                    relation: "drugUtility",
                                    scope: {
                                        fields: ["name"]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        relation: "orderedBy",
                        scope: {
                            fields: ["fullName"]
                        }
                    }
                ]
            };

            PrescriptionAPI.all({filter: filter}).then(res => {
                commit('setPrescriptions', res.rows);
                commit('setPrescriptionsTotal', res.count);
            });
        }
    },
    async createPrescription({commit, dispatch}, prescription) {
        PrescriptionAPI.create(prescription).then(() => {
            commit('emptyPrescriptions');
            dispatch('fetchPrescriptions');
            eventBus.$emit('openSb', {message: 'Prescription is successfully added!', color: "primary"});
        });
    },
    async updatePrescription({commit, dispatch}, prescription) {
        PrescriptionAPI.update(prescription).then(() => {
            commit('setPrescriptions', []);
            dispatch('fetchPrescriptions');
            eventBus.$emit('openSb', {message: 'Prescription is successfully updated!', color: "primary"});
        });
    },
    async getMorePrescriptions({state, commit, dispatch}) {
        if (state.prescriptionsPage < Math.ceil(state.prescriptionsTotal / state.prescriptionsLimit)) {
            commit('scrollPrescriptionsPage');
            dispatch('fetchPrescriptions', true);
        }
    }
};

const mutations = {
    setPrescriptions: (state, prescriptions) => (state.prescriptions = state.prescriptions.concat(prescriptions)),
    emptyPrescriptions: (state) => (state.prescriptions = [], state.prescriptionsPage = 1, state.prescriptionsLimit = 6),
    scrollPrescriptionsPage: (state) => {
        state.prescriptionsPage++
    },
    setPrescriptionsTotal: (state, length) => {
        state.prescriptionsTotal = length
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
