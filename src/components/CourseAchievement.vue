<template>
  
    <tr>
      <td>{{achievement.pen}}</td>
      <td>{{achievement.courseId}}</td>
      <td>{{achievement.finalLetterGrade}}</td>
      <td>{{achievement.finalPercent}}</td>
      <td>{{achievement.interimPercent}}</td>
      <td>{{achievement.interimLetterGrade}}</td>
      <td>{{achievement.courseType}}</td> 
      <td><router-link class="achievement-link" :to="{ name: 'achievement-show', params: { id: achievement.id} }"><button class="btn btn-primary active">EDIT</button></router-link></td>
    </tr>
  
</template>

<script>
export default {
  props: {
    achievement: Object
  }
};
</script>

<style scoped>
.achievement-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.achievement-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.achievement-card > .student {
  margin: 0;
}

.achievement-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
