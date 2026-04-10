const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;
const USERS_FILE = "users.json";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); 


app.get("/", (req, res) => {
    res.redirect("/login.html");
});

// 1. REGISTER SYSTEM
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    let users = [];

    if (fs.existsSync(USERS_FILE)) {
        users = JSON.parse(fs.readFileSync(USERS_FILE));
    }

    // CHECK: Kya user pehle se exist karta hai?
    const userExists = users.find(u => u.username === username);
    
    if (userExists) {
        
        return res.redirect("/register.html?error=exists");
    }

    // new user save
    users.push({ username, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users));

    
    res.redirect("/login.html");
});

// 2. LOGIN SYSTEM
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!fs.existsSync(USERS_FILE)) {
        return res.redirect("/login.html?error=notfound");
    }

    let users = JSON.parse(fs.readFileSync(USERS_FILE));
    const user = users.find(u => u.username === username && u.password === password);

    // 3. SECURED PAGE ACCESS
    if (user) {
        res.redirect(`/dashboard.html?name=${user.username}`); 
    } else {
        res.redirect("/login.html?error=invalid"); 
    }
});

// Server Start
app.listen(PORT, () => {
    console.log(`🚀 Server running perfectly at http://localhost:${PORT}`);
});