$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null) {
    return null;
  } else{
    return results[1] || 0;
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
