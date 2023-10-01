const express = require("express");
const app = express();
const conn = require("./db/conn");
const Register = require("./models/register");
const Register1 = require("./models/register1");
const port = process.env.PORT || 5000;
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");

// Set Paths
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");

// show data on server
app.use(express.json());

app.use(express.static(staticPath));

// path use
app.set("view engine", "hbs");
app.set("views", templatePath);

// Data show in Database
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/course", (req, res) => {
  res.render("course");
});
app.get("/blog", (req, res) => {
  res.render("blog");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Post Data On database Store.
//Register
app.post("/", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const registerStudetns = new Register({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: password,
        confirmpassword: cpassword,
      });
      console.log("the success part " + registerStudetns);

      // hashPassword


      // token gereate
      // const token = await registerStudetns.generateAuthToken();
      // console.log("The token part " + token);

      const registered = await registerStudetns.save();
      res.status(201).render("index");
    } else {
      res.send(`<h1>Password are not matching</h1>`);
    }
  } catch (error) {
    res.status(400).send("Invalid Login");
  }
});

// Login part

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const EmailUser = await Register.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, EmailUser.password);
    // const token = await EmailUser.generateAuthToken();
    // console.log("The token part " + token);

    if (isMatch) {
      res.status(201).render("index");
    } else {
      res.send(`<h1>Invalid Email or Password</h1>`);
    }
  } catch (error) {
    res.status(400).send("Invalid login details");
  }
});


// Contact Form details
app.post("/contact", async (req, res) => {
  try {
    const ContactForm = await Register1({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
    });
    const result = await ContactForm.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(400).send("Invalid Details.");
  }
});
app.listen(port, () => {
  console.log(`Listening port no ${port}`);
});
