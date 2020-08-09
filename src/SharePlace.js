import { Modal } from './UI/Modal';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.onLocateUser);
    addressForm.addEventListener('submit', this.onFindAddress);
  }

  onLocateUser() {
    if (!navigator.geolocation) {
      alert(
        'Location features is not supported by your browser - please use a more modern browser or add an address manually,'
      );
      return;
    }

    const modal = new Modal('loading-modal-content', 'Loading location - please wait!');
    modal.show();

    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        modal.hide();
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        console.log(coordinates);
      },
      (error) => {
        modal.hide();
        alert(
          'Could not locate your position - please enter an address manually,'
        );
      }
    );
  }

  onFindAddress() {}
}

const placeFinder = new PlaceFinder();
