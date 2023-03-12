const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Artists = require('../models/Artists');
const Admin = require("../models/Admin");

const authenticateToken = (req, res, next) =>
{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1].replace(/"/g, '');
  
  if (token == null) return res.status(402).json({success: false});

  jwt.verify(token, process.env.LOGIN_SECRET, (err, admin) =>
  {
    if (err) return res.status(402).json({success: false});

    req.admin = admin;
    next();
  })
}

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

router.put('/update/id', authenticateToken, (req, res) =>
{
  const newAdminID = req.body.adminID;
  const oldAdminID = req.admin.adminID;

  Admin.findOneAndUpdate({adminID: oldAdminID}, { $set: { adminID: newAdminID } })
    .then((updatedDoc) =>
      {
        return res.status(200).json({success: true});
      })
      .catch((err) =>
      {
        if (err) return res.status(402).json({success: false});
      }
    )
})

router.put('/update/password', authenticateToken, (req, res) =>
{
  const newPassword = req.body.password;
  const adminID = req.admin.adminID;

  bcrypt.genSalt(10, (err, salt) =>
    {
      bcrypt.hash(newPassword, salt, (err, hash) =>
      {
        if (err) { return res.status(402).json({ success: false }); }
        Admin.findOneAndUpdate({adminID: adminID}, { $set: { password: hash }})
          .then((updatedDoc) =>
          {
            return res.status(200).json({success: true});
          })
          .catch((err) =>
          {
            if (err) { return res.status(402).json({success: false}); }
          }
        )
      })
    }
  )
})

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
  });
});

router.post('/verify/token', (req, res) =>
{
  const token = req.body.token.replace(/"/g, '');
  
  jwt.verify(token, process.env.LOGIN_SECRET, (err, user) =>
  {
    if (err) { return res.status(401).json({success: false}); }

    const ID = user.adminID;

    Admin.findOne({adminID: ID}).exec().then(admin =>
      {
        return res.status(200).json({success: true});
      })
      .catch(err =>
      {
        if (err) return res.status(401).json({success: false});
      })
  })

})

module.exports = router;
