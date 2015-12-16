var connections = [];

function add_friend(conn) {
  connections.push(conn);
  register_marker(conn.peer, null);
  alert("add " + conn.peer);
}

function notify_current_location(coords) {
  var message = JSON.stringify({
    latitude: coords.latitude,
    longitude: coords.longitude
  });
  
  connections.forEach(function(conn) {
    conn.send(message);
    alert("sent " + message + " to " + conn.peer);
  });
}

function listen(peer) {
  peer.on('open', function(id) {
    $("#share").html(window.location.href + "?parent=" + id);
  });
  
  peer.on('connection', function(conn) {
    alert("listen " + conn.peer);
    add_friend(conn);
  
    conn.on('data', function(data) {
      alert("received " + data);
    })
  });

}

$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null) {
    return null;
  } else{
    return results[1] || 0;
  }
}

function connect_to_parent(peer) {
  var paren = $.urlParam('parent');
  if (paren != null) {
    var conn = peer.connect(paren);
    add_friend(conn);
  }
}
