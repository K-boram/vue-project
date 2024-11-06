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

const imageList = ref<IUploadImage[]>([
  {
    id: getUniqueId(),
    url: '',
    width: 1200,
    height: 900,
    fileName: '',
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

const changeDraggable = (event: any) => {
  console.log('>>>', event.moved)
}
</script>

<template>
  <div class="page featuredImage">
    <CustomDraggable :list="imageList" key-id="test" @change="changeDraggable">
      <template #content="{ item }">
        <CustomImageUpload
          v-model="item.url"
          :upload-image-width="item.width"
          :upload-image-height="item.height"
          :file-name="item.fileName"
          @upload="uploadImage($event, item)"
          @remove="removeImage(item.id)"
        />
      </template>
    </CustomDraggable>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
path: /admin/featuredimage
meta:
  title: Website Representative Image
  layout: admin
</route>
