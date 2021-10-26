'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoidHJlZWZhbGxkb3duIiwiYSI6ImNrYmlwNWkzaDBmYmgyeWswcTVsa3ZvMmUifQ.K98vl28x9Km5pWBpKL_opQ'


let map = new mapboxgl.Map({
  container: 'map',

  // you may create a new style here: https://studio.mapbox.com/
  style: 'mapbox://styles/mapbox/streets-v10',
  // style: 'mapbox://styles/mapbox/basic-v9',
  // style: 'mapbox://styles/mapbox/outdoors-v10',
  // style: 'mapbox://styles/mapbox/light-v9',
  // style: 'mapbox://styles/mapbox/dark-v9',
  // style: 'mapbox://styles/mapbox/satellite-v9',
  // style: 'mapbox://styles/mapbox/satellite-streets-v10',
  // style: 'mapbox://styles/mapbox/navigation-preview-day-v2',
  // style: 'mapbox://styles/mapbox/navigation-preview-night-v2',
  // style: 'mapbox://styles/mapbox/navigation-guidance-day-v2',
  // style: 'mapbox://styles/mapbox/navigation-guidance-night-v2',
  // style: 'mapbox://styles/brianhouse/cjn0u552b52kr2spdz6yhpqj4',
  center: [-73.96024, 40.80877],
  zoom: 16,
  pitch: 0

  // other options or attributes: https://docs.mapbox.com/mapbox-gl-js/api/map/#map
})


// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
  showCompass: false
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
  maxWidth: 80,
  unit: 'imperial'
})

// add the scale to your map
map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserLocation: true,
  fitBoundsOptions: {
  }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {
  // console.log(event.coords)

  // create new variables to store the attributes we're interested in from the event
  let lng = event.coords.longitude
  let lat = event.coords.latitude

  // debug
  console.log('geolocated:', lng, lat)

  // format lng lat values and display them on our 'info' element
  document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

map.on('click', function(event) {

  let lng = event.lngLat.lng
  let lat = event.lngLat.lat

  console.log("clicked:", lng, lat)

  document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})


let marker = new mapboxgl.Marker()
marker.setLngLat([-73.96007,40.80871])
marker.addTo(map)


let popup = new mapboxgl.Popup()
popup.setHTML('This is the Center for Spatial Research<br /><img src="https://currystonefoundation.org/wp-content/uploads/2018/05/csf_pr_csr_image5.jpg" />')
marker.setPopup(popup)


let data = [
  {
    location: [-73.96191,40.80762],
    content: 'I like to eat my lunch here'
  },
  {
    location: [-73.95936,40.80610],
    content: '15 years ago, you could see over the trees'
  },
  {
    location: [-73.96204,40.80994],
    content: 'This was once tennis courts'
  },
]

data.forEach(function(d) {

  let marker = new mapboxgl.Marker()
  marker.setLngLat(d.location)
  marker.addTo(map)

  let popup = new mapboxgl.Popup()
  popup.setHTML(d.content)
  marker.setPopup(popup)

})
