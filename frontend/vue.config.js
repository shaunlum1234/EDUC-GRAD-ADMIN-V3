module.exports = {
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  },
  devServer: {
    proxy: {
      '/api/v1/studentcourse': {
        target: process.env.VUE_APP_COURSE_ACHIEVEMENT_API_HOST,
        changeOrigin: true,
      },
      '/api/v1/studentassessment': {
        target: process.env.VUE_APP_STUDENT_ASSESSMENTS_API_HOST,
        changeOrigin: true,
      },
      '/api/v1/student': {
        target: process.env.VUE_APP_STUDENTS_API_HOST,
        changeOrigin: true,
      },
      '/api/v1/school': {
        target: process.env.VUE_APP_SCHOOL_API_HOST,
        changeOrigin: true,
      },
      '/api/v1/course': {
        target: process.env.VUE_APP_COURSE_API_HOST,
        changeOrigin: true,
      },
      '/api/v1/psi': {
        target: process.env.VUE_APP_PSI_API_HOST,
        changeOrigin: true,
      },
      '/api/v1/programmanagement': {
        target: process.env.VUE_APP_PROGRAM_MANAGEMENT_API_HOST,
        changeOrigin: true,
      },
      '/api/v1/gradstatus': {
        target: process.env.VUE_APP_GRADUATION_STATUS_API_HOST,
        changeOrigin: true,
      },
      '/api/v1/common': {
        target: process.env.VUE_APP_GRADUATION_COMMON_API_HOST,
        changeOrigin: true,
      },
      '/api/v1/studentcourse': {
        target: process.env.VUE_APP_COURSE_ACHIEVEMENT_API_HOST,
        changeOrigin: true,
      },
      
      '/api/v1/assessment': {
        target: process.env.VUE_APP_ASSESSMENT_API_HOST,
        changeOrigin: true,
      },
      '/api/v1/graduate': {
        target: process.env.VUE_APP_GRADUATION_API_HOST,
        changeOrigin: true,
      },
    }
  },
  transpileDependencies: ['vuetify'],
  publicPath: '/'
};