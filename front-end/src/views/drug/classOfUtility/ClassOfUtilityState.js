import {DrugClassAPI} from '@/api'
import {eventBus} from "../../../main";

const state = {
    classOfUtilities: [],
    allClassOfUtilities: []
};

const getters = {
    classOfUtilities: (state) => state.classOfUtilities,
    allClassOfUtilities: (state) => state.allClassOfUtilities
};

const actions = {
    async fetchClassOfUtilities({commit}) {
        if (state.classOfUtilities.length == 0) {
            const filter = {
                where: {},
                include: [
                    {
                        relation: "utility",
                        scope: {
                            fields: ["name"]
                        }
                    }
                ],
                limit: this.limit,
                skip: (this.page - 1) * this.limit,
                order: 'createdAt DESC'
            };

            DrugClassAPI.all({filter: filter}).then(res => {
                commit('setClassOfUtilities', res.rows);
            });
        }
    },
    async fetchAllClassOfUtilities({commit}) {
        const filter = {
            order: 'createdAt DESC'
        };

        DrugClassAPI.all({filter: filter}).then(res => {
            commit('setAllClassOfUtilities', res.rows);
        });
    },
    async filterClassOfUtility({commit}, filter) {
        DrugClassAPI.all({filter: filter}).then(res => {
            commit('setAllClassOfUtilities', res.rows);
        });
    },
    async createClassOfUtility({commit, dispatch}, classOfUtility) {
        DrugClassAPI.create(classOfUtility).then(() => {
            commit('setClassOfUtilities', []);
            dispatch('fetchClassOfUtilities');
            eventBus.$emit('openSb', {message: 'Class Of Utility is successfully added!', color: "primary"});
        });
    },
    async updateClassOfUtility({commit, dispatch}, classOfUtility) {
        DrugClassAPI.update(classOfUtility).then(() => {
            commit('setClassOfUtilities', []);
            dispatch('fetchClassOfUtilities');
            eventBus.$emit('openSb', {message: 'Class Of Utility is successfully updated!', color: "primary"});
        });
    },
    async deleteClassOfUtility({commit, dispatch}, id) {
        DrugClassAPI.remove(id).then(() => {
            commit('setClassOfUtilities', []);
            dispatch('fetchClassOfUtilities');
            eventBus.$emit('openSb', {message: 'Class Of Utility is successfully removed!', color: "primary"});
        });
    }
};

const mutations = {
    setClassOfUtilities: (state, classOfUtilities) => (state.classOfUtilities = classOfUtilities),
    setAllClassOfUtilities: (state, allClassOfUtilities) => (state.allClassOfUtilities = allClassOfUtilities)
};

export default {
    state,
    getters,
    actions,
    mutations
};
