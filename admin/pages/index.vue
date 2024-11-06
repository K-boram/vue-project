<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const examplesList = reactive([
  {
    name: 'examples/buttons',
  },
  {
    name: 'login',
  },
  {
    name: '(메모) 추후 반응형 작업 필요',
  },
])

const navigateTo = (name) => {
  router.push(`admin/${name}`)
}
</script>

<template>
  <div class="relative overflow-x-auto">
    <div class="mt-5 mb-10">
      <h2 class="text-3xl">
        Page List
      </h2>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" width="100" align="center" class="px-6 py-3">
            No.
          </th>
          <th scope="col" class="px-6 py-3">
            Name
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in examplesList" :key="`examples-list-${index}`" class="hover:bg-gray-50 bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer" @click="navigateTo(item.name)">
          <th scope="row" align="center" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ index + 1 }}
          </th>
          <td class="px-6 py-4">
            {{ item.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">

</style>

<route lang="yaml">
meta:
  layout: admin
  title: MUWA NISEKO | Luxury Ski-in, Ski-out Hotel in Niseko
</route>
