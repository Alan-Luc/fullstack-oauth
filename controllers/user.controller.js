const User = require("../models/userModel");

exports.findAll = (req, res) => {
    const user = req.query.user;
    let condition = user ? { user: { $regex: new RegExp(user), $options: "i" }} : {};

    User.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.findOne = (req,res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({ message: "Not found User with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
        });
};

exports.update = (req, res) => {
    console.log(req.user)
    if(!req.params.id) {
        return res.status(400).send({
            message: "Data to update cannot be empty"
        })
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                })
            } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id

    User.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};