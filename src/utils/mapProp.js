export function mapProp(mapedProp, keys) {
  const computedMethods = {}
  keys.forEach(
    (paramName) => (computedMethods[paramName] = (instance) => instance[mapedProp][paramName])
  )
  return computedMethods
}
