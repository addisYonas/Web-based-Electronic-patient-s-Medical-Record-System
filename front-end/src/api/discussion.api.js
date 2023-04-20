import {API_ROOT} from "./";
import Request from "./request";

const PATH = "/Discussions";

const DiscussionAPI = {
    get(id) {
        return Request.get(`${API_ROOT}${PATH}/${id}`);
    },
    all(filter) {
        return Request.get(`${API_ROOT}${PATH}/find-discussions`, {params: filter});
    },
    create(data) {
        return Request.post(`${API_ROOT}${PATH}`, data);
    },
    update(data) {
        return Request.put(`${API_ROOT}${PATH}/update-discussion`, {...data});
    },
    remove(id) {
        return Request.delete(`${API_ROOT}${PATH}/${id}`);
    },
    count(where) {
        return Request.get(`${API_ROOT}${PATH}/count`, {params: where});
    }
};

export default DiscussionAPI;
