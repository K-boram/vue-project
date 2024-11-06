<script setup lang="ts">
import { ref } from 'vue'
import caretDown from './icon/caret-down.vue'

const props = withDefaults(
  defineProps<{
    trigger?: 'click' | 'hover'
    icon: any
    useCaret?: boolean
    popoverItems: Array<{ icon?: any; label: string; class?: string }>
    useListBorder?: boolean
    teleported?: boolean
  }>(),
  {
    teleported: true,
  },
)

const buttonRef = ref(null)
const isPopoverVisible = ref(false)

function togglePopover() {
  isPopoverVisible.value = !isPopoverVisible.value
}
</script>

<template>
  <div class="custom-popover">
    <button
      ref="buttonRef"
      type="button"
      class="custom-popover__btn"
      :class="{ 'is-active': isPopoverVisible }"
      @click="togglePopover"
    >
      <component :is="icon" />
      <caret-down v-if="useCaret" width="8" />
    </button>
    <el-popover
      :virtual-ref="buttonRef"
      :trigger="props.trigger"
      virtual-triggering
      :popper-class="useListBorder ? 'custom-popover__popper--border' : 'custom-popover__popper'"
      :teleported="props.teleported"
    >
      <slot name="content">
        <ul>
          <li v-for="(item, index) in popoverItems" :key="index" :class="item.class">
            <component :is="item.icon" v-if="item.icon" />
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </slot>
    </el-popover>
  </div>
</template>
