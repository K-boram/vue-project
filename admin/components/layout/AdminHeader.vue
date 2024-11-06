<script setup lang="ts">
const languageStore = useLanguageStore()
const route = useRoute()
</script>

<template>
  <header class="admin-header">
    <div class="admin-header__inner">
      <h1>
        {{ route.meta.title }}
        <small>{{ languageStore.getLangFullName }}</small>
      </h1>
      <!-- <button type="button" data-activates="side-nav" class="nav-trigger button-collapse hide-on-large-only">
        <span><i /></span>
      </button> -->
    </div>
  </header>
</template>

<style lang="scss" scoped>

</style>
