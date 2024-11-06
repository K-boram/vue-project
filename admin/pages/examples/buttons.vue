<script setup lang="ts">
import download from '~/admin/components/icon/download.vue'
import trash from '~/admin/components/icon/trash.vue'
import pencil from '~/admin/components/icon/pencil.vue'
import check from '~/admin/components/icon/check.vue'
</script>

<template>
  <div class="relative overflow-x-auto">
    <div class="mt-5 mb-10">
      <h2 class="text-3xl">
        Buttons
      </h2>
    </div>
    <table>
      <colgroup>
        <col width="300">
        <col width="*">
      </colgroup>
      <tbody>
        <tr>
          <td>
            <mark class="text-md p-2">admin-btn__line</mark>
          </td>
          <td>
            <div class="flex space-x-2">
              <button type="button" class="admin-btn__line">
                CSV
              </button>
              <button type="button" class="admin-btn__line has-icon">
                <download />
                <span>CSV</span>
              </button>
              <button type="button" class="admin-btn__line has-icon" disabled>
                <download />
                <span>CSV</span>
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <mark class="text-md p-2">admin-btn__danger</mark>
          </td>
          <td>
            <div class="flex space-x-2">
              <button type="button" class="admin-btn__danger">
                Delete
              </button>
              <button type="button" class="admin-btn__danger has-icon">
                <trash />
                <span>Delete</span>
              </button>
              <button type="button" class="admin-btn__danger has-icon" disabled>
                <trash />
                <span>Delete</span>
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <mark class="text-md p-2">admin-btn__primary</mark>
          </td>
          <td>
            <div class="flex space-x-2">
              <button type="button" class="admin-btn__primary">
                Post
              </button>
              <button type="button" class="admin-btn__primary has-icon">
                <pencil />
                <span>Post</span>
              </button>
              <button type="button" class="admin-btn__primary has-icon" disabled>
                <pencil />
                <span>Post</span>
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <mark class="text-md p-2">admin-btn__primary--lg</mark>
          </td>
          <td>
            <div class="flex space-x-2">
              <button type="button" class="admin-btn__primary--lg">
                Change Password
              </button>
              <button type="button" class="admin-btn__primary--lg has-icon">
                <check />
                <span>Save</span>
              </button>
              <button type="button" class="admin-btn__primary--lg has-icon" disabled>
                <check />
                <span>Save</span>
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <mark class="text-md p-2">admin-btn__text</mark>
          </td>
          <td>
            <button type="button" class="admin-btn__text">
              My info
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
td {
  padding: 10px 0;
}
</style>

<route lang="yaml">
meta:
  layout: admin
  title: Examples
</route>
