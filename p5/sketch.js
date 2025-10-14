//dichiariamo variabili all'esterno del nostro fogli - variabili globali
let xMax = 400; //vogio rifare tutto il disegno in funzione di una variabile
let yMax = 600; //queste due variabili definiscono il foglio

//devo definire una coordinata di partenza delmio razzo
let xRocket = xMax/2;
let yRocket = yMax*0.6;

let table;
let star_img;

function preload() {
  table = loadTable("stars.csv", "csv", "header"); //con header gli dico che la prima riga è di intestazione, non dati (se è tra virgolette)
  star_img = loadImage("star.png");
}

function setup() {
  createCanvas(xMax, yMax);
  frameRate(30)
}

function drawSingStarFromFile(index, posX, posY) {
  let starSize= table.getNum(index, "starSize"); //prendo la colonna size e gli dico "quella è la dimensione della stella
  image(star_img, posX, posY, starSize, starSize); //disegno l'immagine alla posizione x e y con la dimensione specificata
  }

  function drawStarsFromFile() {
    for (let k= 0; k < table.getRowCount(); k++) {   //per ogni riga della tabella
    let starX = (k*37) % width + (k%3)*5; //parentesi servono per specificare eventuali ordini di precedenza
    let starY = (k*73) % height + (k%7);  
    
    drawSingStarFromFile(k, starX, starY); //disegno la stella alla posizione specificata
  } }
      

function drawStar (i, starX, starY, random_transparency, random_size) {
  if(i%2 == 0) { //stella a quando i è pari
      fill(0, 0, random_transparency); //150 è trasparenza
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

function drawStars(num_star = 120) {
  for (let i = 0; i < num_star; i++) {
    let starX = (i*37) % width + (i%3)*5;
    let starY = (i*73) % height + (i%7);
    let random_transparency = random(150, 255);
    let random_size = random(2.8, 5.0);
    drawStar(i, starX, starY, random_transparency, random_size);
  }
}
function drawRocket(xRocket, yRocket) {
push ();
  //queste caratterisiche sono per tutti, a meno che non specifico altro 
  fill (220); 
  stroke(40);
  //alternativa
  rectMode(CENTER);
  rect(xRocket, yRocket+30, 80, 180, 20); //ultimo valore è border radius

  //triangolo
  fill(200,40,40, 155);
  triangle(xRocket-40,yRocket-60,xRocket+40,yRocket-60,xRocket,yRocket-120);


  //cerchio
  fill(40, 150, 220);
  stroke(255);
  strokeWeight(3);
  ellipse(xRocket, yRocket+30, 48, 48);

  //finire contesto di disengo
pop(); }

function moveRocket(yRocket, step=1) {
  yRocket = yRocket - step;
  let soglia = yMax * 0.6;
  if (yRocket < soglia) {
    yRocket = yMax;
  } 
return yRocket}

function draw() {
  background(60,60,134); //cambiato colore cambiando valore nelle parentesi
  fill (255); //mostra testo bianco che dice le coordinate del muose sul foglio da disegno
  text ("mouseX:" + mouseX + ", mouseY: " + mouseY,20,20); 
  //stringa da mostrare, posizione x e posizione y
  //circle(77.5, 193, 40);
  //triangle(40, 150, 77.5, 75, 115, 151);

push(); //nuovo contesto di disengo per le stelle
//disegnare 120 stelle
// tre tipi di stelle: a, b, c
//stelle elipse 
//dopo ongi stella di tipo a ne voglio una b e poi c e poi da capo a

//proviamo a fare tre cicli diversi uno per ogni tipo di stella
//e poi per ogni stella coordinate random, però non garantisce l'ordine ma proviamo!

//for(let i=0; i<40; i++){
//  fill(255, 255, 150); //150 è trasparenza
//  ellipse (5,5,1);
//} //ma così non va bene perchè le coordinate devono variare--abbiamo bisogno di variabili di supporto

//ciclo stella a
//for(let i=0; i<40; i++){
 // let starX = (i*37) % width + (i%3)*5; //parentesi servono per specificare eventuali ordini di precedenza
  //let starY = (i*73) % height + (i%7);  
  //fill(255, 255, 150); //150 è trasparenza
  //ellipse (starX,starY,1);
//}

//ciclo stella b
//for(let i=0; i<40; i++){
  //let starX = (i*37) % width + (i%3)*5; //parentesi servono per specificare eventuali ordini di precedenza
  //let starY = (i*73) % height + (i%7);  
  //fill(200, 100, 255); //150 è trasparenza
  //ellipse (starX,starY,1);
//}
//ma hanno lo stesso centro e quindi non funziona

//creare una sequenza per fare a, b, c sfruttando la selezione, cioè fare delle cose in maniera condizionale

//ciclo stella a
//for(let i=0; i<120; i++){
  //let starX = (i*37) % width + (i%3)*5; //parentesi servono per specificare eventuali ordini di precedenza
  //let starY = (i*73) % height + (i%7);
  
  //if(i == 0) { //stella a
      //fill(255, 255, 150); //150 è trasparenza
      //ellipse (starX,starY,1);
  //}
  
  //else if(i == 1) { //stella b
        //fill(200, 100, 255); //150 è trasparenza
        //ellipse (starX,starY,1.5);
  //}

  //else { //stella c
        //fill(255, 255, 100); //150 è trasparenza
        //ellipse (starX,starY,2.8);
  //}

//} //però così stiamo sempre ripetendo la stella c!!!

drawStars(120);

//finire contesto di disengo 

pop();
 drawRocket(xRocket, yRocket);

 drawStarsFromFile()

yRocket = moveRocket(yRocket, 1); 

}

