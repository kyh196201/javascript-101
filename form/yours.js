const $dropdown = document.querySelector('.dropdown')
const $toggleBtn = document.querySelector('.dropdown-toggle')
const $menu = document.querySelector('.dropdown-menu')
const $options = $menu.querySelectorAll('.dropdown-option')
const $nextBtn = document.querySelector('.next-button')

$toggleBtn.addEventListener('click', (e) => {
  $menu.classList.toggle('show')

  const isOpen = $menu.classList.contains('show')

  if (isOpen) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

$toggleBtn.addEventListener('focus', (e) => {
  console.log(e)
})

$options.forEach((el) => {
  el.addEventListener('click', selectOption)
  el.addEventListener('blur', blurOption)
})

function handleClickOutside(e) {
  if ($dropdown.contains(e.target)) return false
  closeMenu()
  document.removeEventListener('click', handleClickOutside)
}

function closeMenu() {
  $menu.classList.remove('show')
}

function selectOption(e) {
  const value = this.textContent.trim()
  $toggleBtn.innerText = value
  $toggleBtn.classList.add('selected')
  $nextBtn.removeAttribute('disabled')
  closeMenu()
}

function blurOption(e) {
  //   blur 이벤트에서 e.target은 포커스를 잃어버린 엘리먼트
  //   relatedTarget은 다음으로 포커스를 받을 엘리먼트를 나타낸다.
  //   참고: https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget
  const $relatedTarget = e.relatedTarget

  if ($relatedTarget && $dropdown.contains($relatedTarget)) return false
  closeMenu()
}
