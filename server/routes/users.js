const express = require('express');
const router = express.Router();
const Artists = require('../models/Artists');

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

module.exports = router;
