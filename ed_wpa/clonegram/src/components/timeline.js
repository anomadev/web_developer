import firebase from 'firebase'
import { useReducer } from 'react'
import profile from './profile'

const timeline = () => {
  const d = document, c = console.log,
  dbRef = firebase.database().ref().child('photos')

  const timelineScripts = setInterval(() => {
    if (d.readyState === 'complete') {
      clearInterval(timelineScripts)

      const timelinePhotos = d.querySelector('.timeline-photos')

      function photoTemplate(obj) {
        return `
          <figure class="photo">
            <img class="photo-image" src="${obj.photoURL}"/>
            <figcaption class="photo-author">
              <img src="${obj.avatar}" class="photo-authorAvatar"/>
              <p class="photo-authorName">${obj.displayName}</p>
            </figcaption>
          </figure>
        `
      }

      dbRef.once('value', data => {
        data.forEach(photo => {
          timelinePhotos.insertAdjacentHTML(
            'afterbegin',
            photoTemplate(photo.val())
          )
        })
      })

      dbRef.on('child_added', data => {
        timelinePhotos.insertAdjacentHTML(
          'afterbegin',
          photoTemplate(data.val())
        )
      })
    }
  }, 100)

  return `
    <article class="timeline content-section u-show">
      <aside class="timeline-photos"></aside>
    </article>
  `
}

export default timeline
