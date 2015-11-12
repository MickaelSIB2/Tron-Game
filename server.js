var WSServer = require('ws').Server
var express = require('express')
var http = require('http')
var app = express();
var port = process.env.PORT || 3000 // To work on Heroku

// -------------------------------------------------- Create the Server itself

/*
 * First, use express.static middleware to serve statics files
 * defined in HTML <head> (css and js mostly)
 */
app.use(express.static(__dirname + '/public_html'));

/* 
 * Create the server itself with http library 
 * And make it listen on previously defined port
 */
var server = http.createServer(app);
server.listen(port);

/*
 * Create the WebSocketServer and pass it the http
 * server we previously created.
 * Note, this is binded to the :
 * var host = location.origin.replace(/^http/, 'ws');
 * code in client, which connects to an identical URL,
 * except for the protocole part.
 */
var wss = new WSServer({server: server});

/*
 * Finally, define how to handle the Websocket.
 * When a message is received.
 * When the connection with the websocket is closed.
 */
wss.on("connection", function(ws){
  ws.on("message", function(data){
  
    var msg = JSON.parse(data);
    var dataToSend;
  
    /*
     * When the websocket receive a message,
     * do somethign depending of the "code" the client put
     * into its message.
     *
     * It's sort of a home-made protocol for the game.
     */

    switch(msg.code){
      case 1:
        // NEW PLAYER
        // WHEN A PLAYER CONNECTS TO THE SERVER
        //
        // Datas should be... well, nothing I guess. 
        // The client will just say 'Hi'
        //
        // Treatement : 
        // 1) UPDATE DATAS 
        //  Give the player its server-side id
        //  and send it to him
        //  -> send player code 1
        //  * Ex : ws.send(JSON.stringify({ -> JSON is important if you don't use broadcast
        //          code: 1,
        //          playerID: this.playerID -> Or whatever you decided
        //                                      this player's ID is going
        //                                      to be.
        //         }))
        // 2) BROADCAST NEW DATA 
        //  Send to everyone that a new player entered the game and give 
        //  them its position/color/ID/ whatever identifies him to others)
        //  -> send broadcast code 2
        break;
      case 5:
        // A PLAYER CHANGED HIS DIRECTION
        //
        // Should be something like the player ID/color/position
        // And the new direction.
        //
        // 1) UDPATE DATA 
        //  Change the internal state with the new 
        //  direction for the right player.
        // 2) BROADCAST PLAYER & NEW DIRECTION
        //  Notify everyone about this player's change;
        //  -> send broadcast code 5
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
