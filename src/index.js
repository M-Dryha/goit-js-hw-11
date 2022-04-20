
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
 
loadBtn.classList.add('is-hidden');

form.addEventListener('submit', onShowGalleryItem);
loadBtn.addEventListener('click', loadMore);



function loadMore(e) {
  e.preventDefault();
  fetch();
  
 
}

function onShowGalleryItem(e) {
    e.preventDefault();

    if (input.value) {
      galleryItem.innerHTML = '';
      page = 1;
      loadBtn.classList.add('is-hidden');
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
 loadBtn.classList.add('is-hidden');
     if (data.data.totalHits === 0) {
         Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        
       return;
     }
  
      if (page > data.data.totalHits / data.data.hits.length) {
        Notify.warning("We're sorry, but you've reached the end of search results.");
        galleryItem.innerHTML = '';
     
      return;
      }
  
  renderGallery(data);

}


function renderGallery(data) {

 const render = data.data.hits;
    
      if (page === 1) {
    Notify.success(`"Hooray! We found ${data.data.totalHits} images."`)
    
  }
   
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
    loadBtn.classList.remove('is-hidden');
    page += 1;
  
  let lightbox = new SimpleLightbox('.gallery a',
    {
        captions: true,
        cationDelay: '250ms',
    });
  
  if (page > 1) {
    lightbox.refresh();
  }

  if (page > 2) {
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  }
  
 }
 











































































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