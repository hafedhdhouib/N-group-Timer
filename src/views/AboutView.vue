<template>
<div class="container">
<timereel></timereel>
  <form class="row g-3 needs-validation" @submit.prevent="add">
  <div class="col-md-4">
    <label for="validationCustom01" class="form-label">temp</label>
    <input type="number" class="form-control" id="validationCustom01" v-model="time" required>

  </div>
 
  <div class="col-md-6">
    <label for="validationCustom03" class="form-label">Activite</label>
    <input type="text" class="form-control" id="validationCustom03" v-model="activite">
   
  </div>
  <div class="col-12">
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>
</div>
</template>

<style>
@import url(../assets/bootstrap.css);
@import url(../assets/bootstrap.min.css);
</style>
<script>
import timereel from '../components/timereel.vue'
  import {database}from '../firebase'
export default{
  components: { timereel },
  data() {
    return {
      time:0,
      activite:''
    }
  },
  methods: {
    add(){
      database.ref("/").set(
        {
          activite:this.activite,
          time:this.time,
          update:Date.now()
        }
      )
    }
  },
}
</script>
