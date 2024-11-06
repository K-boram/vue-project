<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { useMouseInElement, useScroll } from '@vueuse/core'
import CaretUp from '~/admin/components/icon/caret-up.vue'
import CaretDown from '~/admin/components/icon/caret-down.vue'

interface Column {
  type: 'checkbox' | 'text' | 'image'
  label: string
  field: string
  sortable?: boolean
  width?: string
}

const props = defineProps<{
  columns: Column[]
  data: Record<string, any>[]
  rowClass?: (row: Record<string, any>) => string | { [key: string]: boolean }
}>()

const selectAll = ref(false)
const selectedRows = ref<boolean[]>(props.data.map(() => false))
const sortedData = ref([...props.data])
const sortOrder = ref<{ field: string | undefined; direction: 'asc' | 'desc' }>({ field: undefined, direction: 'asc' })

const rowClass = (row: Record<string, any>) => {
  return {
    'is-muted': row.status === 'Private',
  }
}

function toggleSelectAll() {
  selectAll.value = !selectAll.value
  selectedRows.value = sortedData.value.map(() => selectAll.value)
}

function toggleSort(field: string | undefined) {
  if (field === sortOrder.value.field) {
    sortOrder.value.direction = sortOrder.value.direction === 'asc' ? 'desc' : 'asc'
  }
  else {
    sortOrder.value.field = field
    sortOrder.value.direction = 'asc'
  }

  sortedData.value = [...props.data].sort((a, b) => {
    if (sortOrder.value.field) {
      const direction = sortOrder.value.direction === 'asc' ? 1 : -1
      return a[sortOrder.value.field] > b[sortOrder.value.field] ? direction : -direction
    }
    return 0
  })
}

watch(selectedRows, (newValues) => {
  selectAll.value = newValues.every(isSelected => isSelected)
})

watch(() => props.data, (newData) => {
  sortedData.value = [...newData]
  selectedRows.value = newData.map(() => false)
})
const behavior = 'auto'
const target = ref<HTMLElement | null>(null)
const { elementX, isOutside } = useMouseInElement(target)
const { x: scrollX } = useScroll(target, { behavior })

watch(elementX, (newX) => {
  if (!isOutside.value && target.value)
    scrollX.value = newX
})
</script>

<template>
  <div ref="target" class="custom-table">
    <div class="custom-table__inner">
      <table>
        <thead>
          <tr>
            <th
              v-for="(col, index) in columns" :key="`custom-table-header-col${index}`"
              :class="{
                packed: col.width !== 'expand',
                table__checkbox: col.type === 'checkbox',
                table__image: col.type === 'image',
              }"
            >
              <div @click="col.sortable ? toggleSort(col.field) : null">
                <template v-if="col.type === 'checkbox'">
                  <div class="checkbox" @click="toggleSelectAll">
                    <input v-model="selectAll" type="checkbox">
                    <label>
                      <span class="hidden">select all</span>
                    </label>
                  </div>
                </template>
                <template v-else>
                  <span>{{ col.label }}</span>
                  <div v-if="col.sortable" class="table__sort">
                    <CaretUp v-if="sortOrder.direction === 'asc'" />
                    <CaretDown v-else />
                  </div>
                </template>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, rowIndex) in sortedData"
            :key="`custom-table-row${rowIndex}`"
            :class="rowClass(row)"
          >
            <td
              v-for="(col, colIndex) in columns" :key="`custom-table-col${colIndex}`"
              :class="{
                packed: col.width !== 'expand',
                table__checkbox: col.type === 'checkbox',
                table__image: col.type === 'image',
              }"
            >
              <div>
                <template v-if="col.type === 'checkbox'">
                  <div class="checkbox">
                    <input v-model="selectedRows[rowIndex]" type="checkbox">
                    <label>
                      <span class="hidden">select row</span>
                    </label>
                  </div>
                </template>
                <template v-else>
                  <slot :name="col.field" :row="row">
                    {{ row[col.field] }}
                  </slot>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>
