export interface IInputProps {
  modelValue: string | number | undefined
  type?: 'text' | 'number' | 'password'
  maxLength?: string
  placeholder?: string
  validMessage?: string
  readonly?: boolean
  disabled?: boolean
  label?: string
  activeLabel?: boolean
}
