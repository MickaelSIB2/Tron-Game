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
var ctx = c.getContext("2d");
//    var c1=document.getElementById("yarBike");
//    var txc = c1.getContext("2d");
var timerID = 0;
var posW = 500;
var posH = 0;
var dath = "whatever";
var team = "";
//var numjou = 0;
var j1=null;
var j2=null;
var j3=null;
var j4=null;
var j5=null;
var j6=null;


/////////// L I G H T B I K E //////////////////////////////////////////////
function Moto(canvas, numJoueur, posW, posH, contx, dath) {
    this.canvas = canvas;
    this.numJoueur = numJoueur;
    this.posH = posH;
    this.posW = posW;
    this.contx = contx;
    this.dath = dath;
    var angle;
    var bike = new Image();
    var bike_prof = new Image();


    if (numJoueur === 1) {
//        posW = (canvas.width) - 3;
//        posH = (canvas.height / 2);
        bike.src = "styles/j1_up.png";
        bike_prof.src = "styles/j1_prof.gif";
        angle = 270;
        team = "fuar";
    }
    else if (numJoueur === 2) {
//        posW = 5;
//        posH = (canvas.height / 2);
        bike.src = "styles/j2_up.png";
        bike_prof.src = "styles/j2_prof.gif";
        angle = 90;
        team = "te";
    }
    else if (numJoueur === 3) {
//        posW = (canvas.width) - 5;
//        posH = 5;
        bike.src = "styles/j3_up.png";
        bike_prof.src = "styles/j3_prof.gif";
        angle = 270;
        team = "fuar";
    }
    else if (numJoueur === 4) {
//        posW = 5;
//        posH = canvas.height - 5;
        bike.src = "styles/j4_up.png";
        bike_prof.src = "styles/j4_prof.gif";
        angle = 90;
        team = "te";
    }
    else if (numJoueur === 5) {
//        posW = canvas.width - 5;
//        posH = canvas.height - 5;
        bike.src = "styles/j5_up.png";
        bike_prof.src = "styles/j5_prof.gif";
        angle = 270;
        team = "fuar";
    }
    else if (numJoueur === 6) {
//        posW = 5;
//        posH = 5;
        bike.src = "styles/j6_up.png";
        bike_prof.src = "styles/j6_prof.gif";
        angle = 90;
        team = "te";
    }


    Moto.prototype.dessiner = function () {
//        this.posW = this.getPosW();
//        this.posH = this.getPosH();
        bike.onload = function () {
            //time to draw... bang bang
            var TO_RADIANS = Math.PI / 180;
            contx.save();
            contx.translate(posW, posH);
            contx.rotate(angle * TO_RADIANS);
            contx.drawImage(bike, -(bike.width / 2), -(bike.width / 2));
            contx.restore();
        };
    };
    Moto.prototype.getPosW = function () {
        return(this.posW);
    };

    Moto.prototype.getPosH = function () {
        return(this.posH);
    };

    /*afficher la photo de profil dans le deuxième canvas.
     * Moto.prototype.displayProfile = function(){
     
     bike_prof.onload = function(){
     txc.drawImage(bike_prof, bike_prof.current * bike_prof.width, 0, 
     bike_prof.width, bike_prof.height, c1.width/2, c1.heigth/2, bike_prof.width, bike_prof.height);
     bike_prof.current = (bike_prof.current + 1) % bike_prof.total_frames;
     }*/
     }


////////////////////////////////////////////////
function ajouterJoueur(numjou) {

    if (numjou > 6) {
        window.alert("Il y a déjà 6 joueurs :/ Il vous faut attendre la\n\
                             prochaine partie.");
    }
    else {
        numjou++;
        if (numjou === 1) {
            j1 = new Moto(c, 1, ((c.width) - 3), (c.height / 2), ctx, dath);
            j1.dessiner(); //j1.displayProfile(); 
            
        }
        if (numjou === 2) {
            j2 = new Moto(c, 2, 5, (c.height / 2), ctx, dath);
            j2.dessiner();
            
        }
        if (numjou === 3) {
            c.width = c.width + 50;
            c.height = c.height + 25;
            j3 = new Moto(c, 3, ((c.width) - 5), 5, ctx, dath);
            j3.dessiner();

            j1 = new Moto(c, 1, j1.posW, j1.posH, ctx, dath);
            j1.dessiner();

            j2 = new Moto(c, 2, j2.posW, j2.posH, ctx, dath);
            j2.dessiner();
        }
        if (numjou === 4) {
            j4 = new Moto(c, 4, 5, (c.height - 5), ctx, dath);
            j4.dessiner();
        }
        if (numjou === 5) {
            c.width = c.width + 50;
            c.height = c.height + 25;
            j5 = new Moto(c, 5, (c.width - 5), (c.height - 5), ctx, dath);
            j5.dessiner();

            j1 = new Moto(c, 1, j1.posW, j1.posH, ctx, dath);
            j1.dessiner();

            j2 = new Moto(c, 2, j2.posW, j2.posH, ctx, dath);
            j2.dessiner();

            j3 = new Moto(c, 3, j3.posW, j3.posH, ctx, dath);
            j3.dessiner();

            j4 = new Moto(c, 4, j4.posW, j4.posH, ctx, dath);
            j4.dessiner();
        }
        if (numjou === 6) {
            j6 = new Moto(c, 6, 5, 5, ctx, dath);
            j6.dessiner();
        }
    }
}

function movej1() {

   ctx.clearRect((j1.posW - 16), (j1.posH - 16), 32, 32);
   j1 = new Moto(c, 1, (j1.posW-4), (j1.posH), ctx, dath);
    j1.dessiner(); 
     ctx.beginPath(); 
     ctx.moveTo((j1.posW+20), (j1.posH));
     ctx.lineTo(j1.posW, j1.posH);
     ctx.strokeStyle='blue';
     ctx.stroke();
     
}

//};
