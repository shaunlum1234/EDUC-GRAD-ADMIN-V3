'use strict';

const config = require('../config/index');

const roles = {
  User: {
    //Help functions created in auth module: isValidStudentSearchUserToken, isValidStudentSearchUser
    StudentSearch: config.get('server:studentSearch:rolesAllowed'),
    //Help functions created in auth module: isValidStaffAdministrationUser
    StaffAdministration: config.get('server:administration:rolesAllowed'),
    //Help functions created in auth module: isValidExchangeUserToken, isValidExchangeUser
    Exchange: ['SECURE_EXCHANGE']
  },
  Admin: {
    //Help functions created in auth module: isValidStudentSearchAdmin
    StudentSearch: config.get('server:studentSearch:roleAdmin'),
    //Help functions created in auth module: isValidStaffAdministrationAdmin
    StaffAdministration: config.get('server:administration:roleAdmin')
  }
};

module.exports = roles;
