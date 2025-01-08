export default function (text) {
  let textArea = document.createElement('textarea')
  textArea.innerHTML = text
  return textArea.value
}
