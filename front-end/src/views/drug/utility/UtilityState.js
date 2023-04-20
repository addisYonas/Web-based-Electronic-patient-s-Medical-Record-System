import {DrugUtilityAPI} from '@/api'
import {eventBus} from "../../../main";

const state = {
    utilities: [],
    allUtilities: []
};

const getters = {
    utilities: (state) => state.utilities,
    allUtilities: (state) => state.allUtilities
};

const actions = {
    async fetchUtilities({commit}) {
        if (state.utilities.length == 0) {
            const filter = {
                where: {},
                limit: this.limit,
                skip: (this.page - 1) * this.limit,
                order: 'createdAt DESC'
            };

            DrugUtilityAPI.all({filter: filter}).then(res => {
                commit('setUtilities', res.rows);
            });
        }
    },
    async fetchAllUtilities({commit}) {
        const filter = {
            order: 'createdAt DESC'
        };

        DrugUtilityAPI.all({filter: filter}).then(res => {
            commit('setAllUtilities', res.rows);
        });
    },
    async createUtility({commit, dispatch}, utility) {
        DrugUtilityAPI.create(utility).then(() => {
            commit('setUtilities', []);
            dispatch('fetchUtilities');
            eventBus.$emit('openSb', {message: 'Utility is successfully added!', color: "primary"});
        });
    },
    async updateUtility({commit, dispatch}, utility) {
        DrugUtilityAPI.update(utility).then(() => {
            commit('setUtilities', []);
            dispatch('fetchUtilities');
            eventBus.$emit('openSb', {message: 'Utility is successfully updated!', color: "primary"});
        });
    },
    async deleteUtility({commit, dispatch}, id) {
        DrugUtilityAPI.remove(id).then(() => {
            commit('setUtilities', []);
            dispatch('fetchUtilities');
            eventBus.$emit('openSb', {message: 'Utility is successfully removed!', color: "primary"});
        });
    }
};

const mutations = {
    setUtilities: (state, utilities) => (state.utilities = utilities),
    setAllUtilities: (state, allUtilities) => (state.allUtilities = allUtilities)
};

export default {
    state,
    getters,
    actions,
    mutations
};
