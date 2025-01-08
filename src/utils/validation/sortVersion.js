export default function (array) {
  return array.sort((a,b) => {
    let i = 0
    const arr1 = a.split('.')
    const arr2 = b.split('.')
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const  s1 = arr1[i]
      const  s2 = arr2[i]
      i++
      if (s1 === undefined || s2 === undefined) {
        return arr1.length - arr2.length
      }
      if (s1 === s2) {
        continue
      }
      return s2 - s1
    }
  })
}