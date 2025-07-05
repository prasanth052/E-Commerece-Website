import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {
  currentLat: number = 0;
currentLng: number = 0;
markerPosition: google.maps.LatLngLiteral | undefined;
ngOnInit() {

}
getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLat = position.coords.latitude;
      this.currentLng = position.coords.longitude;
    }, (error) => {
      console.error('Error getting location', error);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

}
