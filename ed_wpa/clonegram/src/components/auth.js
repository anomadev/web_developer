import firebase from 'firebase'
import app from './app'
import {isOnline, pwa} from './helpers/init'

const d = document, c= console.log

const githubSignIn = () => {
  const provider = new firebase.auth.GithubAuthProvider()
  firebase.auth().signInWithPopup(provider)
    .then(result => c(`${result.user.email} ha iniciado secion con GitHub`, result))
    .catch(err => c(`Error! ${err.code}:${err.message}`))
}

const githubSignOut = () => {
  firebase.auth().signOut()
    .then(() => c('Te has desconectado correctamente de GitHub'))
    .catch(() => c('Ocurrio un error al deconectarte de GitHub'))
}

const signIn = () => {
  d.addEventListener('click', e => {
    if (e.target.matches('.sign__button'))
      githubSignIn()
  })

  return `
    <div class="sign">
      <h1 class="sign__title">Clonegram</h1>
      <button class="sign__button">
        Entra con <i class="fa fa-github"></i>
      </button>
    </div>
  `
}

export const signOut = () => {
  d.addEventListener('click', e => {
    if (e.target.matches('.logout'))
      githubSignOut()
  })

  return `
    <button class="logout" title="Salir">
      <i class="logout fa fa-sign-out"></i>
    </button>
  `
}

export const isAuth = () => {
  firebase.auth().onAuthStateChanged(user => {
    const clonegram = d.querySelector('.clonegram')
    //c(user)

    if(user) {
      clonegram.innetHTML = app()
      clonegram.classList.add('u-jc-flex-start')
      //c('Usuario autenticado')

      pwa()
    } else {
      clonegram.innerHTML = signIn()
      clonegram.classList.remove('u-jc-flex-start')
      //c('Usuario no autenticado')
    }

    isOnline()
  })
}
