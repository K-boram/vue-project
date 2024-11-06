<script setup lang="ts">
import dayjs from 'dayjs'
import CustomInput from '../components/CustomInput.vue'

const router = useRouter()

const form = reactive({
  userId: '',
  password: '',
  rememberYn: false,
  email: 'if valid',
})

const isLogin = ref(true)

const changeFormMode = () => {
  isLogin.value = !isLogin.value
}

const handleLogin = () => {
  if (!form.userId.trim() || !form.password)
    return
  const loginUserInfo = {
    userId: form.userId.trim(),
    isAdmin: true,
    expiry: dayjs().add(24, 'hour').valueOf(), // 만료시간 24시간 설정,
  }
  localStorage.setItem('login-user-info', JSON.stringify(loginUserInfo))
  router.push({
    path: '/admin',
  })
}
</script>

<template>
  <div class="page auth">
    <!-- Login -->
    <form v-if="isLogin" class="form">
      <div class="form__field">
        <CustomInput v-model="form.userId" label="User ID" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.password" type="password" label="Password" />
      </div>
      <div class="checkbox">
        <input id="remember" v-model="form.rememberYn" type="checkbox">
        <label for="remember">Remember me</label>
      </div>
      <button type="button" class="admin-btn__primary--lg" @click="handleLogin">
        Login
      </button>
      <button type="button" class="admin-btn__text" @click="changeFormMode">
        Forgot your password?
      </button>
    </form>

    <!-- Find PW -->
    <form v-else class="form">
      <div class="form__field">
        <CustomInput v-model="form.email" label="E-mail" valid-message="Invalid email format." />
      </div>
      <button type="button" class="admin-btn__primary--lg" disabled>
        Reset my password
      </button>
      <button type="button" class="admin-btn__text" @click="changeFormMode">
        Login
      </button>
    </form>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
meta:
  layout: admin
  title: MUWA NISEKO | Luxury Ski-in, Ski-out Hotel in Niseko
</route>
