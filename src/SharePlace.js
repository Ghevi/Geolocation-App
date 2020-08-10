import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

// import { GOOGLE_APY_KEY } from './api-key';

class PlaceFinder {
  constructor() {
    // document.querySelector('script').src += GOOGLE_APY_KEY;

    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');

    locateUserBtn.addEventListener('click', this.onLocateUser.bind(this));
    this.shareBtn.addEventListener('click', this.onSharePlace);
    addressForm.addEventListener('submit', this.onFindAddress.bind(this));
  }

  onSharePlace() {
    const sharedLinkInputEl = document.getElementById('share-link');

    if (!navigator.clipboard) {
      sharedLinkInputEl.select();
      return;
    }

    navigator.clipboard
      .writeText(sharedLinkInputEl.value)
      .then(() => {
        alert('Copied into cliploard.');
      })
      .catch((error) => {
        console.log(error);
        sharedLinkInputEl.select();
      });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }

    this.shareBtn.disabled = false;
    const sharedLinkInputEl = document.getElementById('share-link');
    sharedLinkInputEl.value = `${location.origin}/my-place?address=${encodeURI(
      address
    )}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
  }

  onLocateUser() {
    if (!navigator.geolocation) {
      alert(
        'Location features is not supported by your browser - please use a more modern browser or add an address manually,'
      );
      return;
    }

    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait!'
    );
    modal.show();

    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        // console.log(coordinates);
        this.selectPlace(coordinates, address);
      },
      (error) => {
        modal.hide();
        alert(
          'Could not locate your position - please enter an address manually,'
        );
      }
    );
  }

  async onFindAddress(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    if (!address || address.trim().length === 0) {
      alert('Invalid address - please enter a valid one.');
      return;
    }

    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait!'
    );
    modal.show();

    // Without async await: getCoordsFromAddress(address).then(...).catch(...);
    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (error) {
      alert(error.message);
    }

    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
