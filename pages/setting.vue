 
    
<template>
  <div class="container">
    <setting/>
  </div>
</template>


<script>
import setting from '../components/Setting.vue'
export default {
  components: {
    setting
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
}
.active-channel {
  font-size: 20px;
  font-weight: bold;
  color:cornflowerblue;
}
</style>
