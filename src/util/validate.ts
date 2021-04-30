export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function Validate(input: Validatable) {
  let isValid = true;
  if (input.required) isValid = isValid && !!input.value;
  if (input.minLength != null)
    isValid =
      isValid && input.value.toString().trim().length >= input.minLength;
  if (input.maxLength)
    isValid =
      isValid && input.value.toString().trim().length <= input.maxLength;
  if (input.min != null) isValid = isValid && input.value >= input.min;
  if (input.max != null) isValid = isValid && input.value <= input.max;
  return isValid;
}
