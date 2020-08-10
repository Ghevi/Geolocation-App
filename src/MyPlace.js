import { Map } from './UI/Map';

// import { GOOGLE_APY_KEY } from './api-key';

class LoadedPlace {
  constructor(coordinates, address) {
    // document.querySelector('script').src += GOOGLE_APY_KEY; 

    new Map(coordinates);
    const headerTitleEl = document.querySelector('header h1');
    headerTitleEl.textContent = address;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
  lat: parseFloat(queryParams.get('lat')),
  lng: +queryParams.get('lng'),
};
const address = queryParams.get('address');

new LoadedPlace(coords, address);
