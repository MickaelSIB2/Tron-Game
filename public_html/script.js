var host = location.origin.replace(/^http/, 'ws');
var socket = new WebSocket(host);
var j, ctx, c;
var imageFile = "styles/bigScreen/"
	var dathUser; 
	var pseudoUser;
	
	var allBikes = [];
	allBikes[0] = ["blue", true, "j1_left.png", "j1_up.png", "j1_right.png", "j1_down.png"]; 
	allBikes[1] = ["yellow", true, "j2_left.png", "j2_up.png", "j2_right.png", "j2_down.png"]; 
	allBikes[2] = ["purple", true, "j3_left.png", "j3_up.png", "j3_right.png", "j3_down.png"]; 
	allBikes[3] = ["red", true, "j4_left.png", "j4_up.png", "j4_right.png", "j4_down.png"]; 
	allBikes[4] = ["green", true, "j5_left.png", "j5_up.png", "j5_right.png", "j5_down.png"]; 
	allBikes[5] = ["orange", true, "j6_left.png", "j6_up.png", "j6_right.png", "j6_down.png"]; 
	
function init(){
c = document.querySelector("#myCanvas");
 ctx = c.getContext("2d");
//    var c1=document.getElementById("yarBike");
//    var txc = c1.getContext("2d");
var timerID = 0;
// var posW = 500;
// var posH = 0;

var team;

//var numjou = 0;
j = [null, null, null, null, null, null];

//gauche = 37
//droite = 39
//haut = 38
//bas = 40
c.addEventListener("keypress", function(e){
    socket.send(JSON.stringify({code: 5} + e.keyCode));
}, false);
var interval;

document.getElementById("stopButton").onclick = function() {
        clearInterval(timerID);
    }
	
document.getElementById("startButton").onclick = function(){
	timerID = setInterval(everyoneGO, 50);
}	
	
	
};



/////////// L I G H T B I K E //////////////////////////////////////////////
function Moto(numJoueur, posW, posH, direction, moto, pseudo) {
    this.canvas = c; 
    this.numJoueur = numJoueur;
	this.posW = posW;
    this.posH = posH;
    this.ctxt = ctx; 
	this.pseudo = pseudo;
	this.moto = moto;
    this.dath;
	this.direction = direction;
    this.bike = new Image();
	this.moto = moto;
	

	}
	
	
    Moto.prototype.dessiner = function (numjou) {

		// ard = haut
        if(this.direction == "ard")
           this.bike.src = imageFile + this.moto[3];
        
         // deis = droite
        if(this.direction == "deis")
			 this.bike.src = imageFile + this.moto[4];
			
         // bun = bas
        if(this.direction == "bun"){
             this.bike.src = imageFile + this.moto[5];
         }
		
		  // clé = gauche
        if(this.direction == "cle"){
             this.bike.src = imageFile + this.moto[2];
			}

		this.bike.onload = function () {
				//time to draw... bang bang
				j[numjou].ctxt.drawImage(j[numjou].bike, (j[numjou].posW), j[numjou].posH);		
		}
    };
	
	
	
	
    Moto.prototype.setPosW = function (width) {
        this.posW = width;
    };

    Moto.prototype.setPosH = function (height) {
        this.posH = height;
    };
    
	
	
	
    Moto.prototype.laMuerta = function (){
		this.ctxt.clearRect(this.posW, this.posH, 32, 32);
        this.bike.src="styles/KABOUM!.png";
        this.bike.onload = function(){
			cthis.ctxt.drawImage(bike, this.posW, this.posH);
        setTimeout(function(){
          this.ctxt.clearRect(this.posW, this.posH, 32, 32);
        }, 1250);
		}
    };

	
 Moto.prototype.goGoGO = function (direction){
	var imFull = this.bike.width;
	var imHalf = this.bike.width/2;
	var imThird = this.bike.width/3;
	
						this.ctxt.beginPath();

                        if(direction == "ard"){
                                 
								 if((this.posH +imFull)<= 0)
									 this.posH = this.canvas.height;
                                 this.ctxt.moveTo((this.posW+imHalf), (this.posH+imFull));
								 this.ctxt.clearRect((this.posW+imThird), (this.posH-2), imThird, imFull-2);
                                 this.posH -= imFull/8;
								 
                                 this.ctxt.lineTo((this.posW+imHalf), (this.posH+imFull));
                         }
                        
                         if(direction=="deis"){
                                 
								 if(this.posW >= this.canvas.width)
									 this.posW = 0;
                                 this.ctxt.moveTo((this.posW), (this.posH+imHalf));
                                 this.ctxt.clearRect((this.posW+2), (this.posH+imThird), imFull-2, imThird);
                                 this.posW +=  imFull/8;
								 
                                 this.ctxt.lineTo((this.posW), (this.posH + imHalf));
                         }
                        
                         if(direction=="bun"){
                                 if(this.posH >= this.canvas.height)
									 this.posH = 0;
                                 this.ctxt.moveTo((this.posW+imHalf), (this.posH));
                                 this.ctxt.clearRect((this.posW+imThird), (this.posH+2), imThird, imFull-2);
                                 this.posH += imFull/8;
                                 this.ctxt.lineTo((this.posW+imHalf), (this.posH));
                         }
                        
                         if(direction=="cle"){
                                 if((this.posW+imFull) <= 0)
									 this.posW = this.canvas.width;
                                 this.ctxt.moveTo((this.posW+imFull), (this.posH+imHalf));
                                 this.ctxt.clearRect((this.posW-2), (this.posH+imThird), imFull-2, imThird);
                                 this.posW -= imFull/8;
                                 this.ctxt.lineTo((this.posW+imFull), (this.posH+imHalf));
                         }
                         
                         this.dessiner(this.numJoueur);
                         this.ctxt.strokeStyle=this.moto[0];
                         this.ctxt.stroke();
                         this.ctxt.closePath();
};
         
