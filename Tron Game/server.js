var ws = require("nodejs-websocket")
var players = [];
var staying_players;

var websocket_server = ws.createServer(function(conn){
        // server-side, players are number
        // And we get the first number not set.
        var player = 1;
        while(player === players[player-1]){
                player++;
        }
        // First thing when a new connection is made
        // Give the player his number and the list of the others.
//*****************************************************************  1
        conn.sendText(JSON.stringify({
                "code" : 1,
                "player" : player,
                "players" : players
        }));
        players.push(player);

        // New player, broadcast him to others already there.
//*****************************************************************  2
        setTimeout(function(){
                broadcast(2, player);
        }, 500)

        // When a player disconnect, notify it to others and clear its
        // space.
//*****************************************************************  4
        conn.on("close", function(code, reason) {
                // Remove the number corresponding to the player who
                // left.
                var index = players.indexOf(player);
                if(index > -1){
                        players.splice(index, 1);
                }
                broadcast(4, player)
        });

        // When a player makes a move, broadcast it to others.
//*****************************************************************  5
        conn.on("text", function(str){
                broadcast(5, player, str);
        });


}).listen(8001);

var broadcast = function(code, player, message){
        websocket_server.connections.forEach(function (conn){
                conn.sendText(
                        JSON.stringify({
                                "code" : code,
                                "player" : player,
                                "message" : message
                        })
                        );
        });
}

// Define hexa color and return it as string.
var defineColor = function(){
        var color = "";
        for(var i = 0 ; i < 3 ; i++){
                color += Math.floor(
                    Math.random() * 256).toString(16
                  );
        }
        return color;
}



var my_http = require("http");
var filesys = require("fs");
var path = require("path");
var url = require("url");

my_http.createServer(function(request, response){
        var my_path = url.parse(request.url).pathname;
        var full_path = path.join(process.cwd(), my_path);
        console.log(full_path);
        
        if(full_path.substr(full_path.length - 3)===".js" || 
                full_path.substr(full_path.length - 5)===".html" || 
                full_path.substr(full_path.length - 4)===".css"
                ){
                
                console.log("path : " + full_path);
                filesys.exists(full_path, function(exists){                            
                        if(!exists){
                                response.writeHeader(404,
                                        {"Content-Type": "text/plain"}
                                        );
                                response.write("404 Not Found\n");
                                response.end();
                                                                                                    
                         } else {
                                filesys.readFile(
                                        full_path, 
                                        "binary", 
                                        function(err, file
                                      ){
                                        if(err){
                                                response.writeHeader(
                                                        500, 
                                                        {"Content-type": "text/plain"}
                                                        );
                                                 response.write(err + "\n");
                                                 response.end();
                                         } else {
                                                 response.writeHeader(200);
                                                 response.write(file, "binary");
                                                 response.end();
                                         }
                                       });
                                }
                });
        }
}).listen(8080);
