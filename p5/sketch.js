function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noCursor(); // nascoondere cursore mouse 
}

function draw() {
  // ricordati che forse lo vuoi levare sto coso, il cerchio che segue il mouse è un po' trash
  noStroke();
  fill(0, 50);
  ellipse(mouseX, mouseY, 10, 10);
}

function mouseMoved() {
  // ogni movimento genera una forma casuale
  drawRandomShape(mouseX, mouseY);
}

function keyPressed() {
  // ogni pressione di tasto genera forme casuali
  for (let i = 0; i < 5; i++) {
    drawRandomShape(random(width), random(height));
  }
} // potrei pensare di codificare le lettere in forme? la macchina che parla 

function drawRandomShape(x, y) {
  const tipo = int(random(4)); // genera un numero intero da 0 a 3, per scegliere casualmente la forma
  const c = color(random(255), random(255), random(255), random(100, 255)); // colore casuale, l'ultima è la trasparenzassss
  fill(c);
  stroke(random(255), random(255), random(255));
  strokeWeight(random(1, 5));

  const w = random(10, 150);
  const h = random(10, 150);

  switch (tipo) {
    case 0:
      ellipse(x, y, w, h);
      break;
    case 1:
      rect(x, y, w, h);
      break;
    case 2:                                                       //pazzo
      line(x, y, x + random(-100, 100), y + random(-100, 100));
      break;
    case 3:
      beginShape();                                   //crazy, genera vertici casuali come il pazzo e così mi fa forme strane forti 
      for (let i = 0; i < int(random(3, 8)); i++) {     
        vertex(x + random(-w, w), y + random(-h, h));
      }
      endShape(CLOSE);
      break;
  }
}

// per ridimenzionare la tela quando la finestra cambia dimensione
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}  

// gli informatici hanno pessime idee per disegnare, scaricatevi illustrator o photoshop pls
// capisci perché il codice snobba l'angolo in alto a sinistra!!!!!!
// "xRocket è la scienza della casualità, l'anarchia del caos" cit. Malatesta 