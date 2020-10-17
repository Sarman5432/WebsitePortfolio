const express = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
var server_port = process.env.PORT || 5000;
var server_host = process.env.HOST || "0.0.0.0";

app.use(express.json());

//for react build (same dir)
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.get("/api/portfolio", (req, res) => {
  res.send(JSON.stringify(projectImages));
});

app.get("/api/resume", (req, res) => {
  var filePath = "/temp/Developer Resume 2020.pdf";
  fs.readFile(__dirname + filePath, (err, data) => {
    res.contentType("application/pdf");
    res.send(data);
  });
});

app.post("/api/contact", (req, res) => {
  sendEmail({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  res.send({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
});

app.listen(server_port, server_host, () => {
  console.log(`Example app listening`);
});

function sendEmail(contactInfo) {
  //send email
  const transporter = nodemailer.createTransport({
    service: "gmail", //'smtp.gmail.com'
    //port: 465,
    //secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: contactInfo.email,
    subject: `Email form sarmanaulakh.com from ${contactInfo.name}, ${contactInfo.email}`,
    text: contactInfo.message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log("error:", err);
    else console.log("Email sent: " + info.response);
  });
}

const projectImages = [
  {
    id: 1,
    title: "SM-Toolkit",
    url: "https://i.ibb.co/wscHn18/SM-Toolkit.jpg",
    link: "https://github.com/Sarman5432/SM-Toolkit",
    description:
      "SM-Toolkit was built to help students with basic math operations such as matrix manipulations, conversions, and more. The idea was to practice math and programming fundamentals while trying to build a symbolab/wolfram alpha type website",
    tags: "JavaScript, HTML/CSS, jQuery",
    category: "Group Projects",
    startDate: "2020-08-01",
  },
  {
    id: 2,
    title: "Forreal",
    url: "https://i.ibb.co/m98J8YN/ForReal.jpg",
    link: "https://github.com/Sarman5432/Forreal",
    description:
      "Forreal is a Chrome extension that combats fake news by suggesting more relevant and trusted sources for news. Upon reading something on a website, the user can easily copy and paste the information into the search bar and quickly confirm whether or not it is fake news by comparing it to credited sources through the News API",
    tags: "JavaScript, HTML/CSS, News API",
    category: "Hackathons",
    startDate: "2020-03-01",
  },
  {
    id: 3,
    title: "ImpactFrenzy",
    url: "https://i.ibb.co/prrFdyn/Game-proj.png",
    link: "https://github.com/Sarman5432/ImpactFrenzy",
    description:
      "HTML5 game built using the Phaser Framework for Canvas and WebGL powered browser games. Authenticate to play an infinite game that gets harder as your score goes up. Collect coins while avoiding the bouncing spikes!",
    tags: "JavaScript, Phaser Framework",
    category: "Personal Projects",
    startDate: "2019-09-01",
  },
  {
    id: 4,
    title: "Athlete Tech Summit",
    url: "https://i.ibb.co/FqWsP3k/received-366739410681295.jpg",
    link: "https://athletetechgroup.com/",
    description:
      "Joined the tech team (picture) at Atlas365 Inc that worked on the mobile aspect of the tech summit app (private bitbucket repo), helping organize the event through a digital event portal. Fun fact: we got a chance to talk with prominant NBA players, including Fred Vanvleet!",
    tags: "React Native, JavaScript, Node JS",
    category: "Work Experience",
    startDate: "2019-07-01",
  },
  // {
  //   id: 5,
  //   title: 'Atlas Game',
  //   url: 'https://i.ibb.co/prrFdyn/Game-proj.png',
  //   link: 'https://github.com/Sarman5432/AtlasGame',
  //   description: '',
  //   tags: '',
  //   category: 'Work Experience',
  //   startDate: '2019-08-01'
  // },
];
