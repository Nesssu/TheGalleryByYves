const express = require('express');
const router = express.Router();
const Subscribtions = require('../models/Subscribtions');
const Exhibitions = require('../models/Exhibition');
const {body, validationResult} = require("express-validator");

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
  const path_to_image = req.body.path_to_image;

  

  return res.send("ok");
})



module.exports = router;
