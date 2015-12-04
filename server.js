var WSServer = require('ws').Server
var express = require('express')
var http = require('http')
var player = require("./player.js").Player
var app = express();
var port = process.env.PORT || 3000 // To work on Heroku
var nbMotos;
var tabID = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false};
// -------------------------------------------------- Create the Server itself

/*
 * First, use express.static middleware to serve statics files defined in HTML
 * <head> (css and js mostly)
 */
app.use(express.static(__dirname + '/public_html'));

/*
 * Create the server itself with http library And make it listen on previously
 * defined port
 */
var server = http.createServer(app);
server.listen(port);

/*
 * Create the WebSocketServer and pass it the http server we previously created.
 * Note, this is binded to the : var host = location.origin.replace(/^http/,
 * 'ws'); code in client, which connects to an identical URL, except for the
 * protocole part.
 */
var wss = new WSServer({server: server});

/*
 * Finally, define how to handle the Websocket. When a message is received. When
 * the connection with the websocket is closed.
 */
wss.on("connection", function(ws){
	
	  ws.on("message", function(data){
	    var msg = JSON.parse(data);
	    var dataToSend;
	  
	    /*
		 * When the websocket receive a message, do something depending of the
		 * "code" the client put into its message.
		 * 
		 * It's sort of a home-made protocol for the game.
		 */
	
	    switch(msg.code){
        // NEW PLAYER
        // WHEN A PLAYER CONNECTS TO THE SERVER
	      case 1:
	    	  var i = 1;
	    	  while (tabID[i]) {//always when player connect tabID + 1 player
	    		  i++;
	    	  }
	    	  
                  if (false/*Object.size(tabID) == 1*/) {	//when one player connects
                          ws.send(JSON.stringify({
                                  code: "alone",
                                  message: "alone"// wait other players
                          }))
                  } else if (false /*Object.size(tabID) > 6*/){//when too much players connect
                          ws.send(JSON.stringify({
                                  code: "wait",
                                  message: "wait"// already 6 players
                          }))
                  } else {//good number of player in canvas
                          nbMotos += 1;
                          tabID[i]= new player({
                            x: 50,
                            y: 50,
                            d: 38,
                            pseudo: msg.pseudo
                          }) ;
                          this.playerID = i;
                          var playersToSend = {}
                          for(id in tabID){
                                if(tabID[id]){
                                      playersToSend[id] = {
                                        x: tabID[id].x, 
                                        y: tabID[id].y, 
                                        d: tabID[id].d,
                                        pseudo: tabID[id].pseudo
                                      }
                                }
                          }

                          console.log("should be sending");
                  
                          // Treatement :
                          // 1) UPDATE DATAS
                          // Give the player its server-side id
                          // and send it to him
                          ws.send(JSON.stringify({
                                  code: 1,
                                  playerID: this.playerID,
                                  players: playersToSend
                          }))
                          // 2) BROADCAST NEW DATA
                          // Send to everyone that a new player entered the game and
                          // give
                          // them its ID/position/direction whatever identifies him to
                          // others)
                          // -> send broadcast code 2
                          wss.broadcast({
                                  code: 2,
                                  player: {
                                  id: this.playerID,
                                  x: tabID[this.playerID].x,
                                  y: tabID[this.playerID].y,
                                  d: tabID[this.playerID].d
                                  }
                          })
		  }               
	        break;
	      case 5:
	        // A PLAYER CHANGED HIS DIRECTION
	        // {player ID/direction}

	         // 1) UDPATE DATA
	         // Change the internal state with the new
	         // direction for the right player.
	    	  	//gauche = 37
	    	  	//droite = 39
		   	//haut = 38
	    	  	//bas = 40
	    	  
	    	 //Have to check playerID = i
		   	  
		   	 //loop's start, until end of game
                  
                  msg.playerID
                  msg.d

                  tabID[msg.playerID].d = msg.d
	    	 
                  if (tabID[i].d == 37){					//go to left
                      tabID[i].x -= 1;	
                  } else if (tabID[i].d == 39){			//go to right
                      tabID[i].x += 1;
                  } else if (tabID[i].d == 38){			//go to top
                      tabID[i].y -= 1;
                  } else if (tabID[i].d == 40){			//go to bot'
                      tabID[i].y += 1;
                  }

                   //TestCollision : two players
                  var collision = {} //the 2 playerID in collision
                  for(player_collision in tabID){
                      player_collision = i + 1;
                      if (player_collision == 7){
                          player_collision = 1;
                      }
                           
                      if(tabID[i].x == tabID[player_collision].x && 
                          tabID[i].y == tabID[player_collision].y) 
                      {	
                                  wss.broadcast({//Notify everyone about the collision
                                      code: 5,
                                      collsion: {
                                          id_1: i,
                                          id_2: player_collision
                                      }
                                  })
                      }
                  }
          
                  
                   if (tabID[i].x == 100) {//out of horizontal canvas
                          tabID[i].x = 0;
                   } else if (tabID[i].x == 0) {
                           tabID[i].x = 100;
                   }
                          
                   if  (tab[i].y == 100) {//out of vertical canvas
                          tab[ID].y =0;
                   } else if (tabID[i].y == 0) {
                           tabID[i].y = 100;   
			 
			 	 // 2) BROADCAST PLAYER & NEW DIRECTION
	         	 // Notify everyone about this player's change;
	         	 // -> send broadcast code 5
	  		
                          wss.broadcast({//Notify everyone about the change of direction
                                 code: 5,
                                 player: {
                                    id: this.playerID,
                                    x: tabID[this.playerID].x,
                                    y: tabID[this.playerID].y,
                                    d: tabID[this.playerID].d
                                  }
                             })
		    }
	  
	  		 //loop's end 
	  
	        break;
	      case 2:
	        // Put that just in case (joke).
	        // Not sure we will use the 2 on the server side
	        break;
	      case 3:
	        // We should not be in need of this too, actually.
	        break;
	      case 4:
	        // This neither.
	        break;
	    }
	  });
	  
	  ws.on("close", function(){
		    // WHEN A PLAYER DISCONNECTS
		    tabID[this.playerID] = false;
		    nbMotos -= 1;
	  })
});

// ------------------------------------------------------ Define WSS functions
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(data));
  });
};

// ----------------------------------------- Define Server-Side game functions

// PUT THEM HERE.
// You also can put them in a separate file and import them if you prefer
// Having your own file.
Object.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
                if (obj.hasOwnProperty(key)) size++; 
      }
          return size;
};
