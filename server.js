const express = require("express");
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const passportSetup = require("./config/passportSetup");
const mongoose = require("mongoose");
const path = require("path")
const keys =  require("./config/keys");
const cookieSession = require("cookie-session")
const passport = require("passport");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type"],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions))

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.options("*", cors(corsOptions));

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
app.use("/auth", authRoutes, cors(corsOptions))
app.use("/profile", profileRoutes, cors(corsOptions))

app.use(express.static(path.join(__dirname + '/client/public')));
app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/client/public/index.html')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// create home route
app.get("/", (req, res) => {
    res.render("home", { user: req.user });
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`app now listening for requests on port ${PORT}`);
})