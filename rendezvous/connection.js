var friends = [];

function add_friend(id) {
  friends.push(id);
  alert(id);
}

function listen(peer) {
  peer.on('open', function(id) {
    $("#share").html(window.location.href + "?parent=" + id);
  });
  
  var conn = peer.on('connection', function(conn) {
    add_friend(conn.peer);
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
    add_friend(paren);
  }
}

