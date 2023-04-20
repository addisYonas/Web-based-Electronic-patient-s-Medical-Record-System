import {DrugAPI} from '@/api'
import {eventBus} from "../../../main";

const state = {
    drug: {},
    drugs: [],
    allDrugs: [],
};

const getters = {
    drug: (state) => state.drug,
    drugs: (state) => state.drugs,
    allDrugs: (state) => state.allDrugs,
};

const actions = {
    async fetchDrug({commit}, id) {
        DrugAPI.get(id).then(res => {
            commit('setDrug', res);
        });
    },
    async fetchDrugs({commit}) {
        if (state.drugs.length == 0) {
            const filter = {
                where: {},
                include: [
                    {
                        relation: "drugUtility",
                        scope: {
                            fields: ["name"]
                        }
                    },
                    {
                        relation: "drugClass",
                        scope: {
                            fields: ["name"]
                        }
                    }
                ],
                limit: this.limit,
                skip: (this.page - 1) * this.limit,
                order: 'createdAt DESC'
            };

            DrugAPI.all({filter: filter}).then(res => {
                commit('setDrugs', res.rows);
            });
        }
    },
    async fetchAllDrugs({commit}) {
        const filter = {
            order: 'createdAt DESC',
            include: [
                {
                    relation: "drugUtility",
                    scope: {
                        fields: ["name"]
                    }
                },
                {
                    relation: "drugClass",
                    scope: {
                        fields: ["name"]
                    }
                }
            ],
        };

        DrugAPI.all({filter: filter}).then(res => {
            commit('setAllDrugs', res.rows);
        });
    },
    async filterDrugs({commit}, filter) {
        DrugAPI.all({filter: filter}).then(res => {
            commit('setAllDrugs', res.rows);
        });
    },
    async createDrug({commit, dispatch}, drug) {
        DrugAPI.create(drug).then(() => {
            commit('setDrugs', []);
            dispatch('fetchDrugs');
            eventBus.$emit('openSb', {message: 'Drug is successfully added!', color: "primary"});
        });
    },
    async updateDrug({commit, dispatch}, drug) {
        DrugAPI.update(drug).then(() => {
            commit('setDrugs', []);
            dispatch('fetchDrugs');
            eventBus.$emit('openSb', {message: 'Drug is successfully updated!', color: "primary"});
        });
    },
    async deleteDrug({commit, dispatch}, id) {
        DrugAPI.remove(id).then(() => {
            commit('setDrugs', []);
            dispatch('fetchDrugs');
            eventBus.$emit('openSb', {message: 'Drug is successfully removed!', color: "primary"});
        });
    }
};

const mutations = {
    setDrug: (state, drug) => (state.drug = drug),
    setDrugs: (state, drugs) => (state.drugs = drugs),
    setAllDrugs: (state, allDrugs) => (state.allDrugs = allDrugs)
};

export default {
    state,
    getters,
    actions,
    mutations
};
