<script setup lang="ts">
import type { IOwner } from './types'
import { createOwner, deleteOwner, getOwner, modifyOwner } from '~/api/admin'

const formList = ref<IOwner[]>([])
const prevEmail = ref<string | number | undefined>()

const getFormList = async () => {
  try {
    const res = await getOwner('owner')
    formList.value = res.data.data.ownerBookingList

    // **더미 데이터**
    formList.value.push({
      activeYn: 'N',
      email: 'jojo@iabacus.co.kr',
      inquiryManagerId: 1,
      module: 'inquiries',
      ord: 2,
    })
    // **더미 데이터**
  }
  catch (e) {
    console.error(e)
  }
}
getFormList()

const addFormItem = async () => {
  try {
    await createOwner()
    getFormList()

    openToast({
      message: '저장되었습니다.',
      type: 'success',
      showClose: false,
    })
  }
  catch (e) {
    console.error(e)
  }
}

const changeDraggable = async (event: any) => {
  try {
    const item = event.moved.element as IOwner

    const data = {
      activeYn: item.activeYn,
      email: item.email,
      inquiryManagerId: item.inquiryManagerId,
      module: item.module,
      ord: event.moved.newIndex + 1,
    }

    await modifyOwner(data)
    // getFormList()

    openToast({
      message: '저장되었습니다.',
      type: 'success',
      showClose: false,
    })
  }
  catch (e) {
    console.error(e)
  }
}

const switchState = async (item: IOwner) => {
  try {
    const data = { ...item }

    await modifyOwner(data)
    // getFormList()

    openToast({
      message: '저장되었습니다.',
      type: 'success',
      showClose: false,
    })
  }
  catch (e) {
    console.error(e)
  }
}

const deleteItem = async (ownerManagerId: number) => {
  try {
    await openConfirm({
      content: '정말 제거하시겠습니까?',
      center: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    })

    await deleteOwner(ownerManagerId)
    getFormList()

    openToast({
      message: '저장되었습니다.',
      type: 'success',
      showClose: false,
    })
  }
  catch (e) {
    console.error(e)
  }
}

const getPrevEmail = (item: IOwner) => {
  prevEmail.value = item.email
}

const editEmail = async (item: IOwner) => {
  try {
    if (prevEmail.value === item.email)
      return

    const data = { ...item }

    await modifyOwner(data)
    // getFormList()

    openToast({
      message: '저장되었습니다.',
      type: 'success',
      showClose: false,
    })
  }
  catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="page single-field">
    <button class="btn__add" @click="addFormItem">
      <icon name="add__line--fff" alt="add box" />
    </button>

    <CustomDraggable :list="formList" use-switch key-id="inquiryManagerId" @change="changeDraggable" @delete="deleteItem" @switch="switchState">
      <template #content="{ item }">
        <form class="form">
          <div class="form__field">
            <CustomInput v-model="item.email" label="Email" active-label @focus="getPrevEmail(item)" @blur="editEmail(item)" />
          </div>
        </form>
      </template>
    </CustomDraggable>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
meta:
  title: Owner Booking
  layout: admin
</route>
