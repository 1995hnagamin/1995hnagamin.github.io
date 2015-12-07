$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null) {
    return null;
  } else{
    return results[1] || 0;
  }
}

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
  timeout: 10000,
  muximumAge: 0
};

var friends = [];

function add_friend(id) {
  friends.push(id);
}

function initialize_friends() {
  var paren = $.urlParam('parent');
  if (paren != null) {
    add_friend(paren);
  }
}

function initialize() {
  var id = navigator.geolocation.watchPosition(watch_position_success, watch_position_error, options);

  var peer = new Peer({key: 'okvv36v2srdon7b9'}); 
  peer.on('open', function(id) {
    $("#share").html(window.location.href + "?parent=" + id);
  });
  var conn = peer.on('connection', function(conn) {
    add_friend(conn.peer);
  });
};
