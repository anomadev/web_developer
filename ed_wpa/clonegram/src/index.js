import css from './style.scss'
import {ga, init} from './components/helpers/init.js'
import {isAuth} from './components/auth'

init()

const app = `
  <main class="clonegram">
    ${isAuth()}
  </main>
`

document.getElementById('root').innerHTML = app
ga()

