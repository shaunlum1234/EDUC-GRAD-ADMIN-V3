export function loadStudent(student) {
  this.selectedPen = student[0].pen;
  this.selectedId = student[0].studentID;
  this.$router.push({
    path: `/student-profile/${this.selectedId}`,
  });
}
export function showNotification(variant, bodyContent) {
  let title = variant;
  let delay = 30000;
  if (title == "success") {
    title = "success";
    delay = 5000;
  } else if (title == "danger") {
    title = "Error";
  } else if (title == "warning") {
    title = "Warning";
  }
  this.$bvToast.toast(bodyContent, {
    title: title,
    variant: variant,
    solid: true,
    autoHideDelay: delay,
  });
}
