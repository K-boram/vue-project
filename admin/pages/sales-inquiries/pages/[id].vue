<script setup lang="ts">
import { ref } from 'vue'
import type { ISalesInquiries } from '../types'
import CustomDraggable from '~/components/CustomDraggable.vue'
import arrowRight from '~/admin/components/icon/arrow-right.vue'
import { createSalesInquiries, deleteSalesInquiries, getSalesInquiries, modifySalesInquiries } from '~/api/admin'

const route = useRoute()

const topicName = ref<string>('')
const formList = ref<ISalesInquiries[]>([])
const prevEmail = ref<string | number | undefined>()

const getFormList = async () => {
  try {
    const inquiryManagerId = route.params.id as string
    const res = await getSalesInquiries(inquiryManagerId)

    topicName.value = res.data.data.topicName
    formList.value = res.data.data.salesInquiryList

    // **더미 데이터**
    formList.value.push({
      inquiryManagerId: 1,
      interestTopicId: 3,
      module: 'sales-inquiries',
      email: 'jdjuwjssdkis7@iabacus.co.kr',
      activeYn: 'Y',
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
    await createSalesInquiries()
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

const deleteItem = async (inquiryManagerId: number) => {
  try {
    await openConfirm({
      content: '정말 제거하시겠습니까?',
      center: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    })

    await deleteSalesInquiries(inquiryManagerId)
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
    const item = event.moved.element as ISalesInquiries
    console.log(item)

    const data = {
      inquiryManagerId: item.inquiryManagerId,
      module: item.module,
      email: item.email,
      activeYn: item.activeYn,
      ord: event.moved.newIndex + 1,
    }

    await modifySalesInquiries(data)
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

const switchState = async (item: ISalesInquiries) => {
  try {
    const data = {
      inquiryManagerId: item.inquiryManagerId,
      module: item.module,
      email: item.email,
      activeYn: item.activeYn,
      ord: item.ord,
    }

    await modifySalesInquiries(data)
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

const getPrevEmail = (item: ISalesInquiries) => {
  prevEmail.value = item.email
}

const editEmail = async (item: ISalesInquiries) => {
  try {
    if (prevEmail.value === item.email)
      return

    const data = {
      inquiryManagerId: item.inquiryManagerId,
      module: item.module,
      email: item.email,
      activeYn: item.activeYn,
      ord: item.ord,
    }

    await modifySalesInquiries(data)
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
    <div class="page__nav">
      <router-link to="/admin/sales-inquiries">
        최상위
      </router-link>
      <arrow-right />
      <span>{{ topicName }}</span>
    </div>

    <button class="btn__add" @click="addFormItem">
      <icon name="add__line--fff" alt="add box" />
    </button>

    <CustomDraggable :list="formList" key-id="inquiryManagerId" use-switch @change="changeDraggable" @delete="deleteItem" @switch="switchState">
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
path: /admin/sales-inquiries/:id
meta:
  title: Register Interest
  layout: admin
</route>
