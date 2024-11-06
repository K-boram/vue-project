<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const languageStore = useLanguageStore()
const route = useRoute()

const currentAdminMenu = ref('')
const currentUtilMenu = ref('')

// TODO: API 연결 후 수정 예정
const getMainTitleLang = computed(() => {
  return languageStore.language === 'en' ? 'English' : 'Japanese'
})
const getSubTitleLang = computed(() => {
  return languageStore.language === 'en' ? 'Japanese' : 'English'
})

const adminMenuList = ref([
  {
    id: 1,
    title: 'Site Settings(한빈)',
    childMenuList: [
      { id: '1-1', title: 'General', path: 'admin/config' },
      { id: '1-2', title: 'Website Representative Image', path: 'admin/featuredImage' },
      { id: '1-3', title: 'Pop-up (Bottom)', path: 'admin/popup' },
      { id: '1-4', title: 'Pop-up (Layer)', path: 'admin/popup-layer' },
      { id: '1-5', title: 'Terms and Conditions(new)', path: 'admin/terms-conditions' },
    ],
  },
  {
    id: 2,
    title: 'Accommodation(준희)',
    path: 'admin/accommodation',
  },
  {
    id: 3,
    title: 'Seasonal Activities(한빈)',
    path: 'admin/seasonal-activities',
  },
  {
    id: 4,
    title: 'Offers(준희)',
    path: 'admin/offers',
  },
  {
    id: 5,
    title: 'Dinning(한빈 NEW)',
    childMenuList: [
      { id: '5-1', title: 'Overview', path: 'admin/overview' },
      { id: '5-2', title: 'Contents', path: 'admin/contents' },
    ],
  },
  {
    id: 5,
    title: 'Gallery(한빈)',
    path: 'admin/gallery',
  },
  {
    id: 6,
    title: 'Subscribe(준희)',
    path: 'admin/subscribe',
  },
  {
    id: 7,
    title: 'Inquiries(준희)',
    childMenuList: [
      { id: '7-1', title: 'Setting', path: 'admin/inquiries' },
      { id: '7-2', title: 'Inquiries Detail', path: 'admin/inquiries-detail' },
    ],
  },
  {
    id: 8,
    title: 'Register Interest(준희)',
    childMenuList: [
      { id: '7-1', title: 'Setting', path: 'admin/sales-inquiries' },
      { id: '7-2', title: 'Interest Detail', path: 'admin/interest-detail' },
    ],
  },
  {
    id: 9,
    title: 'Careers(준희)',
    childMenuList: [
      { id: '9-1', title: 'Full Time', path: 'admin/full-time' },
      { id: '9-2', title: 'Seasonal Job', path: 'admin/seasonal-job' },
    ],
  },
  {
    id: 10,
    title: 'Manual(준희)',
    path: 'admin/manual',
  },
  {
    id: 11,
    title: 'Owner Booking(준희)',
    path: 'admin/owner',
  },
  {
    id: 12,
    title: 'Web Log Analysis',
    path: '/',
    childMenuList: [
      { id: '12-1', title: 'Google Analytics', path: 'https://analytics.google.com/' },
      { id: '12-2', title: 'Naver Analytics', path: 'http://analytics.naver.com/' },
    ],
  },
])
const adminUtilMenuList = ref([
  {
    id: 1,
    title: 'Administrator(한빈)',
    path: '/',
    childMenuList: [
      { id: '1-1', title: 'Member Information(삭제예정)', path: 'admin/myinfo', hasFunction: false },
      { id: '1-2', title: 'Member List(NEW)', path: 'admin/member-list', hasFunction: false },
      { id: '1-3', title: 'Password Change(삭제예정)', path: 'admin/changePassword', hasFunction: false },
      // TODO: 수정예정
      { id: '1-4', title: 'Logout', hasFunction: true, path: 'logout', type: 'logout' },
    ],
  },
  // TODO: 동적으로 바뀔예정
  {
    id: 2,
    title: getMainTitleLang,
    path: '/',
    childMenuList: [
      { id: '2-1', title: getSubTitleLang, hasFunction: true, path: 'changeLang', type: 'changeLanguage' },
    ],
  },
])

