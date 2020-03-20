type Str2mask = (target: string, visibleLength: number) => string
const str2mask: Str2mask = (target, visibleLength) => {
  const visibleValue = target.slice(0, visibleLength)
  return visibleValue.padEnd(target.length, "*")
}

export default str2mask
