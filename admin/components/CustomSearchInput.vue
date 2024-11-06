<script setup lang="ts">
import type { IInputProps } from '~/admin/types/custom-input'
import Search from '~/admin/components/icon/search.vue'

const props = withDefaults(defineProps<IInputProps>(), {
  modelValue: '',
  type: 'text',
  maxLength: '',
  placeholder: '',
  readonly: false,
  disabled: false,
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
  <div class="custom-search-input">
    <input
      ref="inputModelValueRef"
      :value="modelValue"
      :type="getInputType"
      :readonly="props.readonly"
      :disabled="props.disabled"
      :maxlength="props.maxLength"
      :placeholder="props.placeholder"
      class="custom-search-input__input"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="getInputValue"
      @keyup.enter="() => emit('keyupEnter')"
    >
    <button type="button">
      <Search />
      <span class="hidden">검색</span>
    </button>
  </div>
</template>
