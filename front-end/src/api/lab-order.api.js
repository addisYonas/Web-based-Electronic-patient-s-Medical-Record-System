import { API_ROOT } from "./index";
import Request from "./request";

const PATH = "/lab-orders";

const LabOrderAPI = {
    // get(id) {
    //     return Request.get(`${API_ROOT}${PATH}/${id}`);
    // },
    all(filter) {
        return Request.get(`${API_ROOT}${PATH}`, { params: filter });
    },
    create(data) {
        return Request.post(`${API_ROOT}${PATH}`, data);
    },
    update(data) {
        let id = data.id;
        delete data.id;

        return Request.patch(`${API_ROOT}${PATH}/${id}`, { ...data });
    },
    remove(id) {
        return Request.delete(`${API_ROOT}${PATH}/${id}`);
    },
    // changePassword(id, password) {
    //     return Request.put(`${API_ROOT}${PATH}/change-user-password`, {
    //         id,
    //         password
    //     });
    // },
    // updatePassword(data) {
    //     return Request.post(`${API_ROOT}${PATH}/update-password`, { ...data });
    // },
    // activate(id) {
    //     return Request.post(`${API_ROOT}${PATH}/activate-user`, { userId: id });
    // },
    // deactivate(id) {
    //     return Request.post(`${API_ROOT}${PATH}/deactivate-user`, { userId: id });
    // }
};

export default LabOrderAPI;
