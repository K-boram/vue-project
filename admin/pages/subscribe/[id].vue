<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ellipsis from '~/admin/components/icon/ellipsis.vue'
import CustomDropdown from '~/admin/components/CustomDropdown.vue'
import check from '~/admin/components/icon/check.vue'
import CustomPopover from '~/admin/components/CustomPopover.vue'
import arrowCircleLeft from '~/admin/components/icon/arrow-circle-left.vue'
import trash from '~/admin/components/icon/trash.vue'
import list from '~/admin/components/icon/list.vue'

const route = useRoute()
const mode = ref(route.query.mode || 'create')

const form = reactive({
  preferredLanguage: 'English',
  title: '',
  firstNm: '',
  lastNm: '',
  email: '',
  country: '',
})

const preferredLanguageOptions = ref<string[]>(['English', 'Japanese'])
const titleOptions = ref<string[]>(['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prefer not to say'])
const countryOptions = ref<string[]>([])

const createPopoverItems = [
  { icon: list, label: 'List' },
]
const updatePopoverItems = [
  { icon: arrowCircleLeft, label: 'List' },
  { icon: trash, label: 'Delete', class: 'is-danger' },
]
</script>

<template>
  <div class="page post">
    <form class="form">
      <div class="form__split">
        <div class="w-1/2">
          <div class="form__field">
            <CustomDropdown
              v-model="form.preferredLanguage"
              :dropdown-options="preferredLanguageOptions"
              label="Preferred Language"
              active-label
            />
          </div>
          <div class="form__field">
            <CustomInput v-model="form.firstNm" label="First Name" active-label />
          </div>
          <div class="form__field">
            <CustomInput v-model="form.email" label="Email" active-label />
          </div>
        </div>
        <div class="w-1/2">
          <div class="form__field">
            <CustomDropdown
              v-model="form.title"
              :dropdown-options="titleOptions"
              label="Title/Salutation"
              active-label
            />
          </div>
          <div class="form__field">
            <CustomInput v-model="form.lastNm" label="Last Name" active-label />
          </div>
          <div class="form__field">
            <CustomDropdown
              v-model="form.country"
              :dropdown-options="countryOptions"
              label="Country"
              active-label
            />
          </div>
        </div>
      </div>
      <div class="form__sticky">
        <button type="button" class="admin-btn__primary--lg has-icon">
          <check />
          <span>Apply</span>
        </button>
        <CustomPopover v-if="mode === 'create'" trigger="click" :icon="ellipsis" :popover-items="createPopoverItems" />
        <CustomPopover v-else trigger="click" :icon="ellipsis" :popover-items="updatePopoverItems" use-list-border />
      </div>
    </form>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
meta:
  title: Subscribe
  layout: admin
</route>
