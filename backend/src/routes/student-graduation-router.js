const passport = require('passport');
const express = require('express');
const router = express.Router();
const config = require('../config/index');
const auth = require('../components/auth');
const { errorResponse, getBackendToken, getData, postData, putData, deleteData} = require('../components/utils');

//Program Routes
router.get('*',passport.authenticate('jwt', {session: false}, undefined), getStudentGraduationAPI);
router.post('*',passport.authenticate('jwt', {session: false}, undefined), postStudentGraduationAPI);

async function getStudentGraduationAPI(req, res) {
  const token = getBackendToken(req);
  console.log(req)
  try {
    const url = `${config.get('server:studentGraduationAPIURL')}` + req.originalUrl;
    const data = await getData(token, url);
    return res.status(200).json(data);
  } catch (e) {
      return errorResponse(res);
  }
}
async function postStudentGraduationAPI(req, res) {
  const token = getBackendToken(req);
  console.log(req)
  try {
    const url = `${config.get('server:studentGraduationAPIURL')}` + req.originalUrl;
    const data = await postData(token, url);
    return res.status(200).json(data);
  } catch (e) {
      return errorResponse(res);
  }
}

module.exports = router;
