import http from "../http-common";

const getAll = () => {
    return http.get("/profile");
};

const update = (id, data) => {
    return http.put(`/profile/${id}`, data);
};

const remove = () => {
    return http.delete("/profile");
};

export default {
    getAll, update, remove
};
