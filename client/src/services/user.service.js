import http from "../http-common";

const getAll = () => {
    return http.get("/profile");
};

const update = (data) => {
    return http.put("/profile", data);
};

const remove = () => {
    return http.delete("/profile");
};

export default {
    getAll, update, remove
};
