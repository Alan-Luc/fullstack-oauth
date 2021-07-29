const router = require("express").Router();
const users = require("../controllers/user.controller");

const authCheck = (req, res, next) => {
    if(!req.user) {
        // if user is not logged in
        res.redirect("/auth/login")
    } else {
        //if logged in
        next();
    }
};

// view your profile
router.get("/", authCheck, (req, res) => {
    res.send(req.user)
});

// find all
router.get("/all", authCheck, users.findAll);

// update your profile
router.put("/", authCheck, users.update);

// delete your profile
router.delete("/", authCheck, users.delete);

module.exports = router;