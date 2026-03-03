const express = require('express');
const router = express.Router();

const ownerModel = require('../models/owner-model'); // userschema

router.get('/', (req, res) => {
  res.send('hello');
});

if (process.env.NODE_ENV === 'development') {
  router.post('/create', async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) return res.status(500).send('Owner already exist');
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(200).send(createdOwner);
  });
}

router.get('/admin', function (req, res) {
  let success = req.flash('success');
  res.render('createproducts', { success });
});

module.exports = router;
