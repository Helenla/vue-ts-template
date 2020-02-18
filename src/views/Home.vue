<template>
  <section class="home">
    <Head :time="now"></Head>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Loading, Toast } from "vant";
import Head from "@/components/Head.vue";
// import { Mutation, State, Getter } from "vuex-class";

@Component({
  components: {
    [Loading.name]: Loading,
    Head
  }
})
export default class Home extends Vue {
  private now!: string;
  created() {
    Toast("开始");
    this.now = "11 : 59";
  }
}
</script>
