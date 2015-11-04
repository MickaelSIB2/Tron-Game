/*window.onload = function(){
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
                               ajouterJoueur(c, ctx);                               
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
        }*/

		
 var c = document.getElementById("myCanvas");
 var ctx=c.getContext("2d");
 var posW = 0; var posH = 0; var dath = "whatever"; var team = "";
 var players = []; var player;

function Moto(canvas, numJoueur, posW, posH, contx,dath){
                this.canvas = canvas;
                this.numJoueur=numJoueur;
                this.posH = posH;
                this.posW = posW;
                this.contx = contx;
                this.dath = dath;
				var angle;
				var bike = new Image();
				
                
                if(numJoueur===1){
                    //posW = (canvas.width/2) - 100;
                    //posH = (canvas.height/2) - 50;
					posW = (canvas.width) - 3;
					posH = (canvas.height/2);
                    bike.src = "styles/j1_up.png";
					angle = 270;
					team = "fuar";
                }
                else if(numJoueur===2){
                    // posW = (canvas.width/2) - 100;
                    // posH = (canvas.height/2);
					posW = 3;
					posH = (canvas.height/2);
                    bike.src = "styles/j2_up.png";
					angle = 90;
                    team = "te";
                }
                else if(numJoueur===3){
                    // posW = canvas.width/2 - 100;
                    // posH = canvas.height/2 + 50;
					posW = (canvas.width) - 3;
					posH = 0;
                    bike.src = "styles/j3_up.png";
					angle = 270;
                    team = "fuar";
                }
                else if(numJoueur===4){
                    // posW = canvas.width/2 + 100;
                    // posH = canvas.height/2 + 50;
					posW = 3;
					posH = canvas.height;
                    bike.src = "styles/j4_up.png";
					angle = 90;
                    team = "te";
                }
                else if(numJoueur===5){
                    // posW = canvas.width/2 + 100;
                    // posH = canvas.height/2;
					posW = (canvas.width) - 3;
					posH = canvas.heigth;
                    bike.src = "styles/j5_up.png";
					angle = 270;
                    team = "fuar";
                }
                else{
                    // posW = canvas.width/2 + 100;
                    // posH = canvas.height/2 - 50;
					posW = 3;
					posH = 0;
                    bike.src = "styles/j6_up.png";
					angle = 90;
                    team = "te";
                }
			
            
             Moto.prototype.dessiner = function(){
                
                
                //time to draw... bang bang
				var TO_RADIANS = Math.PI/180;
				contx.save();
				contx.translate(posW, posH);
				contx.rotate(angle * TO_RADIANS);
				contx.drawImage(bike, -(bike.width/2), -(bike.width/2));
				contx.restore();
              /*contx.beginPath();
                <!--contx.rect(posW, posH, 10, 5);
                <!--contx.stroke();
                <!--contx.fillStyle = dath;
                <!--contx.fill();
                <!--contx.closePath();*/
            };}
			
var numjou = 0; var j1; var j2; var j3; var j4; var j5; var j6;
function ajouterJoueur(canvas, ctx){
	this.canvas = canvas;
	this.ctx = ctx;
        //this.joueur = joueur;
	
	if(numjou >= 6){
		window.alert("Il y a déjà 6 joueurs :/ Il vous faut attendre la prochaine partie.");
	}
	else{
		numjou++;
		// window.alert(numjou);
		if(numjou === 1){
			j1 = new Moto(canvas, 1, posW, posH, ctx,dath);
			j1.dessiner();
		}
		if(numjou === 2){
			j2 = new Moto(canvas, 2, posW, posH, ctx, dath);
			j2.dessiner();
		}
		if(numjou === 3){
			c.width = c.width + 50;
			c.height = c.height + 25;
			//forEach(data.player){player.dessiner();};
			 j1.dessiner(); j2.dessiner();
			j3 = new Moto(canvas, 3, posW, posH, ctx, dath);
			j3.dessiner();
		}
		if(numjou === 4){
			j4 = new Moto(canvas, 4, posW, posH, ctx, dath);
			j4.dessiner();
		}
		if(numjou === 5){
			c.width = c.width + 50;
			c.height = c.height + 25;
			j1.dessiner(); j2.dessiner();j3.dessiner(); j4.dessiner();
			j5 = new Moto(canvas, 5, posW, posH, ctx, dath);
			j5.dessiner();
		}
		if(numjou === 6){
			j6 = new Moto(canvas, 6, posW, posH, ctx, dath);
			j6.dessiner();
		}
	}
}
//};
