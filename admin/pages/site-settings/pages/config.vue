<script setup lang="ts">
import CustomInput from '~/admin/components/CustomInput.vue'
import CustomTextarea from '~/admin/components/CustomTextarea.vue'
import check from '~/admin/components/icon/check.vue'

// import { getConfigDetail } from '~/api/admin'

interface SiteForm {
  siteTitle: string
  siteDesc: string
  ownerPw: string
  googleAnalyId: string
  googleTagId: string
  metaPixelId: string
  naverAnalyId: string
  emailAddress: string
  instaAddress: string
  facebookAddress: string
  htmlMeta: string
}

const form = ref<SiteForm>({
  siteTitle: '',
  siteDesc: '',
  ownerPw: '',
  googleAnalyId: '',
  googleTagId: '',
  metaPixelId: '',
  naverAnalyId: '',
  emailAddress: '',
  instaAddress: '',
  facebookAddress: '',
  htmlMeta: '',
})

const fetchGetConfigDetail = async () => {
  try {
    // const res = await getConfigDetail()
    setTimeout(() => {
      const result = {
        siteTitle: 'MUWA NISEKO | Luxury Ski-in, Ski-out Resort in Niseko',
        siteDesc: 'A uniquely luxurious investment opportunity with direct access to the famed Niseko Grand Hirafu ski fields via private lift.',
        ownerPw: 'muwaowner',
        googleAnalyId: 'G-QZ0393NKDG',
        googleTagId: 'GTM-K927JWQ7',
        metaPixelId: '',
        naverAnalyId: '',
        emailAddress: 'contact_niseko@muwa.com',
        instaAddress: 'https://www.instagram.com/muwaniseko/',
        facebookAddress: '',
        htmlMeta: '',
      }

      Object.keys(result).forEach((key) => {
        form.value[key] = result[key]
      })
    }, 3000)
    console.log('>>>', form.value)
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchGetConfigDetail()
})
</script>

<template>
  <div class="page config">
    <form class="form">
      <div class="form__field">
        <CustomInput v-model="form.siteTitle" label="사이트 제목 (Japanese)" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.siteDesc" label="사이트 설명 (Japanese)" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.ownerPw" label="Owner 비밀번호" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.googleAnalyId" label="Google Analytics 측정 ID" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.googleTagId" label="Google Tag Manager ID" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.metaPixelId" label="Meta Pixel ID" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.naverAnalyId" label="Naver Analytics 발급 ID" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.emailAddress" label="이메일 주소" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.instaAddress" label="인스타그램 주소" />
      </div>
      <div class="form__field">
        <CustomInput v-model="form.facebookAddress" label="페이스북 주소" />
      </div>
      <div class="form__field">
        <CustomTextarea v-model="form.htmlMeta" label="HTML Meta Tags" />
      </div>
      <button type="button" class="admin-btn__primary--lg has-icon">
        <check />
        <span>Save</span>
      </button>
    </form>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
path: /admin/config
meta:
  title: General
  layout: admin
</route>
