let cols,rows,sand,water,wood,fire0,fire1,fire2,stone;
let cells = [];
let material = 0;

function setup() {
  selector = document.getElementById("particle-canvas");
  let canvas = createCanvas(Math.round(selector.clientWidth/10)*10, Math.round(selector.clientHeight/10)*10);
  cols = width/10;
  rows = height/10;
  sand = color(241, 224, 24);
  water = color(78, 158, 212);
  wood = color(128, 73, 10);
  fire0 = color(246, 54, 22);
  fire1 = color(247, 95, 22);
  fire2 = color(247, 176, 22);
  stone = color(130,130,130);
  frameRate(28);
  canvas.parent("particle-canvas");
}

function windowResized() {
  selector = document.getElementById("particle-canvas");
  canvas = createCanvas(Math.round(selector.clientWidth/10)*10, Math.round(selector.clientHeight/10)*10);
  canvas.parent("particle-canvas");
  cols = width/10;
  rows = height/10;
}

function draw() {
  background('white');
  push();
  stroke("black");
  strokeWeight(15);
  line(0, selector.clientHeight - 5, selector.clientWidth + 20, selector.clientHeight - 5);
  pop();
  
  if(mouseIsPressed){
    let mX = Math.round(mouseX/10)*10;
    let mY = Math.round(mouseY/10)*10;
    if(mX > 0 && mX < width && mY > 0 && mY < height){
      let inCell = false;
      for(let i = 0; i < cells.length; i++){
        if(mX == cells[i].x && mY == cells[i].y){
          inCell = true;
        }
      }
      if(!inCell){
        if(material == 0){
          newCell(0,mX,mY,-1,100);
        }
        if(material == 1){
          newCell(1,mX,mY,-1,100);
        }
        if(material == 3){
          newCell(3,mX,mY,50,100);
        }
        if(material == 4){
          newCell(4,mX,mY,-1,100);
        }
        if(material == 5){
          newCell(5,mX,mY,-1,100);
        }
      } else {
        if(material == 2){
          for(let i = 0; i < cells.length; i++){
            if(cells[i].x == mX && cells[i].y == mY){
              cells.splice(i,1);
            }
          }
        }
      }
    }
  }
  for(let i = 0; i < cells.length; i++){
    if(cells[i].material == 0){
      fill(sand);
      stroke(sand);
    }
    if(cells[i].material == 1){
      fill(water);
      stroke(water);
    }
    if(cells[i].material == 3){
      fill(wood);
      stroke(wood);
    }
    if(cells[i].material == 4){
      let num = Math.round(Math.random(1)*10);
      if(num >= 0 && num < 3){
        fill(fire0);
        stroke(fire0);
      } else if(num >= 3 && num < 7){
        fill(fire1);
        stroke(fire1);
      } else if(num >= 7 && num < 11){
        fill(fire2);
        stroke(fire2);
      }
    }
    if(cells[i].material == 5){
      fill(stone);
      stroke(stone);
    }
    square(cells[i].x,cells[i].y,10);
  }
  if(cells.length >= 0){
    for(let i = 0; i < cells.length; i++){
      if(cells[i].health <= 0){
        cells.splice(i,1);
        break;
      }
      let iX = cells[i].x;
      let iY = cells[i].y;
      if(cells[i].material == 0){
        let left, right, bottom;
        for(let e = 0; e < cells.length; e++){
          if(cells[e].y == cells[i].y+10 && cells[e].x == cells[i].x && cells[e].material == 1){
            cells[e].y -= 10;
          } else {
            if(cells[e].x == cells[i].x-10 && cells[e].y == cells[i].y+10 || cells[i].y == height-10 || cells[i].x == 0){
            left = true;
          }
          if(cells[e].x == cells[i].x+10 && cells[e].y == cells[i].y+10 || cells[i].y == height-10 || cells[i].x == width-10){
            right = true;
          }
          if(cells[e].y == cells[i].y+10 && cells[e].x == cells[i].x || cells[i].y == height-10){
            bottom = true;
          }
          }
        }
        if(!bottom){
          cells[i].y += 10;
        } else if(!right && !left){
          let num = Math.round(Math.random(1));
          if(num == 1){
            cells[i].x -= 10;
            cells[i].y += 10;
          } else {
            cells[i].x += 10;
            cells[i].y += 10;
          }
        } else if(!left){
          cells[i].x -= 10;
          cells[i].y += 10;
        } else if(!right){
          cells[i].x += 10;
          cells[i].y += 10;
        }
      }
      if(cells[i].material == 1){
        let left, right, down;
        for(let e = 0; e < cells.length; e++){
          if(cells[e].x == cells[i].x && cells[e].y == cells[i].y+10 || cells[i].y == height-10){
            down = true;
          }
          if(cells[e].x == cells[i].x-10 && cells[e].y == cells[i].y || cells[i].x == 0){
            left = true;
          }
          if(cells[e].x == cells[i].x+10 && cells[e].y == cells[i].y || cells[i].x == width-10){
            right = true;
          }
        }
        if(!down){
          cells[i].y += 10;
        } else if(!left && !right){
          let num = Math.round(Math.random(1));
          if(num == 1){
            cells[i].x -= 10;
          } else {
            cells[i].x += 10;
          }
        } else if(!left){
          cells[i].x -= 10;
        } else if(!right){
          cells[i].x += 10;
        }
      }
      if(cells[i].material == 4){
        let nextToWood,left,right,up,down;
        for(let e = 0; e < cells.length; e++){
          let eX = cells[e].x;
          let eY = cells[e].y;
          if(cells[e].material == 3){
            if(eX == iX + 10 && eY == iY){
              cells[e].health -= 2;
              nextToWood = true;
              break;
            } else if(eX == iX - 10 && eY == iY){
              cells[e].health -= 2;
              nextToWood = true;
              break;
            } else if(eX == iX && eY == iY + 10){
              cells[e].health -= 2;
              nextToWood = true;
              break;
            } else if(eX == iX && eY == iY - 10){
              cells[e].health -= 2;
              nextToWood = true;
              break;
            }
          } else {
            if(eX == iX + 10 && eY == iY || iX == width-10){
              right = true;
              break;
            } else if(eX == iX - 10 && eY == iY || iX == 0){
              left = true;
              break;
            } else if(eX == iX && eY == iY + 10 || iY == height-10){
              down = true;
              break;
            } else if(eX == iX && eY == iY - 10 || iY == 0){
              up = true;
              break;
            }
          }
        }
        if(!nextToWood){
          cells[i].health -= 2;
          if(!left && !right && !up && !down){
            let num = Math.round(Math.random(1)*100);
            if(num >= 0 && num < 25){
              cells[i].x += 10;
            } else if(num >= 25 && num < 50){
              cells[i].x -= 10;
            } else if(num >= 50 && num < 75){
              cells[i].y += 10;
            } else if(num >= 75 && num < 101){
              cells[i].y -= 10;
            }
          } else if(!left){
            cells[i].x -= 10;
          } else if(!up){
            cells[i].y -= 10;
          } else if(!right){
            cells[i].x += 10;
          } else if(!down){
            cells[i].y += 10;
          }
        }
      }
    }
  }
}

function newCell(m,x,y,f,h){
  cells.push({material:m,x:x,y:y,flamability:f,health:h});
}