const ensureAbsolutePath = (path: string) => {
  return path.startsWith('/') ? path : `/${path}`
}

const isMenuActive = (path: string) => {
  return ensureAbsolutePath(path) === route.path
}

const fetchFunction = (type: string) => {
  switch (type) {
    case 'logout':
      console.log('로그아웃 로직', type)
      return
    case 'changeLanguage':
      languageStore.setLanguage(languageStore.language === 'en' ? 'ja' : 'en')
  }
}
</script>

<template>
  <!-- FIXME :: 최하단 언어 설정 메뉴 depth 전환 작업 필요 -->
  <aside class="admin-sidebar is-fixed">
    <div class="admin-sidebar__scroll-wrap">
      <div class="admin-sidebar__scroll-area">
        <div class="admin-sidebar__inner">
          <h1 class="logo">
            <router-link to="/">
              <em>MUWA NISEKO | Luxury Ski-in, Ski-out Hotel in Niseko</em>
              <small>
                Discover new luxury ski-in ski-out resort located in the heart of Niseko Grand Hirafu Resort - All seasons wellness retreat with infinity onsen, spa and gourmet dining.
              </small>
            </router-link>
          </h1>
          <nav class="admin-sidebar__nav">
            <div
              v-for="item in adminMenuList"
              :key="`admin-menu-${item.id}`"
              class="admin-sidebar__nav-item"
            >
              <!-- 2depth menu -->
              <el-collapse v-if="item.childMenuList" v-model="currentAdminMenu" accordion>
                <!-- is analysis menu -->
                <el-collapse-item v-if="item.id === 12" :title="item.title" :name="item.id">
                  <div
                    v-for="subItem in item.childMenuList"
                    :key="`admin-childmenu-${subItem.id}`"
                    class="el-collapse-item__header is-child"
                  >
                    <a :href="subItem.path" target="_blank">
                      {{ subItem.title }}
                    </a>
                  </div>
                </el-collapse-item>
                <!-- is other menu -->
                <el-collapse-item v-else :title="item.title" :name="item.id">
                  <div
                    v-for="subItem in item.childMenuList"
                    :key="`admin-childmenu-${subItem.id}`"
                    class="el-collapse-item__header is-child"
                    :class="{ 'is-selected': isMenuActive(subItem.path) }"
                  >
                    <router-link :to="ensureAbsolutePath(subItem.path)">
                      {{ subItem.title }}
                    </router-link>
                  </div>
                </el-collapse-item>
              </el-collapse>
              <!-- 1depth menu -->
              <div v-else class="el-collapse-item__header" :class="{ 'is-selected': isMenuActive(item.path) }">
                <router-link :to="ensureAbsolutePath(item.path)">
                  {{ item.title }}
                </router-link>
              </div>
            </div>
            <!-- util menu -->
            <el-collapse v-model="currentUtilMenu" class="admin-sidebar__nav-item is-util" accordion>
              <el-collapse-item v-for="util in adminUtilMenuList" :key="`admin-util-menu-${util.id}`" :name="util.id" :class="util.id === 1 ? 'is-admin' : 'is-lang'">
                <template #title>
                  <div class="admin-sidebar__nav-icon" />
                  <span>
                    {{ util.title }}
                  </span>
                </template>
                <div
                  v-for="subItem in util.childMenuList"
                  :key="`admin-childmenu-${subItem.id}`"
                  class="el-collapse-item__header is-child"
                  :class="{ 'is-selected': isMenuActive(subItem.path) }"
                >
                  <router-link
                    v-if="!subItem.hasFunction"
                    :to="ensureAbsolutePath(subItem.path)"
                  >
                    {{ subItem.title }}
                  </router-link>
                  <div v-else @click="fetchFunction(subItem.type)">
                    {{ subItem.title }}
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </nav>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>

</style>
