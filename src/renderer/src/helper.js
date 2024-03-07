export function getCoverData(coverPath) {
  const blob = new Blob([coverPath], { type: 'image/jpeg' })
  return URL.createObjectURL(blob)
}
