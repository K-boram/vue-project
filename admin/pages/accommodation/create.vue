<script setup lang="ts">
import { reactive, ref } from 'vue'
import CustomImageUpload from '~/components/CustomImageUpload.vue'
import globe from '~/admin/components/icon/globe.vue'
import lock from '~/admin/components/icon/lock.vue'
import check from '~/admin/components/icon/check.vue'
import CustomPopover from '~/admin/components/CustomPopover.vue'
import ellipsis from '~/admin/components/icon/ellipsis.vue'
import list from '~/admin/components/icon/list.vue'

interface IUploadImage {
  url: string
  width: number
  height: number
  fileName: string
}

const featuredImage = reactive<IUploadImage>({
  url: '',
  width: 1200,
  height: 900,
  fileName: '',
})

const form = reactive({
  titleEn: '',
  titleJa: '',
  category: '',
  dateTime: '2024-09-19 13:03:25',
  status: 'public',
})

const uploadImage = (imageData: IUploadImage) => {
  featuredImage.url = imageData.url
  featuredImage.width = imageData.width
  featuredImage.height = imageData.height
  featuredImage.fileName = imageData.fileName
}

const removeImage = () => {
  featuredImage.url = ''
  featuredImage.fileName = ''
}

const categoryOptions = ref<string[]>(['Please select.', 'Deluxe', 'Suite', 'Penthouse'])

const popoverItems = [
  { icon: list, label: 'List' },
]
</script>

<template>
  <div class="page post accommodation">
    <form class="form">
      <div class="form__left">
        <div class="form__field">
          <CustomInput v-model="form.titleEn" label="Title (EN)" />
        </div>
        <div class="form__field">
          <CustomInput v-model="form.titleJa" label="Title (JA)" />
        </div>
        <div class="form__field featured-image">
          <label class="is-active">Featured image</label>
          <div
            class="featured-image__img"
            :class="{ 'featured-image__img--nodata': !featuredImage.url }"
          >
            <!-- FIXME :: upload 버튼 툴팁 숨김 처리 필요 -->
            <CustomImageUpload
              v-model="featuredImage.url"
              :upload-image-width="featuredImage.width"
              :upload-image-height="featuredImage.height"
              :file-name="featuredImage.fileName"
              @upload="uploadImage"
              @remove="removeImage"
            />
          </div>
        </div>
      </div>

      <div class="form__sticky">
        <div class="form__field">
          <CustomDropdown
            v-model="form.category"
            :dropdown-options="categoryOptions"
            label="Category"
            active-label
            placeholder="Please select."
          />
        </div>
        <div class="form__field">
          <div class="custom-datetime-picker">
            <label class="is-active">Date</label>
            <CustomDateTimePicker
              v-model="form.dateTime"
              format="YYYY-MM-DD HH:mm:ss"
              :clearable="false"
            />
          </div>
        </div>
        <ul class="form__radio">
          <li>
            <div class="radio">
              <input v-model="form.status" value="public" type="radio">
              <label>
                <globe />
                <span>Public</span>
              </label>
            </div>
          </li>
          <li>
            <div class="radio">
              <input v-model="form.status" value="private" type="radio">
              <label>
                <lock />
                <span>Private</span>
              </label>
            </div>
          </li>
        </ul>
        <hr>
        <div class="flex items-center justify-between w-full">
          <button type="button" class="admin-btn__primary--lg has-icon">
            <check />
            <span>Apply</span>
          </button>
          <CustomPopover trigger="click" :icon="ellipsis" :popover-items="popoverItems" />
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
</style>

<route lang="yaml">
meta:
  title: Accommodation
  layout: admin
</route>
