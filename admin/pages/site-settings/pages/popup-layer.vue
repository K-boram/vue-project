<script setup lang="ts">
import { ref } from 'vue'
import CustomDraggable from '~/components/CustomDraggable.vue'
import CustomDropdown from '~/admin/components/CustomDropdown.vue'
import { getUniqueId } from '~/composables/utils'

interface IUploadImage {
  id: string
  url: string
  width: number
  height: number
  fileName: string
}

interface IFormItem {
  id: string
  popupPosition: string
  fontColor: string
  title: string
  content: string
  buttonNm: string
  linkUrl: string
  windowType: string
}

const popupPositionOptions = ref<string[]>(['가득 참', '내용 하단에 배치'])
const fontColorOptions = ref<string[]>(['어두운 글씨', '밝은 글씨'])
const windowTypeOptions = ref<string[]>(['현재 창', '새 창'])

const imageList = ref<IUploadImage[]>([
  {
    id: getUniqueId(),
    url: '',
    width: 0,
    height: 0,
    fileName: '',
  },
])

const formList = ref<IFormItem[]>([
  {
    id: getUniqueId(),
    popupPosition: '가득 참',
    fontColor: '어두운 글씨',
    title: '',
    content: '',
    buttonNm: '',
    linkUrl: '',
    windowType: '현재 창',
  },
])

const uploadImage = (imageInfo: { url: string; width: number; height: number; fileName: string }, image: IUploadImage) => {
  image.url = imageInfo.url
  image.width = imageInfo.width
  image.height = imageInfo.height
  image.fileName = imageInfo.fileName
}

const removeImage = (id: string) => {
  const index = imageList.value.findIndex(item => item.id === id)
  imageList.value.splice(index, 1)
}

const addFormItem = () => {
  formList.value.push({
    id: getUniqueId(),
    popupPosition: '가득 참',
    fontColor: '어두운 글씨',
    title: '',
    content: '',
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
        <!-- Image -->
        <CustomImageUpload
          v-model="item.url"
          :upload-image-width="item.width"
          :upload-image-height="item.height"
          :file-name="item.fileName"
          @upload="uploadImage($event, item)"
          @remove="removeImage(item.id)"
        />
        <!-- Form -->
        <form class="form">
          <div class="form__field">
            <CustomDropdown
              v-model="item.popupPosition"
              :dropdown-options="popupPositionOptions"
            />
          </div>
          <div class="form__field">
            <CustomDropdown
              v-model="item.fontColor"
              :dropdown-options="fontColorOptions"
            />
          </div>
          <div class="form__field">
            <CustomTextarea v-model="item.title" label="제목" active-label />
          </div>
          <div class="form__field">
            <CustomTextarea v-model="item.content" label="내용" active-label />
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
path: /admin/popup-layer
meta:
  title: Pop-up (Layer)
  layout: admin
</route>
