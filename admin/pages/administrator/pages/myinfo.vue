<script setup lang="ts">
import { useRouter } from 'vue-router'
import CustomInput from '~/admin/components/CustomInput.vue'

const router = useRouter()

const form = reactive({
  name: '',
  userId: '',
  email: '',
})

const goToPage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="page auth">
    <form class="form">
      <div class="form__field">
        <CustomInput v-model="form.name" label="Name" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.userId" label="User ID" disabled />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.email" label="E-mail" />
      </div>
      <button type="button" class="admin-btn__primary--lg">
        Edit
      </button>
      <button type="button" class="admin-btn__text" @click="goToPage('/admin/changepassword')">
        Change password
      </button>
    </form>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
path: /admin/myinfo
meta:
  layout: admin
  title: Member Information
</route>
