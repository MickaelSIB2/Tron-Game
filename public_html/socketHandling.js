/*
 * In this file, you can call every methods you have 
 * defined in script.js
 */

var c = document.querySelector("#myCanvas");
var allPlayers = {};
var idJoueur; 

//jouer.addEventListener("click", send, true);

 

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
      
      allPlayers = msg.players;
      var id;

	idJoueur = msg.playerID;

	console.log(JSON.stringify(msg));
	
      var direction = "ard";

	ajouterMONJoueur(
            idJoueur, 
            msg.players[msg.playerID].x, 
            msg.players[msg.playerID].y, 
            direction);
            
            
  for(pID in allPlayers){
      if(pID != msg.playerID){
        ajouterAutreJoueur(
			  pID, 
			  msg.players[pID].x, 
			  msg.players[pID].y, 
        direction,
			  msg.players[pID].pseudo);
      }
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
      // console.log(idjoueur);
      // console.log(msg.player.id)

      if(idJoueur != msg.player.id){
        ajouterAutreJoueur(msg.player.id, msg.player.x, msg.player.y, "cle", msg.player.pseudo);
      }
	  
      
      break;
    case 3:
      // WHEN A PLAYER DIES
      // IT COULD BE ME (I guess)
      //
      // Stuff like its number or color or ID
      // or whatever identifies it on the client.
      
      j[id].laMuerta();
	  setTimeout(function(){
	  j[id] = null;}, 1500);
      
      break;
    case 4:
      // WHEN A PLAYER DISCONNECTS
      // IT CAN'T BE ME
      //
      // Should be the same thing than when a player dies
      // But I'm not sure we should do the same thing
      // In both cases.
      
      j[id]=null;
      break;
      
    case 5:
      // WHEN A PLAYER CHANGE ITS DIRECTION
      // INCLUDING ME
      //
      // Should be the dead player color/ID/position
      // (whatever identifies it for the client)
      // and the new direction
      
       // switch (msg.key){
         // case 37:
             // j[id].direction = "cl?";
             // break;
         // case 39:
             // j[id].direction = "deis";
             // break;
         // case 38:
             // j[id].direction = "ard";
             // break;
         // case 40:
             // j[id].direction = "bun";
             // break;
       // }
      // break;
  }
}
