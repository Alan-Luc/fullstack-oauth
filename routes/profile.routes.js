const router = require("express").Router();
const users = require("../controllers/user.controller");

const authCheck = (req, res, next) => {
    if(!req.user) {
        // if user is not logged in
        console.log("big penis")
        res.redirect("/login")
    } else {
        //if logged in
        console.log("small penis")
        next();
    }
};

// view your profile
router.get("/", authCheck, (req, res) => {
    console.log("small penis", req.user)
    res.send(req.user)
});

// find all
router.get("/all", users.findAll);

// update your profile
router.put("/:id", users.update);

// delete your profile
router.delete("/", users.delete);

module.exports = router;