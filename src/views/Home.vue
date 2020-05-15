<template>
  <section class="home">
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
  private now!: Date | string;
  created() {
    this.now = moment(new Date()).format("YYYY-MM-DD, HH:MM");
    console.log(_);
  }
  aaa = _.debounce(function() {
    console.log(1);
  }, 500);
  clickBtn() {
    this.aaa();
    console.log("测试一下");
  }
}
</script>
