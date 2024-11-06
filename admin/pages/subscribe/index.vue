<script setup lang="ts">
import { useRouter } from 'vue-router'
import CustomSearchInput from '~/admin/components/CustomSearchInput.vue'
import CustomTable from '~/admin/components/CustomTable.vue'
import trash from '~/admin/components/icon/trash.vue'
import download from '~/admin/components/icon/download.vue'
import pencil from '~/admin/components/icon/pencil.vue'

const router = useRouter()

const searchForm = reactive({
  keyword: '',
})

const columns = ref([
  { type: 'checkbox' },
  { label: 'Preferred Language', field: 'preferredLanguage', width: 'expand' },
  { label: 'Title/Salutation', field: 'titleSalutation', width: 'expand' },
  { label: 'First Name', field: 'firstName', width: 'expand' },
  { label: 'Last Name', field: 'lastName', width: 'expand' },
  { label: 'Email ', field: 'email', width: 'expand' },
  { label: 'Country ', field: 'country', width: 'expand' },
  { label: 'Registered at', field: 'registeredAt', sortable: true, width: 'expand' },
])

const tableData = ref([
  {
    preferredLanguage: 'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest',
    titleSalutation: 'Mr.',
    firstName: 'Seongyeong',
    lastName: 'Yoon',
    email: 'sky0910love@naver.com',
    country: 'Korea, South',
    registeredAt: '2024-08-22 01:44:11',
  },
  {
    preferredLanguage: 'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest',
    titleSalutation: 'Mr.',
    firstName: 'Seongyeong',
    lastName: 'Yoon',
    email: 'sky0910love@naver.com',
    country: 'Korea, South',
    registeredAt: '2024-08-22 01:44:11',
  },
])

const goToDetail = (mode: string) => {
  router.push({ path: '/admin/subscribe/test', query: { mode } })
}

const checkAll = ref<boolean>(false)
</script>

<template>
  <div class="page wide">
    <div class="table-top">
      <span class="table-count">
        {{ tableData.length }}
      </span>
      <CustomSearchInput v-model="searchForm.keyword" />
    </div>

    <CustomTable :columns="columns" :data="tableData" @click="goToDetail('update')" />

    <div class="table-bottom">
      <el-pagination layout="pager" :total="90" />
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
        <button type="button" class="admin-btn__line has-icon">
          <download />
          <span>CSV</span>
        </button>
        <button type="button" class="admin-btn__primary has-icon" @click="goToDetail('create')">
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
  title: Subscribe
  layout: admin
</route>
