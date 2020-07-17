<template>
  <div>
   <img align="center" src="../../build/logo.png" />
  </div>
</template>
<style>
.zanzhutb  tr td:first-child{
  text-align: right;
}
.zanzhutb  tr td:nth-child(2){
  width:80px;
}
</style>
<script>
import apis from "../apis/apis";
export default {
  data() {
    return {
      zanzhu:[]
    }
  },
  methods: {


    getDate(param){
      return this.$common.toDate(param);
    }
  },
  mounted() {
    this.getZanZhu();
  },
  computed:{

  }
};
</script>
