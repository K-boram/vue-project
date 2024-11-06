<script setup lang="ts">
import { ref } from 'vue'
import CustomPopover from '~/admin/components/CustomPopover.vue'
import ellipsis from '~/admin/components/icon/ellipsis.vue'
import th from '~/admin/components/icon/th.vue'
import edit from '~/admin/components/icon/edit.vue'
import clone from '~/admin/components/icon/clone.vue'
import trash from '~/admin/components/icon/trash.vue'
import pencil from '~/admin/components/icon/pencil.vue'
import clock from '~/admin/components/icon/clock.vue'
import globe from '~/admin/components/icon/globe.vue'
import lock from '~/admin/components/icon/lock.vue'
import folder from '~/admin/components/icon/folder.vue'
import arrowLeft from '~/admin/components/icon/arrow-left.vue'
import CustomDialog from '~/components/CustomDialog.vue'
import CustomDraggable from '~/components/CustomDraggable.vue'
import { getUniqueId } from '~/composables/utils'

const popoverItems = [
  { icon: th, label: 'List' },
  { icon: lock, label: 'Change over to Private' },
  { icon: edit, label: 'Edit', class: 'is-edit' },
  { icon: clone, label: 'Duplicate', class: 'hide-border' },
  { icon: trash, label: 'Delete', class: 'hide-border' },
  { icon: pencil, label: 'Post' },
]

const isOpenDialog = ref<boolean>(false)

const openDialog = () => {
  isOpenDialog.value = true
}

interface IFormItem {
  id: string
  titleEn: string
  titleJa: string
  roomNum: string
}

const formList = ref<IFormItem[]>([
  {
    id: getUniqueId(),
    titleEn: '',
    titleJa: '',
    roomNum: '',
  },
])

const addFormItem = () => {
  formList.value.push({
    id: getUniqueId(),
    titleEn: '',
    titleJa: '',
    roomNum: '',
  })
}

const changeDraggable = (event: any) => {
  console.log('Draggable changed:', event.moved)
}
</script>

<template>
  <div class="page view">
    <div class="view__header">
      <CustomPopover :teleported="false" trigger="click" :icon="ellipsis" :popover-items="popoverItems" use-list-border />
      <h2>4 Bedroom Penthouse</h2>
      <ul class="view__info">
        <li>
          <clock />
          <span>2023.07.24 03:51AM</span>
        </li>
        <li>
          <globe />
          <!-- FIXME :: Private 인 경우 <lock/> -->
          <span>Public</span>
        </li>
        <li>
          <router-link to="/admin/accommodation">
            <folder />
            <span>Penthouse</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="view__body">
      <div class="view__img-wrap">
        <div class="view__img">
          <img src="http://_dev.muwaniseko.com/en/admin/accommodation/download/1068/4B%20PH%20%23802%20Villa%28gondola%29%28802%29_01.jpg" alt="">
        </div>
      </div>
      <hr>
      <button type="button" class="admin-btn__primary--lg" @click="openDialog()">
        Manage Types
      </button>
    </div>

    <div class="view__footer">
      <div class="flex items-center space-x-1">
        <button type="button" class="admin-btn__text">
          <arrow-left />
          <span>4 Bedroom Penthouse</span>
        </button>
        <button type="button" class="admin-btn__text">
          <span>4 Bedroom Penthouse</span>
          <arrow-left style="transform: scaleX(-1)" />
        </button>
      </div>
      <button type="button" class="admin-btn__text">
        List
      </button>
    </div>

    <CustomDialog
      v-model="isOpenDialog"
      size="xl"
      hide-footer
      close-on-click-modal
    >
      <template #content>
        <div class="page">
          <button class="btn__add" @click="addFormItem">
            <icon name="add__line--fff" alt="add box" />
          </button>

          <CustomDraggable :list="formList" use-switch @change="changeDraggable">
            <template #content="{ item }">
              <form class="form">
                <div class="form__field">
                  <CustomInput v-model="item.titleEn" label="제목(EN)" />
                </div>
                <div class="form__field">
                  <CustomInput v-model="item.titleJa" label="제목(JA)" />
                </div>
                <div class="form__field">
                  <CustomInput v-model="item.roomNum" label="Sabre Room NO." />
                </div>
              </form>
            </template>
          </CustomDraggable>
        </div>
      </template>
    </CustomDialog>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
meta:
  title: Accommodation
  layout: admin
</route>
