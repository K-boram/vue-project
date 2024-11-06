<script setup lang="ts">
import { useRouter } from 'vue-router'
import CustomInput from '~/admin/components/CustomInput.vue'

const router = useRouter()

const form = reactive({
  currentPw: '',
  newPw: '',
  confirmPw: '',
})

const goToPage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="page auth">
    <form class="form">
      <div class="form__field">
        <CustomInput v-model="form.currentPw" type="password" label="Current Password" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.newPw" type="password" label="New Password" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.confirmPw" type="password" label="Confirm Password" />
      </div>
      <button type="button" class="admin-btn__primary--lg">
        Change Password
      </button>
      <button type="button" class="admin-btn__text" @click="goToPage('/admin/myinfo')">
        My info
      </button>
    </form>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
path: /admin/changePassword
meta:
  layout: admin
  title: Password Change
</route>
