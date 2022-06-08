const passport = require('passport');
const express = require('express');
const router = express.Router();
const config = require('../config/index');
const auth = require('../components/auth');
const { errorResponse, getBackendToken, getData, putData} = require('../components/utils');

//Program Routes
router.get('/',passport.authenticate('jwt', {session: false}, undefined), getTRAXAPI);

async function getTRAXAPI(req, res) {
  const token = getBackendToken(req);
  console.log(req.url)
  try {
    const url = `${config.get('server:gradTraxURL')}/school/` + req.url;
    const data = await getData(token, url);
    return res.status(200).json(data);
  } catch (e) {
      return errorResponse(res);
  }
}

module.exports = router;
