<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { IInputProps } from '~/admin/types/custom-input'

const props = withDefaults(defineProps<IInputProps>(), {
  modelValue: '',
  maxLength: undefined,
  placeholder: '',
  validMessage: '',
  readonly: false,
  disabled: false,
  label: '',
  activeLabel: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | undefined): void
  (e: 'blur'): void
  (e: 'focus'): void
}>()

const textareaModelValueRef = ref<HTMLTextAreaElement | null>(null)

const isFocused = ref(false)

const resizeTextarea = () => {
  if (textareaModelValueRef.value) {
    textareaModelValueRef.value.style.height = 'auto'
    textareaModelValueRef.value.style.height = `${textareaModelValueRef.value.scrollHeight}px`
  }
}

const getInputValue = (e: Event) => {
  const event = e.target as HTMLTextAreaElement
  let formatValue: string | number = event.value
  if (props.type === 'number')
    formatValue = onlyNumbers(event.value)

  resizeTextarea()
  emit('update:modelValue', formatValue)
}

const focusInput = () => {
  textareaModelValueRef.value?.focus()
}

const handleFocus = () => {
  isFocused.value = true
  emit('focus')
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}

defineExpose({
  focusInput,
})

onMounted(() => {
  resizeTextarea()
})
</script>

<template>
  <div class="custom-textarea">
    <textarea
      ref="textareaModelValueRef"
      :value="modelValue"
      :readonly="props.readonly"
      :disabled="props.disabled"
      :maxlength="props.maxLength"
      :placeholder="props.placeholder"
      class="custom-textarea__input"
      :class="{ 'is-invalid': validMessage }"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="getInputValue"
    />
    <label
      :class="{ 'is-active': modelValue || isFocused || props.activeLabel }"
      :data-error="validMessage"
    >{{ label }}</label>
  </div>
</template>
