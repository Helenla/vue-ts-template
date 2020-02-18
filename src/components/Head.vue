<template>
  <section class="Head">{{ time }}</section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Head extends Vue {
  @Prop() private time!: string;
}
</script>
<style lang="scss" scoped>
.Head {
  width: 100%;
  height: 100px;
  line-height: 100px;
}
</style>
