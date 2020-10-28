import firebase from 'firebase'
import { signOut } from './auth'
import { clearProgress } from './upload_progress'

const footer = () => {
  const d = document, c = console.log
  const footerScripts = setInterval(() => {
    if (d.readyState === 'complete') {
      clearInterval(footerScripts)

      const nav = d.querySelector('.footer__menu'),
        sections = d.querySelectorAll('.content-section')

      nav.addEventListener('click', e => {
        e.preventDefault()
        window.scrollTo(0, 0)

        if(e.target.parentElement.matches('button')) {
          let btn = e.target.parentElement,
            btnSection = btn.className.split('__')[0]

          // c(btn, btnSection)
          sections.forEach(section => {
            if(section.classList.contains(btnSection)) {
              section.classList.add('u-show', 'u-fadein')
              section.classList.remove('u-hide')
            } else {
              section.classList.add('u-hide')
              section.classList.remove('u-show', 'u-fadein')
            }
          })

          clearProgress()
        }
      })
    }
  }, 100)

  return `
    <footer class="footer u-fixed">
      <nav class="footer__menu">
        <button class="profile__button" title="perfil">
          <i class="fa fa-user"></i>
        </button>

        <button class="uploader__button" title="subir foto">
          <i class="fa fa-picture-o"></i>
        </button>

        <button class="timeline__button" title="home">
          <i class="fa fa-home"></i>
        </button>

        <button class="camera__button" title="cámara">
          <i class="fa fa-camera"></i>
        </button>
      </nav>
      ${ signOut() }
    </footer>
  `
}

export default footer
