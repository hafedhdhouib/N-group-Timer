<template>
  <div>
{{a}}
  </div>
</template>

<script>
import moment from 'moment'
export default {
data() {
    return {
        a:moment(new Date()).format('h:mm:ss')
    }
},
}
</script>

<style>

</style>