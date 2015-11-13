/*
 * In this file, you can call every methods you have 
 * defined in script.js
 */

var host = location.origin.replace(/^http/, 'ws');
var socket = new WebSocket(host);
var jouer = document.querySelector(".jouer");
jouer.addEventListener("click", send, false);

var send = function(){
	socket.send(JSON.stringify({code: 1}));
}


socket.onmessage = function(e){
  var msg = JSON.parse(e.data);

  // Every piece of data are accessibles via msg.something
  switch (msg.code){
    case 1:
      // WHEN I ENTER THE GAME.
      // I HAVE ALREADY SENT SOMETHING TO THE SERVER WITH CODE 1
      // THIS IS WHAT I DO WITH ITS ANSWER.
      //
      // What's received should be everything about the game.
      //  Stuff like where the lightbikes and walls are.
      // And about this player.
      //  Stuff Like this player ID
      //
      // Access it via msg.playerID 
	
      ajouterJoueur(msg.playerID);
      if(j2==!null){
          j2.dessiner();
      }
      if(j3==!null){
          j3.dessiner();
      }
      if(j4==!null){
          j4.dessiner();
      }
      if(j5==!null){
          j5.dessiner();
      }
      if(j6==!null){
          j6.dessiner();
      }
      
      break;
    case 2:
      // WHEN A NEW PLAYER, WHICH IS NOT ME, ENTERS THE GAME.
      //
      // Should be stuff like : Which color and/or place it 
      // has and where it starts
      // (or just saying that a new player is here could be
      // fine if The client already handles things like
      // colors)
      break;
    case 3:
      // WHEN A PLAYER DIES
      // IT COULD BE ME (I guess)
      //
      // Stuff like its number or color or ID
      // or whatever identifies it on the client.
      break;
    case 4:
      // WHEN A PLAYER DISCONNECTS
      // IT CAN'T BE ME
      //
      // Should be the same thing than when a player dies
      // But I'm not sure we should do the same thing
      // In both cases.
      break;
    case 5:
      // WHEN A PLAYER CHANGE ITS DIRECTION
      // INCLUDING ME
      //
      // Should be the dead player color/ID/position
      // (whatever identifies it for the client)
      // and the new direction
      break;
  }
}
