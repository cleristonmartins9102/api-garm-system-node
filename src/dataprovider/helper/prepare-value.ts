export const prepare = (value: number | string): string | number => {
  switch (typeof value) {
    case 'string':
      value = `"${value}"`
      return value

    default:
      return value
  }
}
