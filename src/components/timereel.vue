<template>
  <div>
{{timestamp }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      timestamp: ""

    }
  },
  created() {
                setInterval(this.getNow, 1000);
            },
            methods: {
                getNow: function() {
                    const today = new Date();
                    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    this.timestamp = time;
                }

}
}
</script>

<style>

</style>