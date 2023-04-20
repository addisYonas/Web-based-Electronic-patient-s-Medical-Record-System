import { API_ROOT } from "./";
import Request from "./request";

const PATH = "/UserRoles";

const RoleAPI = {
  get(id) {
    return Request.get(`${API_ROOT}${PATH}/${id}`);
  },
  all(filter = {}) {
    return Request.get(`${API_ROOT}${PATH}?filter=${JSON.stringify(filter)}`);
  }
};

export default RoleAPI;
