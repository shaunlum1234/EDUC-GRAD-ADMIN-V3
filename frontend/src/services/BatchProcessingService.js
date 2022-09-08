import ApiService from '../common/apiService';

export default {
  getDashboardInfo() {
    return ApiService.apiAxios.get('/api/v1/batch/dashboard');
  },
  runREGALG(request) {
    return ApiService.apiAxios.post('/api/v1/batch/specialrun', request);
  },
  runTVRRUN(request) {
    return ApiService.apiAxios.post('/api/v1/batch/tvrspecialrun', request);
  },
  runDISTRUN(request,credentialType) {
    if(credentialType == "OT"){
      return ApiService.apiAxios.post('/api/v1/batch/userrequestdisrun/OT', request);
    }else if(credentialType == "OC"){
      return ApiService.apiAxios.post('/api/v1/batch/userrequestdisrun/OC', request);
    }else if(credentialType == "RC"){
      return ApiService.apiAxios.post('/api/v1/batch/userrequestdisrun/RC', request);
    }else if(credentialType == "Blank transcript print"){
      return ApiService.apiAxios.post('/api/v1/batch/userrequestblankdisrun/OT', request);
    }else if(credentialType == "Blank certificate print"){
      return ApiService.apiAxios.post('/api/v1/batch/userrequestblankdisrun/OC', request);
    }
  },     
  runDISTRUNYearEnd(){
    return ApiService.apiAxios.get('/api/v1/batch/executeyearlydisrunbatchjob');
  },
  runBlankDistRunUserRequest(request, credentialType){
    return ApiService.apiAxios.post('/api/v1/batch/userrequestblankdisrun/'+ credentialType, request);
  },
  runPSIRUN(request, transmissionType){
    return ApiService.apiAxios.post('/api/v1/batch/executepsireportbatchjob/' + transmissionType, request);
  },
  getBatchErrors(id, page) {
    return ApiService.apiAxios.get('/api/v1/batch/dashboard/errors/'  + id + '?pageNumber=' + page);
  },
  getBatchSummary() {
    return ApiService.apiAxios.get('/api/v1/batch/dashboard/summary');
  },    
  getScheduledBatchJobs() {
    return ApiService.apiAxios.get('/api/v1/batch/schedule/listjobs');
  },
  addScheduledJob(scheduledJob) {
    return ApiService.apiAxios.post('/api/v1/batch/schedule/add', scheduledJob);
  },
  removeScheduledJobs(id) {
    return ApiService.apiAxios.delete('/api/v1/batch/schedule/remove/' + id);
  },
  batchProcessingRoutines() {
    return ApiService.apiAxios.get('/api/v1/batch/processing/all/');
  },
  batchProcessingToggleRoutine(jobType, processingId){
    return ApiService.apiAxios.put('/api/v1/batch/processing/toggle/' + jobType + '?processingId=' + processingId);
  },
}