Moto.prototype.cas = function(dir){
	
	var imFull = this.bike.width;
	var imHalf = this.bike.width/2;
	var imThird = this.bike.width/3;
	
	var imW = this.bike.width;
	var imH = this.bike.height;
	
	// Tracer le bout de mur pour qu'il rejoigne celui de la nouvelle direction.
	if(this.direction == "ard"){
		this.ctxt.clearRect((this.posW+imThird), (this.posH-2), imThird, imFull-2);
		this.ctxt.beginPath();
		this.ctxt.moveTo((this.posW+imHalf), this.posH+imHalf);
		this.ctxt.lineTo((this.posW+imHalf), (this.posH+imFull));
		this.ctxt.strokeStyle=this.moto[0];
		this.ctxt.stroke();
		this.ctxt.closePath();
	}
	
	if(this.direction == "deis"){
		this.ctxt.clearRect((this.posW-2), (this.posH+imThird), imFull-2, imThird);
		this.ctxt.beginPath();
		this.ctxt.moveTo((this.posW-2), this.posH+imHalf);
		this.ctxt.lineTo((this.posW+imHalf), (this.posH+imHalf));
		this.ctxt.strokeStyle=this.moto[0];
		this.ctxt.stroke();
		this.ctxt.closePath();
	}
	
	if(this.direction == "bun"){
		this.ctxt.clearRect((this.posW+imThird), (this.posH-2), imThird, imFull-2);
		this.ctxt.beginPath();
		this.ctxt.moveTo((this.posW+imHalf), this.posH-2);
		this.ctxt.lineTo((this.posW+imHalf), (this.posH+imHalf));
		this.ctxt.strokeStyle=this.moto[0];
		this.ctxt.stroke();
		this.ctxt.closePath();
	}

	if(this.direction == "cle"){
		this.ctxt.clearRect((this.posW-2), (this.posH+imThird), imFull-2, imThird);
		this.ctxt.beginPath();
		this.ctxt.moveTo((this.posW+imHalf), (this.posH+imHalf));
		this.ctxt.lineTo((this.posW+imFull), (this.posH+imHalf));
		this.ctxt.strokeStyle=this.moto[0];
		this.ctxt.stroke();
		this.ctxt.closePath();
	}
	
	//changement de direction
	this.direction = dir;

	//avancer la lightbike dans la nouvelle direction afin de ne pas effacer le trait.
	if(this.direction == "deis"){
		this.posW += imHalf;
	}
	if(this.direction == "bun"){
		this.posH +=imHalf;
	}
	if(this.direction == "cle"){
		this.posW -= imHalf;
	}
	if(this.direction == "ard"){
		this.posH -=imHalf;
	}
	
}

////////////////////////////////////////////////

//convertir l'arriv�e des donn�es en pourcentage en coordonn�es de canvas.
	function toX(waidz){
		x = (c.width*waidz)/100;
		return (x);
    	};
	function toY(heit){
		y = (c.height*heit)/100;
		return (y);
	};
	
function ajouterMONJoueur(numjou, posiW, posiH, direction) {
	var x = toX(posiW);
	var y = toY(posiH);
	var moto = testMoto(dathUser);
    j[numjou] = new Moto(numjou, x, y, direction, moto, pseudoUser);
	moto[1] = false;
    j[numjou].dessiner(numjou);
}
	
function ajouterAutreJoueur(numjou, posiW, posiH, direction, autrePseudo){
	var x = toX(posiW);
	var y = toY(posiH);
	for(var i = 0; i <= 6; i++){
		if(allBikes[i][1]){
			 j[numjou] = new Moto(numjou, x, y, direction, allBikes[i], autrePseudo);
			 j[numjou].dessiner(numjou);
			allBikes[i][1] = false;
			break;
		}
	}
}


function everyoneGO(){
	for(var i = 0; i <= 6; i++){
		if(j[i] != null){
			j[i].goGoGO(j[i].direction);
		}
	}
}

function enregistrerCouleur(value){
	console.log(value);
		dathUser = value;
}

function enregistrerPseudo(){
	var texte= document.querySelector("#pseudo");
	pseudoUser = texte.value;
	document.querySelector("#formPart").style.display="none";
	document.querySelector("#canvasPart").style.display="block";

	socket.send(JSON.stringify({code: 1, pseudo: pseudoUser}));
	console.log(dathUser);
}

function afficherTOUT(){

	console.log(dathUser);
	console.log(pseudoUser);
}

//Sert à indiquer à ajouterMonJoueur la moto à utiliser.
function testMoto(couleur){
	for(var i = 0; i <= 5; i++){
		if(allBikes[i][0] == couleur)
			return allBikes[i];
	}
}
