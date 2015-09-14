var skylink = new Skylink();

skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
  var user = 'You';
  if(!isSelf) {
    user = peerInfo.userData.name || peerId;
  }
  addMessage(user + ' joined the room', 'action');
});

skylink.on('peerUpdated', function(peerId, peerInfo, isSelf) {
  if(isSelf) {
    user = peerInfo.userData.name || peerId;
    addMessage('You\'re now known as ' + user, 'action');
  }
});

skylink.on('peerLeft', function(peerId, peerInfo, isSelf) {
  var user = 'You';
  if(!isSelf) {
    user = peerInfo.userData.name || peerId;
  }
  addMessage(user + ' left the room', 'action');
});


skylink.on('incomingMessage', function(message, peerId, peerInfo, isSelf) {
  var user = 'You',
      className = 'you';
  if(!isSelf) {
    user = peerInfo.userData.name || peerId;
    className = 'message';
  }
  addMessage(user + ': ' + message.content, className);

    $("#synctext").text(message.content);
  
});

skylink.init('ad43f82b-3587-4e90-90c6-d8657bf3e2a2'); // Get your own key at developer.temasys.com.sg

function setName() {
  var input = document.getElementById('name');
  skylink.setUserData({
    name: input.value
  });
}

function joinRoom() {
  skylink.joinRoom();
}

function leaveRoom() {
  skylink.leaveRoom();
}

function sendMessage() {
  var input = document.getElementById('message');
  skylink.sendP2PMessage(input.value);
  input.value = '';
  input.select();
}

function addMessage(message, className) {
  var chatbox = document.getElementById('chatbox'),
    div = document.createElement('div');
  div.className = className;
  div.textContent = message;
  chatbox.appendChild(div);
      $("#synctext").text(message.content);
}


/*******jQuery*****/
$(document).ready(function(){
  $(".field").change(function(){
    $(this).css("background-color","#FFFFCC");
  });
});


////listen to the change of the text input!!

    // Firefox, Google Chrome, Opera, Safari, Internet Explorer from version 9
        function OnInput (event) {
            alert ("The new content: " + event.target.value);
        }
    // Internet Explorer
        function OnPropChanged (event) {
            if (event.propertyName.toLowerCase () == "value") {
                alert ("The new content: " + event.srcElement.value);
            }
        }

////listen to the change of the textarea!!
function syncText(event){
  var CursorPositon = getPositionForTextArea(document.getElementById('synctext'));
  skylink.sendP2PMessage(event.target.value);

}




/************ ABOUT how to operate the postion of cursor ********/

//INIT
function getCursorPositionInit(ctrl){
  var startPos = 0;
    if(document.selection) {// IE Support 
      ctrl.focus(); 
      var Sel = document.selection.createRange(); 
      var Sel2 = Sel.duplicate(); 
      Sel2.moveToElementText(ctrl); 
      var startPos = -1; 
      while(Sel2.inRange(Sel)){ 
      Sel2.moveStart('character'); 
      startPos++; 
    } 
    }else if(ctrl.selectionStart || ctrl.selectionStart == '0'){// Firefox support 
      startPos = ctrl.selectionStart; 
    } 
  
  skylink.sendMessage(); 
}


//get the position of the cursor 
//example: getPositionForTextArea(document.getElementById('zhangdanNum') ) 
function getPositionForTextArea(ctrl) { 
  var CaretPos = 0; 
    if(document.selection) {// IE Support 
      ctrl.focus(); 
      var Sel = document.selection.createRange(); 
      var Sel2 = Sel.duplicate(); 
      Sel2.moveToElementText(ctrl); 
      var CaretPos = -1; 
      while(Sel2.inRange(Sel)){ 
      Sel2.moveStart('character'); 
      CaretPos++; 
    } 
    }else if(ctrl.selectionStart || ctrl.selectionStart == '0'){// Firefox support 
      CaretPos = ctrl.selectionStart; 
    } 
  return (CaretPos); 
} 
//set the position of the cursor 
function setCursorPosition(ctrl, pos){ 
  if(ctrl.setSelectionRange){ 
    ctrl.focus(); 
    ctrl.setSelectionRange(pos,pos); 
  } 
  else if (ctrl.createTextRange) { 
    var range = ctrl.createTextRange(); 
    range.collapse(true); 
    range.moveEnd('character', pos); 
    range.moveStart('character', pos); 
    range.select(); 
  } 
} 
//test 
function process( id,targetId ){ 
  var no = document.getElementById(id).value; 
  setCursorPosition(document.getElementById(targetId),no); 
} 

