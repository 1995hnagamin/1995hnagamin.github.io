function initialize() {
  var id = navigator.geolocation.watchPosition(watch_position_success, watch_position_error, options);

  var peer = new Peer({key: 'okvv36v2srdon7b9'}); 
  listen(peer);
  connect_to_parent(peer);
};
