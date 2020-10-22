<template>
  <div class="home">
  <div class="container"> 
     <form @submit="formSubmit">
      <div class="form-group">
        <label for="StudentPen">PEN:</label>
        <input type="text" class="form-control" id="StudentPen">
      </div>
      <div class="btn-group">
        <button type="submit" class="btn btn-primary" id="find">Find</button>
      </div>
    </form> 
    <br> 
    <div class="card" style="width: 100%;">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
    <br>
    <div class="card" style="width: 100%;">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
    <br>
    <div class="alert alert-success" >
      This is a success alert—check it out!
    </div>
    <div class="alert alert-danger" >
      This is a danger alert—check it out!
    </div>
  </div>  
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
  components: {
  }
}
</script>
<style scoped>
  .alert,.card,.btn-group.btn-group-vertical,.btn-group>.btn{
    position: inherit;
  }
</style>