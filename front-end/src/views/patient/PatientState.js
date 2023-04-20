import { PatientAPI } from '@/api'
// import { HaematologyAPI } from '@/api'

const state = {
    patientData: {},
};

const getters = {
    patientData: (state) => state.patientData,
};

const actions = {
    async fetchPatientData({commit, state}) {
        // const filter = {
        //     where: {},
        //     // include: [
        //     //     {
        //     //         relation: "filledBy",
        //     //         scope: {
        //     //             fields: ["fullName"]
        //     //         }
        //     //     }
        //     // ],
        //     limit: state.labOrderLimit,
        //     skip: (state.labOrderPage - 1) * state.labOrderLimit,
        //     order: 'createdAt DESC'
        // };
        //
        // LabOrderAPI.all({filter: filter}).then(res => {
        //     if(nextPage === 'replace')
        //         commit('replaceAllLabOrders', res.rows);
        //     else
        //         commit('setAllLabOrders', res.rows);
        //     commit('setTotalLabOrders', res.count);
        // });
    },

    // async savePatientHaematology({commit, state}, data) {
    //     HaematologyAPI.create(data).then((res) => {});
    //     commit('setPatientHaematology', data);
    // }
};

const mutations = {
    // setPatientHaematology: (state, newHaema) => {
    //     state.patientData.laboratory.haematology = state.labOrders.concat(newHaema);
    // }
};

export default {
    state,
    getters,
    actions,
    mutations
};
