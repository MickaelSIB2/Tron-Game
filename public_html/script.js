var j; var ctx; var c;




function init(){
c = document.getElementById("myCanvas");
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
    socket.send(JSON.stringify({code: 1} + e.keyCode));
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
function Moto(canvas, numJoueur, posW, posH, contx, direction) {
    this.canvas = canvas;
    this.numJoueur = numJoueur;
	this.posW = posW;
    this.posH = posH;
    this.contx = contx;
    this.dath;
	this.angle = 0;
	this.direction = direction;
    var bike = new Image();
    var bike_prof = new Image();
	


    if (numJoueur == 1) {
      
        bike_prof.src = "styles/j1_prof.gif";
        //angle = 270;
        team = "fuar";
		dath = "blue";
		
    }
    else if (numJoueur == 2) {


        bike_prof.src = "styles/j2_prof.gif";
//        angle = 90;
        team = "te";
		dath = "yellow";
		
    }
    else if (numJoueur == 3) {


        bike_prof.src = "styles/j3_prof.gif";
//        angle = 270;
        team = "fuar";
		dath = "purple";
		
    }
    else if (numJoueur == 4) {


        bike_prof.src = "styles/j4_prof.gif";
//        angle = 90;
        team = "te";
		dath = "red";
		
    }
    else if (numJoueur == 5) {


        bike_prof.src = "styles/j5_prof.gif";
//        angle = 270;
        team = "fuar";
		dath = "green";
		
    }
    else if (numJoueur == 6) {


        bike_prof.src = "styles/j6_prof.gif";
        //angle = 90;
        team = "te";
		dath = "orange";
		
    };

	
	
	
    Moto.prototype.dessiner = function () {
		
		// ard = haut
        if(direction == "ard"){
           bike.src = "styles/j" + numJoueur + "_up.png";
			bike.onload = function () {
				//time to draw... bang bang
				contx.drawImage(bike, posW, posH);		
			}
		}
        
         // deis = droite
        if(direction == "deis"){
			 bike.src = "styles/j" + numJoueur + "_right.png";
			bike.onload = function () {
				//time to draw... bang bang
				contx.drawImage(bike, posW, posH);	
			}
		}
			
         // bun = bas
        if(direction == "bun"){
             bike.src = "styles/j" + numJoueur + "_down.png";
			bike.onload = function () {
				//time to draw... bang bang
				contx.drawImage(bike, posW, posH);	
			}
		}
		
		  // clé = gauche
        if(direction == "cle"){
             bike.src = "styles/j" + numJoueur + "_left.png";
			bike.onload = function () {
				//time to draw... bang bang
				contx.drawImage(bike, posW, posH);	
			}
		}
        
    };
	
	
	
	
    Moto.prototype.setPosW = function (width) {
        this.posW = width;
    };

    Moto.prototype.setPosH = function (height) {
        this.posH = height;
    };
    
	
	
	
    Moto.prototype.laMuerta = function (){
		contx.clearRect(posW, posH, 32, 32);
		contx.clearRect(posW, posH, 32, 32);
        bike.src="styles/Badaboum!.png";
        bike.onload = function(){
			contx.drawImage(bike, posW, posH);
        setTimeout(function(){
          contx.clearRect(posW, posH, 32, 32);
        }, 1250);
		}
    };
	
}
	
	
	
 Moto.prototype.goGoGO = function (){
                        
                        if(direction = "ard"){
                                 ctx.clearRect(posW, posH, 32, 32);
                                 posH -= 3;
                         }
                        
                         if(direction=="deis"){
                                 ctx.clearRect(posW, posH, 32, 32);
                                 posW += 3;
                         }
                        
                         if(direction=="bun"){
                                 ctx.clearRect(posW, posH, 32, 32);
                                 posH += 3;
                         }
                        
                         if(direction=="cle"){
                                 ctx.clearRect(posW, posH, 32, 32);
                                 posW -= 3;
                         }
                         this.dessiner();
                 };
         }
		
	
    /*afficher la photo de profil dans le deuxième canvas.
     * Moto.prototype.displayProfile = function(){
     
     bike_prof.onload = function(){
     txc.drawImage(bike_prof, bike_prof.current * bike_prof.width, 0, 
     bike_prof.width, bike_prof.height, c1.width/2, c1.heigth/2, bike_prof.width, bike_prof.height);
     bike_prof.current = (bike_prof.current + 1) % bike_prof.total_frames;
     }*/
     
	 

////////////////////////////////////////////////

//convertir l'arriv�e des donn�es en pourcentage en coordonn�es de canvas.
	function toX(weedz){
		x = (c.width*weedz)/100;
		return (x);
    	};
	function toY(hait){
		y = (c.height*hait)/100;
		return (y);
	};
	
function ajouterJoueur(numjou, posiW, posiH, direction) {
	var x = toX(posiW);
	var y = toY(posiH);
    j[numjou] = new Moto(c, numjou, x, y, ctx, direction);
    j[numjou].dessiner();
};

function everyoneGO(){
	for(var i = 0; i <= 6; i++){
		if(j[i] != null){
			// goGoGO(1); goGoGO(2);
			if(j[i].direction=="ard"){
				ctx.clearRect(j[i].posW, j[i].posH, 32, 32);
				//j[i].posH -= 3
			}
			
			if(j[i].direction=="deis"){
				ctx.clearRect(j[i].posW, j[i].posH, 32, 32);
				j[i].posW += 3;
			}
			
			if(j[i].direction=="bun"){
				ctx.clearRect(j[i].posW, j[i].posH, 32, 32);
				j[i].posH += 3;
			}
			
			if(j[i].direction=="cle"){
				ctx.clearRect(j[i].posW, j[i].posH, 32, 32);
				j[i].posW -= 3;
			}
			
			j[i] = new Moto(c, i, j[i].posW, (j[i].posH-3), ctx, j[i].direction);
			//ajouterJoueur(i, j[i].posW, j[i].posH, j[i].direction);
			j[i].dessiner();
		}
	}
}
	
	 //function goGoGO(numjou){
		
                         //if(j[numjou].direction=="ard"){
                                 //ctx.clearRect(j[numjou].posW, j[numjou].posH, 32, 32);
                                 //j[numjou].posH -= 3;	
                         //}
                        
                         //if(j[numjou].direction=="deis"){
                                 //ctx.clearRect(j[numjou].posW, j[numjou].posH, 32, 32);
                                 //j[numjou].posW += 3;
                         //}
                        
                         //if(j[numjou].direction=="bun"){
                                 //ctx.clearRect(j[numjou].posW, j[numjou].posH, 32, 32);
                                 //j[numjou].posH += 3;
                         //}
                        
                         //if(j[numjou].direction=="cle"){
                                 //ctx.clearRect(j[numjou].posW, j[numjou].posH, 32, 32);
                                 //j[numjou].posW -= 3;
                         //}
                        
                         //j[numjou] = new Moto(c, numjou, j[numjou].posW, j[numjou].posH, ctx, j[numjou].direction);
                         //j[numjou].dessiner();
                 //}
	
	
	
