export function renderData(data) {

     return data.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads }) => 
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
    
  
}