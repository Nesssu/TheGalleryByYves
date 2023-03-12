const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Artists = require('../models/Artists');
const Admin = require("../models/Admin");

router.get('/get/artists/', (req, res, next) =>
{
  Artists.find({}, (err, artists) =>
  {
    if (err) throw err;
    else return res.json({artists});
  })
});

router.post('/add/artist/', (req, res, next) =>
{
  const name = req.body.name;
  const bio = req.body.bio;

  Artists.create(
    {
      name,
      bio
    },
    (err, ok) =>
    {
      if (err) throw err;
      else return res.json({success: true, message: "New artists added to the database!"});
    }
  )
});

router.post('/login', (req, res, next) =>
{
  const adminID = req.body.adminID;
  const password = req.body.password;

  Admin.findOne({adminID}).exec().then(admin =>
  {
    bcrypt.compare(password, admin.password, (err, isMatch) =>
    {
      if (err) throw err;
      else if (isMatch)
      {
        const payload = {
          adminID
        }
        jwt.sign(
          payload,
          process.env.LOGIN_SECRET,
          {
            expiresIn: "4h"
          },
          (err, token) =>
          {
            if (err) throw err;
            else return res.json({success: true, token});
          }
        )
      }
      else
      {
        return res.status(400).json({success: false, message: "Invalid password!"});
      }
    })
  }).catch(err => 
    {
      return res.status(400).json({success: false, message: "Invalid admin ID!"});
    })
})

module.exports = router;
