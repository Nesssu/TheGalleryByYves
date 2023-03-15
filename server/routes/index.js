const express = require('express');
const router = express.Router();
const Subscribtions = require('../models/Subscribtions');
const Exhibitions = require('../models/Exhibition');
const Artists = require('../models/Artists');
const {body, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

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

router.post('/api/add/subscribtion', body("email").isEmail(), (req, res, next) => 
{
  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    return res.json({success: false, message: "Email is not formatted correctly!"});
  }

  const email = req.body.email;

  Subscribtions.findOne({email})
  .then((docs) =>
  {
    if (docs) return res.json({success: true, message: "You are already subscribed!"});
    else
    {
      Subscribtions.create({ email })
        .then((doc) => 
        {
          if (doc) return res.json({success: true, message: "Subscribtion added!"})
        })
        .catch((err) =>
        {
          if (err) throw err;
        })
    }
  })
});

router.get('/api/get/subscribtions', (req, res) =>
{
  Subscribtions.find()
    .then((docs) =>
    {
      return res.json({docs});
    })
})

router.get('/api/get/next/exhibition', (req, res, next) =>
{
  Exhibitions.findOne().sort({ date: -1 }).limit(1)
    .then((nextExhibition) =>
    {
      const time = nextExhibition.date.toLocaleString();
      return res.json({time});
    })
    .catch((err) =>
    {
      throw err
    });
})

router.post('/api/add/new/exhibition', (req, res, next) =>
{
  const title = req.body.title;
  const artist = req.body.artist;
  const about = req.body.about;
  const date = req.body.date;
  const time = req.body.time;
  const image = req.body.image;

  Exhibitions.create({
    title,
    artist,
    about,
    date,
    time,
    image,
    type: "exhibition",
    contentType: "image/jpeg"
  })
  .then((doc) => 
  {
    return res.json({success: true, message: "Exhibition added!"})
  })
  .catch((err) =>
  {
    return res.status(402).json({success: false, message: "Error while adding exhibition!"})
  });
});

router.get('/api/get/exhibitions', (req, res) =>
{
  Exhibitions.find()
  .then((docs) =>
  {
    return res.json({docs});
  })
});

router.post('/api/add/new/artist', (req, res, next) =>
{
  const name = req.body.name;
  const bio = req.body.bio;
  const image = req.body.image;

  Artists.create({
    name,
    bio,
    image,
    type: "artist",
    contentType: "image/jpeg"
  })
  .then((doc) => 
  {
    return res.json({success: true, message: "Artist added!"})
  })
  .catch((err) =>
  {
    return res.status(402).json({success: false, message: "Error while adding artist!"})
  });
});

router.get('/api/get/artists', (req, res) =>
{
  Artists.find()
  .then((docs) =>
  {
    return res.json({docs});
  })
})



module.exports = router;
