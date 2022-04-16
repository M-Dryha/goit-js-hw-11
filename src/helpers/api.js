
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.post['Content-Type'] ='application/json; charset=utf-8';

 export function fetchData(data) {


    const KEY = '26749427-98c3432f7608211f00519cfab';
    const MAIN_CONFIG = 'image_type=photo&orientation=horizontal&safesearch=true';
    const PAGE_CONFIG = 'per_page=40';
    
 return axios.get(`?key=${KEY}&q=${data}&${MAIN_CONFIG}&${PAGE_CONFIG}`);

}
           



