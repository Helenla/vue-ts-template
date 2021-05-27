<template>
  <section class="page page-content">
    这里是首页
    <Head :time="now"></Head>
    <button @click="clickBtn">222</button>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Loading, Toast } from "vant";
import Head from "@/components/Head.vue";
import moment from "moment";
import _ from "lodash";
// import { Mutation, State, Getter } from "vuex-class";

@Component({
  components: {
    [Loading.name]: Loading,
    Head
  }
})
export default class Home extends Vue {
  now!: Date | string;

  created() {
    this.now = moment(new Date()).format("YYYY-MM-DD, HH:mm");
  }

  aaa = _.debounce(() => {
    this.now = moment(new Date()).format("YYYY-MM-DD, HH:mm");
    console.log(this.now);
  }, 500);

  clickBtn() {
    this.aaa();
    Toast("测试一下");
  }
}
</script>
<style lang="scss" scoped></style>
