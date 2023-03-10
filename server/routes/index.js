const express = require('express');
const router = express.Router();
const Subscribtions = require('../models/Subscribtions');
const {body, validationResult} = require("express-validator");

router.post('/api/add/subscribtion', body("email").isEmail(), (req, res, next) => 
{
  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    return res.json({success: false, message: "Email is not formatted correctly!"});
  }

  const email = req.body.email;

  Subscribtions.create(
    {
      email
    },
    (err, ok) =>
    {
      if (err) throw err;
      else return res.json({success: true, message: "Subscribtion added!"})
    }
  )
});

module.exports = router;
