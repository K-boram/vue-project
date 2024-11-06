<script setup lang="ts">
import type { IInputProps } from '~/admin/types/custom-input'

const props = withDefaults(defineProps<IInputProps>(), {
  modelValue: '',
  type: 'text',
  maxLength: '',
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
  (e: 'keyupEnter'): void
  (e: 'focus'): void
}>()
const inputModelValueRef = ref<HTMLInputElement | null>(null)

const isFocused = ref(false)

const getInputType = computed(() => {
  if (props.type === 'text')
    return 'text'

  if (props.type === 'number')
    return 'text'

  if (props.type === 'password')
    return 'password'
})

const getInputValue = (e: Event) => {
  const event = e.target as HTMLInputElement
  let formatValue: string | number = event.value
  if (props.type === 'number')
    formatValue = onlyNumbers(event.value)

  emit('update:modelValue', formatValue)
}

const focusInput = () => {
  inputModelValueRef.value?.focus()
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
</script>

<template>
  <div class="custom-input">
    <input
      ref="inputModelValueRef"
      :value="modelValue"
      :type="getInputType"
      :readonly="props.readonly"
      :disabled="props.disabled"
      :maxlength="props.maxLength"
      :placeholder="props.placeholder"
      class="custom-input__input"
      :class="{ 'is-invalid': validMessage }"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="getInputValue"
      @keyup.enter="() => emit('keyupEnter')"
    >
    <label
      :class="{ 'is-active': modelValue || isFocused || props.activeLabel }"
      :data-error="validMessage"
    >{{ label }}</label>
  </div>
</template>
