import http from "../http-common";

const getAll = () => {
    return http.get("/profile");
};

const get = (id) => {
    return http.get(`/${id}`);
};

const update = (id, data) => {
    return http.put(`/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/${id}`);
};

export default {
    getAll,
    remove, 
    get,
    update
};
