const passport = require('passport');
const express = require('express');
const router = express.Router();
const config = require('../config/index');
const auth = require('../components/auth');
const roles = require("../components/roles");
const { errorResponse, getBackendToken, getData, postData, putData, deleteData} = require('../components/utils');
const isValidUiTokenWithStaffRoles = auth.isValidUiTokenWithRoles('GRAD_SYSTEM_COORDINATOR', [roles.Admin.StaffAdministration]);

//Program Routes
router.get('*',passport.authenticate('jwt', {session: false}, undefined), isValidUiTokenWithStaffRoles, getTRAXAPI);

async function getTRAXAPI(req, res) {
  const token = getBackendToken(req);
  try {
    const url = `${config.get('server:gradTraxAPIURL')}/trax` + req.url;
    const data = await getData(token, url);
    return res.status(200).json(data);
  } catch (e) {
    if(e.data.message){
      return errorResponse(res, e.data.message, e.status);
    } else {
      return errorResponse(res);
    }
  }
}

module.exports = router;
