//dichiariamo variabili all'esterno del nostro fogli - variabili globali
let xMax = 400; //vogio rifare tutto il disegno in funzione di una variabile
let yMax = 600; //queste due variabili definiscono il foglio

//devo definire una coordinata di partenza delmio razzo
let xRocket = xMax/2;
let yRocket = yMax*0.6;

//creo le variabili in cui salverò la mia immagine e la mia tabela
let table;
let star_img;
let tempo = 1; //variabile globale che sia inizializzata in qualche maniera
let scalaDiBase = 1.0;
let ruota2 = 1;

function preload() {
//qui vengono caricate le risorse 
  //table = loadTable ("stars.csv", "csv", "header");
  table = loadTable("stars.csv", "csv", "header");
  star_img = loadImage("star.png");
}

function setup() {
  createCanvas(xMax, yMax);
  frameRate(30)
}

function drawSingleStarFromFile(index, posX, posY) {
  let starSize = table.getNum(index, 'starSize') //vai a prendere nella tabella la riga in posizione index, 
  //la colonna starSize e restituiscimi quel valore
  //ora dobbiamo plottare l'immagine nella nostra canva 
  image(star_img, posX, posY, starSize, starSize);
}

 function drawStarsFromFile() {
  for(let k=0; k<table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3)*5; 
    let starY = (k*73) % height + (k%7);

    drawSingleStarFromFile(k, starX, starY);
  }
}

function drawStar (i, starX, starY, random_transparency, random_size) {
  if(i%2 == 0) { //stella a quando i è pari
    // use white with alpha for better star visibility
    fill(255, 255, 255, random_transparency);
    noStroke();
    ellipse (starX,starY,random_size);
  }
  
  else if(i%3 == 0) { //stella b quando è divisibile per 3
        fill(200, 100, 255, random_transparency); //150 è trasparenza
        ellipse (starX,starY,random_size);
  }

  else { //stella c
        fill(255, 255, 100, random_transparency); //150 è trasparenza
        ellipse (starX,starY,random_size);
  }

  return;
}

function drawStars(num_stars=120) {
  for(let i=0; i<num_stars; i++){
    let starX = (i*37) % width + (i%3)*5; //parentesi servono per specificare eventuali ordini di precedenza
    let starY = (i*73) % height + (i%7);

    let random_transparency = random(150, 255);
    let random_size = random(2.8, 5.0);

    // drawSingleStar was a typo/old function name — call the defined drawStar
    drawStar(i, starX, starY, random_transparency, random_size);
  }
}

function drawRocket(xRocket, yRocket, scalaB=1.0, ruota=30) { 

  push ();
  // posizioniamo l'origine sul centro del razzo
  translate(xRocket, yRocket);
  // rotate si aspetta radianti — convertiamo da gradi
  rotate(radians(ruota));
  //scalare
  scale(scalaB);

  fill (220); 
  stroke(40);
  rectMode(CENTER);
  // disegniamo attorno all'origine (0,0)
  rect(0, 30, 80, 180, 20); //ultimo valore è border radius

  //triangolo (punta)
  fill(200,40,40, 155);
  triangle(-40, -60, 40, -60, 0, -120);

  //cerchio
  fill(40, 150, 220);
  stroke(255);
  strokeWeight(3);
  ellipse(0, 30, 48, 48);

  pop();
}

function moveRocket (yRocket, step=1) {
  yRocket = yRocket - step;
  let soglia = yMax * 0.6;
    if (yRocket < soglia) {
    yRocket = yMax;
}
return yRocket;

}

function draw() {
  background(60,60,134); //cambiato colore cambiando valore nelle parentesi
  fill (255); //mostra testo bianco che dice le coordinate del muose sul foglio da disegno
  text ("mouseX: " + mouseX + ", mouseY: " + mouseY,20,20); //stringa da mostrare, posizione x e posizione y

  let variazionediscala = scalaDiBase * Math.abs(Math.sin(tempo)); //metto valore assoluto perchè se no prima era andche negativa

  //drawStars(150);
  drawStarsFromFile();
  // passa anche l'angolo corrente
  drawRocket(xRocket, yRocket, variazionediscala, ruota2);
  // correggo aggiornamento rotazione
  ruota2 += 2;
  
  yRocket = moveRocket (yRocket, 1);
  tempo = tempo + 0.01; //faccio in modo che aumenti sempre perchè la funzione draw è costantemente richiamata
  

}