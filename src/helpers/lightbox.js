
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function lightBox() {

    let lightbox = new SimpleLightbox('.gallery a',
    {
        captions: true,
        cationDelay: '250ms',
    });

}