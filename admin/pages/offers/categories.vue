<script setup lang="ts">
import { ref } from 'vue'
import CustomDraggable from '~/components/CustomDraggable.vue'
import { getUniqueId } from '~/composables/utils'

interface IFormItem {
  id: string
  categoryEn: string
  categoryJa: string
}

const formList = ref<IFormItem[]>([
  {
    id: getUniqueId(),
    categoryEn: '',
    categoryJa: '',
  },
])

const addFormItem = () => {
  formList.value.push({
    id: getUniqueId(),
    categoryEn: '',
    categoryJa: '',
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
            <CustomInput v-model="item.categoryEn" label="분류(EN)" active-label />
          </div>
          <div class="form__field">
            <CustomInput v-model="item.categoryJa" label="분류(JA)" active-label />
          </div>
        </form>
      </template>
    </CustomDraggable>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
meta:
  title: Accommodation
  layout: admin
</route>
