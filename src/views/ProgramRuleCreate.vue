<template>
  <div>
    <h1>Create a program-rule.</h1>
    <form>
      <label>Not finished</label>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["student", "courses", "gradcodes"])
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
