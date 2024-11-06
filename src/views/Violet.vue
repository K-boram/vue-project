<!-- eslint-disable vue/block-lang -->
<template>
  <div class="layout__container">
    <Sidebar />
    <div class="layout__content">
      <Header />
      <div class="contents">
        <!-- <input type="text" class="input" />
        <p class="txt-test">class test</p> -->
        <!-- <Accordian /> -->
        <Button />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
// import Accordian from './Accordian.vue'
import Button from '../components/Button.vue'
export default {
  name: 'LayoutIndex',
  components: {
    Header,
    Sidebar,
    // Accordian,
    Button,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="scss"></style>
