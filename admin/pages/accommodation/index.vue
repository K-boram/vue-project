<script setup lang="ts">
import { useRouter } from 'vue-router'
import CustomPopover from '~/admin/components/CustomPopover.vue'
import folder from '~/admin/components/icon/folder.vue'
import lock from '~/admin/components/icon/lock.vue'
import CustomSearchInput from '~/admin/components/CustomSearchInput.vue'
import CustomTable from '~/admin/components/CustomTable.vue'
import globe from '~/admin/components/icon/globe.vue'
import trash from '~/admin/components/icon/trash.vue'
import pencil from '~/admin/components/icon/pencil.vue'

const router = useRouter()

const categoryItems = [
  { label: 'Category Management' },
  { label: 'All Category' },
  { label: 'Deluxe' },
  { label: 'Suite' },
  { label: 'Penthouse' },
]

const publishSettingItems = [
  { label: 'All statuses' },
  { label: 'Private' },
  { label: 'Public' },
]

const searchForm = reactive({
  keyword: '',
})

const columns = ref([
  { type: 'checkbox' },
  { label: 'Category', field: 'category' },
  { type: 'image', label: '', field: 'image' },
  { label: 'Title', field: 'title', width: 'expand' },
  { label: 'Date', field: 'date' },
  { label: 'Status ', field: 'status' },
])

const tableData = ref([
  {
    category: 'Penthouse',
    image: 'https://d14bb7e1iugt0z.cloudfront.net/en/accommodation/download/1058/King%20Suite%20with%20Onsen%28611%29_03.jpg',
    title: 'Deluxe Rooms',
    date: '2024.10.22',
    status: 'Public',
  },
  {
    category: 'Penthouse',
    image: 'https://d14bb7e1iugt0z.cloudfront.net/en/accommodation/download/1058/King%20Suite%20with%20Onsen%28611%29_03.jpg',
    title: 'Deluxe Rooms',
    date: '2024.10.22',
    status: 'Private',
  },
])

const goToDetail = () => {
  router.push('/admin/accommodation/test')
}

const goToCreate = () => {
  router.push('/admin/accommodation/create')
}

const checkAll = ref<boolean>(false)
</script>

<template>
  <div class="page wide">
    <div class="table-top">
      <div class="table-top__util">
        <el-tooltip placement="top">
          <template #content>
            Category
          </template>
          <CustomPopover trigger="hover" :icon="folder" use-caret :popover-items="categoryItems" />
        </el-tooltip>
        <el-tooltip placement="top">
          <template #content>
            Publish Setting
          </template>
          <CustomPopover trigger="hover" :icon="lock" use-caret :popover-items="publishSettingItems" />
        </el-tooltip>
        <span class="table-count">
          {{ tableData.length }}
        </span>
      </div>
      <CustomSearchInput v-model="searchForm.keyword" />
    </div>

    <CustomTable :columns="columns" :data="tableData" @click="goToDetail()">
      <template #image="{ row }">
        <img :src="row.image" :alt="row.title">
      </template>

      <template #status="{ row }">
        <div class="table__status">
          <globe v-if="row.status === 'Public'" />
          <lock v-if="row.status === 'Private'" />
          <span>{{ row.status }}</span>
        </div>
      </template>
    </CustomTable>

    <div class="!justify-end table-bottom">
      <div class="flex items-center space-x-1">
        <el-tooltip placement="top">
          <template #content>
            Check all
          </template>
          <div class="checkbox">
            <input id="checkAll" v-model="checkAll" type="checkbox">
            <label for="checkAll">
              <span class="hidden">checkAll</span>
            </label>
          </div>
        </el-tooltip>
        <button type="button" class="admin-btn__danger has-icon">
          <trash />
          <span>Delete</span>
        </button>
        <button type="button" class="admin-btn__primary has-icon" @click="goToCreate()">
          <pencil />
          <span>Post</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
meta:
  title: Accommodation
  layout: admin
</route>
