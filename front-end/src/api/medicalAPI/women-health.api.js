import { API_ROOT } from "../index";
import Request from "../request";

const PATH = "/WomenHealths";

const WomenHealthAPI = {
  get(id) {
    return Request.get(`${API_ROOT}${PATH}/${id}`);
  },
  all(filter) {
    return Request.get(`${API_ROOT}${PATH}`, { params: filter });
  },
  generate(id) {
    return Request.get(`${API_ROOT}${PATH}/generate/${id}`);
  },
  create(data) {
    return Request.post(`${API_ROOT}${PATH}`, data);
  },
  update(data) {
    return Request.put(`${API_ROOT}${PATH}`, { ...data });
  },
  remove(id) {
    return Request.delete(`${API_ROOT}${PATH}/${id}`);
  }
};

export default WomenHealthAPI;
