import firebase from 'firebase'
import { progressBar, progressStatus, showProgress, hideProgress } from './upload_progress'
import { errorMsg, successMsg } from './helpers/messages'
import { savePhotoInDB } from './helpers/photos_db'

const camera = () => {
  const d = document, c = console.log, n = navigator
  const cameraScripts = setInterval(() => {
    if (d.readyState === 'complete') {
      clearInterval(cameraScripts)

      const cameraApp = d.querySelector('.camera'),
        video = d.getElementById('camera-stream'),
        photo = d.getElementById('photo'),
        startCameraBtn = d.getElementById('start-camera'),
        output = d.querySelector('.camera').querySelector('.progress-output'),
        controls = d.querySelector('.camera-controls'),
        takePhotoBtn = d.getElementById('take-photo'),
        deletePhotoBtn = d.getElementById('delete-photo'),
        uploadPhotoBtn = d.getElementById('upload-photo'),
        downloadPhotoBtn = d.getElementById('download-photo'),
        canvas = d.getElementById('canvas-snap'),
        context = canvas.getContext('2d')

      let snapshot

      function cameraInit() {
        n.getMedia = n.getUserMedia

        if(!n.getMedia) {
          output.innerHTML = errorMsg('Tu navegador no soporta el uso de la cámara de tu dispositivo', null)
        } else {
          n.getMedia(
            {video: true},
            stream => {
              video.src = window.URL.createObjectURL(stream)
              video.play()
            },
            err => output.innerHTML = errorMsg(`Hubo un error al acceder a la cámara de tu dispositivo: ${err.message}`, err)
          )
        }
      }

      function takeSnapshot() {
        let width = video.videoWidth,
          height = videoHeight

        canvas.width = width
        canvas.height = height

        context.drawImage(video, 0, 0, width, height)
        return canvas.toDataURL('image/png')
      }

      function cameraReset() {
        video.style.display = 'block'
        video.play()

        // Limipiar el snapshot y enlace de descarga
        photo.style.display = 'none'
        photo.setAttribute('src', '')
        downloadPhotoBtn.querySelector('a').href = '#'

        // Deshabilitar botones de eliminar, subir y descargar
        deletePhotoBtn.classList.add('u-disabled')
        uploadPhotoBtn.classList.add('u-disabled')
        downloadPhotoBtn.classList.add('u-disabled')
      }

      cameraInit()
      canvas.style.display = 'none'

      startCameraBtn.addEventListener('click', e => {
        e.preventDefault()
        video.play()
        video.style.display = 'block'
        photo.style.display = 'none'
      })

      takePhotoBtn.addEventListener('click', e => {
        e.preventDefault()

        // Pausamos y ocultamos el video
        video.style.display = 'none'
        video.pause()

        // Mostramos la captura de la camara en una imagen
        snapshot = takeSnapshot()
        photo.style.display = 'block'
        photo.setAttribute('src', snapshot)

        // Asignar la imagen capturada al enlace de descarga
        downloadPhotoBtn.querySelector('a').href = snapshot

        // Habilitar botones de eliminar, subir y descargar
        deletePhotoBtn.classList.remove('u-disabled')
        uploadPhotoBtn.classList.remove('u-disabled')
        downloadPhotoBtn.classList.remove('u-disabled')
      })

      deletePhotoBtn.addEventListener('click', e => {
        e.preventDefault()
        cameraReset()
      })

      uploadPhotoBtn.addEventListener('click', e => {
        e.preventDefault()
        const storageRef = firebase.storage().ref().child('photos'),
          dbRef = firebase.database().ref().child('photos'),
          user = firebase.auth().currentUser

        let photoName = `photo_${Math.floor(Math.random() * 1000000)}`,
          uploadTask = storageRef.child(photoName).putString(snapshot, 'data_url')

        uploadTask.on('state_changed', data => {
          showProgress()
          progressStatus(data)
        }, err => {
          // c(err, err.code, err.message)
          output.innerHTML = errorMsg(`${err.message}`, err)
        }, () => {
          storageRef.child(photoName).getDownloadURL()
            .then(url => {
              // c(url)
              output.innerHTML = successMsg('Tu foto se ha guardado')
              savePhotoInDB(url, user)
              hideProgress()
              setTimeout(() => output.innerHTML = '', 3000)
              cameraReset()
            })
            .catch(err => output.innerHTML = errorMsg(`${err.message}`,err))
        })
      })
    }
  }, 100)

  return `
    <article id="camera-app" class="camera content-section u-hide">
      <video muted id="camera-stream" class="camera-video"></video>
      <img id="photo" class="camera-photo"/>
      <nav class="camera__menu">
        <button id="start-camera" title="Iniciar Camara">
          <i class="fa fa-power-off"></i>
        </button>
        <button id="take-photo" title="Tomar Foto">
          <i class="fa fa-camera"></i>
        </button>
        <button class="u-disabled" id="delete-photo" title="Borrar Foto">
          <i class="fa fa-trash"></i>
        </button>
        <button class="u-disabled" id="upload-photo" title="Subir Foto">
          <i class="fa fa-upload"></i>
        </button>
        <button class="u-disabled" id="download-photo" title="Guardar Foto">
          <a href="#" download="selfie_${Math.floor(Math.random()*10000000)}.png">
            <i class="fa fa-download"></i>
          </a>
        </button>
      </nav>
      <canvas id="canvas-snap"></canvas>
      ${progressBar()}
    </article>
  `
}

export default camera
