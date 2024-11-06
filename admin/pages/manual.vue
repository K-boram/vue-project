<script setup lang="ts">
import { ref } from 'vue'
import CustomDraggable from '~/components/CustomDraggable.vue'
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
  path: string
}

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
    path: '',
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
    path: '',
  })
}

const changeDraggable = (event: any) => {
  console.log('Draggable changed:', event.moved)
}
</script>

<template>
  <div class="page single-field">
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
            <CustomInput v-model="item.path" label="/en/manual/ 뒤에 붙을 경로" active-label />
          </div>
        </form>
      </template>
    </CustomDraggable>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
meta:
  title: Manual
  layout: admin
</route>
