<template>
 <div>
     <GraduationPrograms></GraduationPrograms>
 </div>
</template>

<script>
import GraduationPrograms from '@/components/GraduationPrograms';
export default {
  name: "graduationPrograms",
  components: {
   'GraduationPrograms': GraduationPrograms
  },
  data() {
    return {
      show: false,
      opened: [],
      displayMessage: null,
    };
  },
  computed: {

  },
  created() {
    //Load student Data into studentInfo:
  },
  methods: {
  
  },
};
</script>

<style scoped>
.close-record {
  float: right;
}
.tab-loading {
  color: green !important;
}
.profile-name{
  padding-bottom: 10px;
}
</style>
