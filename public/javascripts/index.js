// no undefined input
const inputError = function () {
  const body = document.querySelector('body')
  const input = document.querySelector('.input-group input')

  body.addEventListener('click', () => {
    if (event.target.classList.contains('write')) {
      if (!confirm('想建立一筆新 todo?')) {
        event.preventDefault()
      }
    }
    if (event.target.classList.contains('send')) {
      if (!input.value) {
        alert('尚未輸入 Todo 內容!!')
        event.preventDefault()
      }
    }
  })
}


inputError()

