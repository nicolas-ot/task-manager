export function Autobind(
  target: any,
  name: any,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const decoratedMethod = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      // basically binding the original Method with this (the object)
      return boundFn;
    },
  };
  return decoratedMethod;
}
