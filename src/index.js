
import  * as APIService from './helpers/api';

import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('.form-input');
const submitButton = document.querySelector('.submit-button');
const galleryItem = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');


let page = 1;
const inputData = input.value;
 
// const totalData = data.data.totalHits;
// const pageSize = 100;
// const test = totalData / pageSize;
loadBtn.classList.add('is-hidden');




form.addEventListener('submit', onShowGalleryItem);
loadBtn.addEventListener('click', loadMore);

let lightbox = new SimpleLightbox('.gallery a',
    {
        captions: true,
        captionsData: 'alt',
        cationDelay: '250ms',
  });


function loadMore(e) {
  e.preventDefault();
  fetch();
  page += 1;
}


function onShowGalleryItem(e) {
    e.preventDefault();

    if (input.value) {
         galleryItem.innerHTML = '';
      fetch();
    }
}

function fetch() {
   APIService.fetchData(input.value, page)
         .then(onRequest)
            .catch(error => {
                 Notify.failure("Ooops, something is getting wrong");
                console.log(error);
            });       
}

function onRequest(data) {

     if (data.data.totalHits === 0) {
         Notify.failure("Sorry, there are no images matching your search query. Please try again.");
         return;
     }
  // if (data.data.totalHits === data.data.hits.length * page) {
  //      Notify.failure("We're sorry, but you've reached the end of search results.");
  //      loadBtn.classList.add('is-hidden');
  //      return;

  // }
  // console.log(data.data.hits.length);
  // console.log(data.data.hits.length * page);
  // console.log(page)

    renderGallery(data);
  // page += 1;
    
}




function renderGallery(data) {
    
    
    const render = data.data.hits
    const galleryData = render.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads }) => 
        `<div class="photo-card">
       <a href='${largeImageURL}' class = "photo-link">
          <img src= '${webformatURL}' alt="${tags} " loading="lazy" class="photo" />
       </a>
        <div class="info">
                <p class="info-item">
                    <b><span>Likes</span> ${likes}</b>
                </p>
                <p class="info-item">
                    <b><span>Views</span> ${views}</b>
                </p>
                 <p class="info-item">
                    <b><span>Comments</span> ${comments}</b>
                </p>
                <p class="info-item">
                    <b><span>Downloads</span> ${downloads}</b>
                </p>
            </div>
           
     </div>
     `).join('');
  
    
    galleryItem.insertAdjacentHTML('beforeend', galleryData);
    // page += 1;
  loadBtn.classList.remove('is-hidden');
 }
 
lightbox.refresh();
//  galleryItem.insertAdjacentHTML('beforeend', renderGallery);




// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.





//   let page = 1;
// loadBtn.classList.add('is-hidden');

// form.addEventListener('submit', onShowGalleryItem);
// loadBtn.addEventListener('click', loadMore);

// function loadMore(e) {
//     e.preventDefault();
   
//   onShowGalleryItem(e);
//       page += 1
    
// }


// function onShowGalleryItem(e) {
//     e.preventDefault();
  
//     const inputData = input.value;
   
//     if (inputData) {
//          galleryItem.innerHTML = '';
//        APIService.fetchData(inputData, page)
//          .then(onRequest)
//             .catch(error => {
//                 // Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//                 console.log(error);
//             });       
//     }
// }

// function onRequest(data) {
//      if (data.data.totalHits === 0) {
//          Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//          return;
//      }
     
//     renderGallery(data);
//       page += 1
    
// }




// function renderGallery(data) {
    
    
//     const render = data.data.hits
//     const galleryData = render.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads }) => 
//         `<div class="photo-card">
//        <a href="${largeImageURL}" class = "photo-link">
//           <img src= '${webformatURL}' alt="${tags} " loading="lazy" class="photo" />
//       </a>
//         <div class="info">
//                 <p class="info-item">
//                     <b><span>Likes</span> ${likes}</b>
//                 </p>
//                 <p class="info-item">
//                     <b><span>Views</span> ${views}</b>
//                 </p>
//                  <p class="info-item">
//                     <b><span>Comments</span> ${comments}</b>
//                 </p>
//                 <p class="info-item">
//                     <b><span>Downloads</span> ${downloads}</b>
//                 </p>
//             </div>
           
//      </div>
//      `).join('');
  
    
//     galleryItem.insertAdjacentHTML('beforeend', galleryData);
//     // page += 1;
//     loadBtn.classList.remove('is-hidden');
    
//  }
 




    
// lightbox.on('show.simplelightbox',  onClick);

// function onClick(event) {
//   event.preventDefault();
  
//   if (event.target.nodeName !== 'IMG') {
//     return;
//   }

//    const modalIMG = event.target.dataset.source;
//   event.target.src = modalIMG ;
  

//   // openModal(modalIMG);


//    lightbox.open();
// }
  

// function openModal(src) {




//  instance = basicLightbox.create(`
//    <img src="${src}" width: 1200/>`,
//     {
//       onShow: instance => {
//         window.addEventListener('keydown', closeModal);
               
//       },
//       onClose: instance => {
//         window.removeEventListener('keydown', closeModal);
 
//       },
//     },
//   );
//   instance.show();

// }




// const closeModal = (event) => {

//    const containerIMG = document.querySelector('.modal');
//   // console.log(event)
  
//   if (event.code === 'Escape')  {
//     instance.close();
//   }
 
// }








































































/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */