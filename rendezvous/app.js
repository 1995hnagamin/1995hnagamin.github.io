function show_map(latitude, longitude) {
  var canvas = document.getElementById("map_canvas");
  var latlng = new google.maps.LatLng(latitude, longitude);
  var options = {
    zoom: 16,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(canvas, options);
  var marker = new google.maps.Marker({
    position: latlng,
    map: map
  });
}

function watch_position_success(position) {
  var coord = position.coords;
  show_map(coord.latitude, coord.longitude);
};

function watch_position_error(error) {
  alert("ERROR: " + error.message);
}

var options = {
  enableHighAccuracy: false,
  timeout: 5000,
  muximumAge: 0
};

function initialize() {
  var peer = new Peer({key: 'okvv36v2srdon7b9'});
  alert(peer);
  var id = navigator.geolocation.watchPosition(watch_position_success, watch_position_error, options);
};
