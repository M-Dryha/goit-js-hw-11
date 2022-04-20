
import  * as APIService from './helpers/api';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { lightBox } from './helpers/lightbox';
import { renderData } from './helpers/renderdata';

const form = document.querySelector('.search-form');
const input = document.querySelector('.form-input');
const galleryItem = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');



let page = 1;
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

        if (page === 1) {
    Notify.success(`"Hooray! We found ${data.data.totalHits} images."`)
        }

    loadBtn.classList.remove('is-hidden');
    page += 1;

    galleryItem.insertAdjacentHTML('beforeend',  renderData(data.data.hits));
  
    lightBox();

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