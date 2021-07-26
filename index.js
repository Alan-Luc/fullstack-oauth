const express = require("express");
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const passportSetup = require("./config/passportSetup");
const mongoose = require("mongoose");
const keys =  require("./config/keys");
const cookieSession = require("cookie-session")
const passport = require("passport");

const app = express();

//setup view engine
app.set("view engine", "ejs");

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


//connect to mongo
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {
    console.log("connected to database");
})


//set up routes
app.use("/auth", authRoutes)
app.use("/profile", profileRoutes)

// create home route
app.get("/", (req, res) => {
    res.render("home", { user: req.user });
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`app now listening for requests on port ${PORT}`);
})