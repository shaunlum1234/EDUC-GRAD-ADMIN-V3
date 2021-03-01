const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware');

const path = __dirname + '/app/view/';
console.log(path);
const app = express();

app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8080"
};


const COURSE_API_HOST="https://grad-course-api-wbmfsf-dev.pathfinder.gov.bc.ca/"
const COURSE_ACHIEVEMENT_API_HOST="https://student-course-api-wbmfsf-dev.pathfinder.gov.bc.ca"
const PROGRAM_RULES_API_HOST=" https://educ-grad-program-management-api-wbmfsf-dev.pathfinder.gov.bc.ca"
const GRADUATION_STATUS_API_HOST="https://educ-grad-graduation-status-api-wbmfsf-dev.pathfinder.gov.bc.ca"
const STUDENTS_API_HOST="https://gradstudent-api-wbmfsf-dev.pathfinder.gov.bc.ca"
const STUDENT_EXAMS_API_HOST="https://student-exam-api-wbmfsf-dev.pathfinder.gov.bc.ca"
const STUDENT_ASSESSMENTS_API_HOST="https://student-assessment-api-wbmfsf-dev.pathfinder.gov.bc.ca"
const GRADUATION_PROGRAMS_API_HOST="https://educ-grad-program-management-api-wbmfsf-dev.pathfinder.gov.bc.ca"
const GRADUATION_COMMON_API_HOST =" https://educ-grad-common-api-wbmfsf-dev.pathfinder.gov.bc.ca"
const SCHOOL_API_HOST =" https://educ-grad-school-api-wbmfsf-dev.pathfinder.gov.bc.ca"
const GRADUATION_API_HOST="https://educ-grad-graduation-api-wbmfsf-dev.pathfinder.gov.bc.ca"
const PROGRAM_MANAGEMENT_API_HOST="https://educ-grad-program-management-api-wbmfsf-dev.pathfinder.gov.bc.ca"
const PSI_API_HOST="https://educ-grad-psi-api-wbmfsf-dev.pathfinder.gov.bc.ca"


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const db = require("./app/models");

// db.sequelize.sync();

app.get('/index.html', function (req,res) {
  res.sendFile(path + "index.html");
});
app.use('/api/students', createProxyMiddleware({
  target: STUDENTS_API_HOST,
  changeOrigin: true,
  pathRewrite: {
      [`^/api/students`]: '',
  },
  
  
}));

app.use('/api/course-achievement', createProxyMiddleware({
  target: COURSE_ACHIEVEMENT_API_HOST,
  changeOrigin: true,
  pathRewrite: {
      [`^/api/course-achievement`]: '',
  },
}));
app.use('/api/student-assessments', createProxyMiddleware({
  target: STUDENT_ASSESSMENTS_API_HOST,
  changeOrigin: true,
  pathRewrite: {
      [`^/api/student-assessments`]: '',
  },
}));

//require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});