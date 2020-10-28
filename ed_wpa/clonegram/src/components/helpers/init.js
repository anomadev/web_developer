import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC8jJh61weNfNK_PtTRmtm7VziVrGvEFLo",
  authDomain: "ecodegram.firebaseapp.com",
  databaseURL: "https://ecodegram.firebaseio.com",
  projectId: "ecodegram",
  storageBucket: "ecodegram.appspot.com",
  messagingSenderId: "176241895184",
  appId: "1:176241895184:web:8e11b9bd91b7d7672e2795"
};

const d = document, w = window, n = navigator, c = console.log

// Initialize Firebase
export const init = () => firebase.initializeApp(firebaseConfig)

export const pwa = () => {
  if ('serviceWorker' in n) {
    w.addEventListener('load', () => {
      n.serviceWorker.register('./sw.js')
        .then(registration => {
          c(registration)
          c('Service Worker registrado con exito!', registration.scope)
        })
        .catch(err => c('Registro de Service Worker fallido!', err))
    })
  }

  // Activando el uso de Notification
  if (w.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(status => {
      c(status)
      let n = new Notification('Titulo', {
        body: 'Notification Message',
        icon: './img/icon_192x192.png'
      })
    })
  }

  // Activar la sincronización en segundo plano
  if ('serviceWorker' in n && 'SyncManager' in w) {
    function registerBGSync () {
      n.serviceWorker.ready.then(registation => {
        return registation.sync.register('github').then(() => c('Background Sync Registered'))
            .catch(err => c('Background Sync Failed', err));
      });
    }

    registerBGSync();
  }
}

export const isOnline = () => {
  const header = d.querySelector('.header'),
    footer = d.querySelector('.footer'),
    metaTagTheme = d.querySelector('meta[name=theme-color]')

  function networkStatus (e) {
    c(e, e.type);
    if (n.onLine) {
      metaTagTheme.setAttribute('content', '#F7DF1E');
      header.classList.remove('header--offline');
    } else {
      metaTagTheme.setAttribute('content', '#666');
      header.classList.add('header--offline');
    }
  }

  d.addEventListener('DOMContentLoaded', e => {
    if (!n.onLine) networkStatus(this);

    w.addEventListener('online', networkStatus);
    w.addEventListener('offline', networkStatus);
  })
}

export const ga = () => {}
