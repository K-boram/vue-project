<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = withDefaults(defineProps<{
  dropdownOptions: string[]
  modelValue: string
  placeholder?: string
  validMessage?: string
  label?: string
  activeLabel?: boolean
  teleported?: boolean
}>(), {
  teleported: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedOption = ref(props.modelValue)

const selectOption = (option: string) => {
  selectedOption.value = option
  emit('update:modelValue', option)
}
</script>

<template>
  <div class="custom-dropdown">
    <el-select
      v-model="selectedOption"
      :placeholder="placeholder"
      :teleported="teleported"
    >
      <el-option
        v-for="option in dropdownOptions"
        :key="option"
        :label="option"
        :value="option"
        @click="selectOption(option)"
      />
    </el-select>
    <label
      v-if="label"
      :class="{ 'is-active': modelValue || props.activeLabel }"
      :data-error="validMessage"
    >{{ label }}</label>
  </div>
</template>
