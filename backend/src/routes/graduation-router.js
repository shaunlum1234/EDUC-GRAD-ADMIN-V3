const passport = require('passport');
const express = require('express');
const router = express.Router();
const config = require('../config/index');
const auth = require('../components/auth');
const { errorResponse, getBackendToken, getData, postData, putData, deleteData} = require('../components/utils');

//Program Routes
router.get('/*',passport.authenticate('jwt', {session: false}, undefined), getGraduationAPI);

async function getGraduationAPI(req, res) {
  const token = getBackendToken(req);
  
  try {
    const url = `${config.get('server:graduationAPIURL')}/graduate` + req.url;
    const data = await getData(token, url);
    return res.status(200).json(data);
  } catch (e) {
      return errorResponse(res);
  }
}

module.exports = router;
