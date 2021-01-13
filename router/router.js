const express = require('express');
const router = express.Router();

const {signUp} = require('../Controller/auth');

router.post('./register',signUp);

module.exports = router