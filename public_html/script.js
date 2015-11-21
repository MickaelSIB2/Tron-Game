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
var j = [null, null, null, null, null, null];

//gauche = 37
//droite = 39
//haut = 38
//bas = 40
c.addEventListener("keypress", function(e){
    socket.send(JSON.stringify({code: 1} + e.keyCode));
}, false);



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


    if (numJoueur == 1) {
//        posW = (canvas.width) - 3;
//        posH = (canvas.height / 2);
        bike.src = "styles/j1_up.png";
        bike_prof.src = "styles/j1_prof.gif";
        angle = 270;
        team = "fuar";
    }
    else if (numJoueur == 2) {
//        posW = 5;
//        posH = (canvas.height / 2);
        bike.src = "styles/j2_up.png";
        bike_prof.src = "styles/j2_prof.gif";
//        angle = 90;
        team = "te";
    }
    else if (numJoueur == 3) {
//        posW = (canvas.width) - 5;
//        posH = 5;
        bike.src = "styles/j3_up.png";
        bike_prof.src = "styles/j3_prof.gif";
//        angle = 270;
        team = "fuar";
    }
    else if (numJoueur == 4) {
//        posW = 5;
//        posH = canvas.height - 5;
        bike.src = "styles/j4_up.png";
        bike_prof.src = "styles/j4_prof.gif";
//        angle = 90;
        team = "te";
    }
    else if (numJoueur == 5) {
//        posW = canvas.width - 5;
//        posH = canvas.height - 5;
        bike.src = "styles/j5_up.png";
        bike_prof.src = "styles/j5_prof.gif";
//        angle = 270;
        team = "fuar";
    }
    else if (numJoueur == 6) {
//        posW = 5;
//        posH = 5; 
        bike.src = "styles/j6_up.png";
        bike_prof.src = "styles/j6_prof.gif";
        //angle = 90;
        team = "te";
    }


	
	
    Moto.prototype.dessiner = function () {

        bike.onload = function () {
            //time to draw... bang bang
            var TO_RADIANS = Math.PI / 180;
            //this.cas(dir);
            contx.save();
            contx.translate(posW, posH);
            contx.rotate(angle * TO_RADIANS);
            contx.drawImage(bike, -(bike.width / 2), -(bike.width / 2));
            contx.restore();
        };
    };
    Moto.prototype.setPosW = function (width) {
        this.posW = width;
    };

    Moto.prototype.setPosH = function (height) {
        this.posH = height;
    };
    
    Moto.prototype.laMuerta = function (){
        bike.src="styles/Badaboum!.png";
        this.dessiner();
        setTimeout(function(){
          //this = null;  
        }, 3000);
    };
    
    Moto.prototype.cas = function(dir){
        
        //cl� = gauche
        if(dir=="cl�")
            this.angle = 0;
        
        //ard = haut
        if(dir=="ard")
            this.angle = 90;
        
        //deis = droite
        if(dir=="deis")
            this.angle = 180;
        
        //bun = bas
        if(dir=="bun")
            this.angle = 270;
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

//convertir l'arriv�e des donn�es en pourcentage en coordonn�es de canvas.
	function toX(weedz){
		x = (c.width*weedz)/100;
		return (x);
    };
	function toY(hait){
		y = (c.height*hait)/100;
		return (y);
	}
	
function ajouterJoueur(numjou, posiW, posiH) {
	var x = toX(posiW);
	var y = toY(posiH);
    j[numjou] = new Moto(c, numjou, x, y, ctx, dath);
    j[numjou].dessiner();
}
