const http = require("http");
const express = require("express");
const socket = require("socket.io");
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const passportSetup = require("./config/passportSetup");
const mongoose = require("mongoose");
const path = require("path")
const keys =  require("./config/keys");
const cookieSession = require("cookie-session")
const passport = require("passport");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");


const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type", "Access-Control-Allow-Credentials"],
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
});

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
      credentials: true,
    },
});

io.on("connect", (socket) => {
    console.log('made socket connection', socket.id);
    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.join(user.room);

        socket.emit("message", { user: "admin", text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name} has joined`});

        io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
        console.log({ room: user.room, users: getUsersInRoom(user.room) });
        callback();
    });


    socket.on("chat", (message, callback) => {
        console.log(message);
        const user = getUser(socket.id);

        io.to(user.room).emit("message", { user: user.name, text: message });
        console.log({ user: user.name, text: message });

        callback();
    });

    socket.on("typing", () => {
        const user = getUser(socket.id);

        io.to(user.room).emit("typing", { text: `${user.name} is typing...`});
        //socket.broadcast.options(user.room).emit("typing", { text: `${user.name} is typing...`});
        //socket.emit("typing", { text: `${user.name} is typing...`});
    })


    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit("message", { user: "Admin", text: `${user.name} has left.`});
            io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room)});
        }
    });
});


const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server now listening for requests on port ${PORT}`);
})