<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { ITopic } from '../types'
import edit from '~/admin/components/icon/edit.vue'
import CustomDraggable from '~/components/CustomDraggable.vue'
import { createTopic, getTopic, modifyTopic, removeTopic } from '~/api/admin'

const router = useRouter()

const topicList = ref<ITopic[]>([])
const prevTopic = ref<string | number | undefined>()

const getTopicList = async () => {
  try {
    const res = await getTopic()
    topicList.value = res.data.data.topicList

    // **더미 데이터**
    topicList.value.push({
      activeYn: 'N',
      topicName: 'totopeirpsd',
      interestTopicId: 1,
      managerCount: 2,
      ord: 2,
    })
    // **더미 데이터**
  }
  catch (e) {
    console.error(e)
  }
}
getTopicList()

const addTopic = async () => {
  try {
    await createTopic()
    getTopicList()

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
    const item = event.moved.element as ITopic

    const data = {
      activeYn: item.activeYn,
      interestTopicId: item.interestTopicId,
      topicName: item.topicName,
      ord: event.moved.newIndex + 1,
    }

    await modifyTopic(data)
    // getTopicList()

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

const switchState = async (item: ITopic) => {
  try {
    const data = {
      activeYn: item.activeYn,
      interestTopicId: item.interestTopicId,
      ord: item.ord,
      topicName: item.topicName,
    }

    await modifyTopic(data)
    // getTopicList()

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

const deleteTopic = async (interestTopicId: number) => {
  try {
    await openConfirm({
      content: '정말 제거하시겠습니까?',
      center: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    })

    await removeTopic(interestTopicId)
    getTopicList()

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

const getPrevTopic = (item: ITopic) => {
  prevTopic.value = item.topicName
}

const editTopic = async (item: ITopic) => {
  try {
    if (prevTopic.value === item.topicName)
      return

    const data = {
      activeYn: item.activeYn,
      interestTopicId: item.interestTopicId,
      ord: item.ord,
      topicName: item.topicName,
    }

    await modifyTopic(data)
    // getTopicList()

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

const goToDetail = (item: ITopic) => {
  router.push(`sales-inquiries/${item.interestTopicId}`)
}
</script>

<template>
  <div class="page single-field">
    <button class="btn__add" @click="addTopic">
      <icon name="add__line--fff" alt="add box" />
    </button>

    <CustomDraggable :list="topicList" key-id="interestTopicId" use-switch @change="changeDraggable" @delete="deleteTopic" @switch="switchState">
      <template #content="{ item }">
        <form class="form">
          <div class="form__field">
            <CustomInput v-model="item.topicName" label="Topic" active-label @focus="getPrevTopic(item)" @blur="editTopic(item)" />
          </div>
        </form>
      </template>
      <template #add-footer="{ item }">
        <button type="button" class="draggable__util" @click="goToDetail(item)">
          <edit />
          <span>하위</span>
          <em>{{ item.managerCount }}</em>
        </button>
      </template>
    </CustomDraggable>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
path: /admin/sales-inquiries
meta:
  title: Register Interest
  layout: admin
</route>
