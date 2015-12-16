var markers = {};
var map = null;

function initialize_map(coords) {
  var canvas = document.getElementById("map_canvas");
  var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
  var options = {
    zoom: 16,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(canvas, options);
  register_marker("@me", coords);
}

function register_marker(id, coords) {
  if (coords == null) {
    coords = {latitude: 0, longitude: 0};
  }
  var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
  var marker = new google.maps.Marker({
    position: latlng,
    map: map
  });
  markers[id] = marker;
}

function update_marker(id, coords) {
  var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
  var new_opts = {
    position: latlng
  };
  markers[id].setOptions(new_opts);
}

function watch_position_success(position) {
  var coords = position.coords;
  if (map == null) {
    initialize_map(coords);
  }

  notify_current_location(coords);
  update_marker("@me", coords);
};

function watch_position_error(error) {
  alert("ERROR: " + error.message);
}

var options = {
  enableHighAccuracy: false,
  timeout: 10000,
  muximumAge: 0
};
