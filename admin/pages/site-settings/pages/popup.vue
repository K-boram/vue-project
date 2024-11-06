<script setup lang="ts">
import { ref } from 'vue'
import CustomDraggable from '~/components/CustomDraggable.vue'
import CustomDropdown from '~/admin/components/CustomDropdown.vue'
import { getUniqueId } from '~/composables/utils'

interface IFormItem {
  id: string
  title: string
  summary: string
  buttonNm: string
  linkUrl: string
  windowType: string
}

// FIXME: 공통 코드 호출 NEW_CURRENT_WINDOW_CD
const windowTypeOptions = ref<string[]>(['현재 창', '새 창'])

const formList = ref<IFormItem[]>([
  {
    id: getUniqueId(),
    title: '',
    summary: '',
    buttonNm: '',
    linkUrl: '',
    windowType: '현재 창',
  },
])

const addFormItem = () => {
  formList.value.push({
    id: getUniqueId(),
    title: '',
    summary: '',
    buttonNm: '',
    linkUrl: '',
    windowType: '현재 창',
  })
}

const changeDraggable = (event: any) => {
  console.log('Draggable changed:', event.moved)
}
</script>

<template>
  <div class="page multi-field">
    <button class="btn__add" @click="addFormItem">
      <icon name="add__line--fff" alt="add box" />
    </button>

    <CustomDraggable :list="formList" use-switch @change="changeDraggable">
      <template #content="{ item }">
        <form class="form">
          <div class="form__field">
            <CustomInput v-model="item.title" label="제목" active-label />
          </div>
          <div class="form__field">
            <CustomInput v-model="item.summary" label="요약" active-label />
          </div>
          <div class="form__field">
            <CustomInput v-model="item.buttonNm" label="버튼 명" active-label />
          </div>
          <div class="form__field">
            <CustomInput v-model="item.linkUrl" label="링크 URL" active-label />
          </div>
          <div class="form__field">
            <CustomDropdown
              v-model="item.windowType"
              :dropdown-options="windowTypeOptions"
            />
          </div>
        </form>
      </template>
    </CustomDraggable>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
path: /admin/popup
meta:
  title: Pop-up (Bottom)
  layout: admin
</route>
