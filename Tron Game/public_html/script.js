window.onload = function(){
        var id;
        var c = document.querySelector(".myCanvas");
        var ctx = c.getContext("2d");
        var posW = 0; var posH = 0; var dath = "wathever"; var team = "";
        var player;
        var players = [];
        var socket = new WebSocket('ws://localhost:8001', "soap");


        window.addEventListener("keydown", function(event){
                socket.send(event.key);
        });

        socket.onopen = function(){
        };

        socket.onmessage = function(e){
                var data = JSON.parse(e.data);
                switch(data.code){
// ***************************************************************   5
                        case 5:
                                // When another player changes direction
                                break;
// ***************************************************************   1
                        case 1:
                                // When  you connect, first thing the
                                // server sends you.
                                //
                                // Client-side, players are lightbikes.
                                player = new Moto(
                                                c, 
                                                data.player,
                                                posW,
                                                posH,
                                                ctx,
                                                dath
                                                );
                                player.dessiner();
                                data.players.forEach(function(element){
                                        players.push(
                                                new Moto(
                                                    c,
                                                    element,
                                                    posW,
                                                    posH,
                                                    ctx,
                                                    dath
                                                    )
                                                );
                                        players[players.length-1].dessiner();
                                });
                                break;
// ***************************************************************   2
                        case 2:
                                // When a new player enter the game.
                                if(player.numJoueur !== data.player){
                                        var np = new Moto(
                                                        c,
                                                        data.player,
                                                        posW,
                                                        posH,
                                                        ctx,
                                                        dath
                                                        );
                                        players.push(np);
                                        np.dessiner();
                                }
                                break;
// ***************************************************************   3
                        case 3:
                                // When a player dies.
                                break;
// ***************************************************************   4
                        case 4:
                                // When a player disconnects
                                var index = players.indexOf(player);
                                if(index > -1){
                                        players.splice(index, 1);
                                }
                                break;
                }
        }


        function Moto(canvas, numJoueur, posW, posH, contx,dath){
                this.canvas = canvas;
                this.numJoueur = numJoueur;
                this.posH = posH;
                this.posW = posW;
                this.contx = contx;
                this.dath = dath;
                
                if(numJoueur===1){
                    posW = (canvas.width/2) - 100;
                    posH = (canvas.height/2) - 50;
                    dath = "blue";
                    team = "fuar";
                }
                else if(numJoueur===2){
                    posW = (canvas.width/2) - 100;
                    posH = (canvas.height/2);
                    dath = "yellow";
                    team = "te";
                }
                else if(numJoueur===3){
                    posW = canvas.width/2 - 100;
                    posH = canvas.height/2 + 50;
                    dath = "purple";
                    team = "fuar";
                }
                else if(numJoueur===4){
                    posW = canvas.width/2 + 100;
                    posH = canvas.height/2 + 50;
                    dath = "red";
                    team = "te";
                }
                else if(numJoueur===5){
                    posW = canvas.width/2 + 100;
                    posH = canvas.height/2;
                    dath = "green";
                    team = "fuar";
                }
                else{
                    posW = canvas.width/2 + 100;
                    posH = canvas.height/2 - 50;
                    dath = "orange";
                    team = "te";
                }
            
            
             Moto.prototype.dessiner = function(){
                //time to draw... bang bang
                contx.beginPath();
                contx.rect(posW, posH, 10, 5);
                contx.stroke();
                contx.fillStyle = dath;
                contx.fill();
                contx.closePath();
            };
        }
};
