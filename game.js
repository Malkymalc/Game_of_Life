

/*---------------------FUNCTIONS---------------------*/
function getBlankGrid(xLength = 50, yLength = 50) {
    const rowMaker = () => {
        const cellMaker = () => false;
        const row = Array.from({length: xLength},cellMaker);
        return row;
    }
    const blankGrid = Array.from({length: yLength}, rowMaker);
    return blankGrid;
}

function getNeighbourGrid(currentGrid){
  neighbourGrid = currentGrid.map(function(row,rowIndex,grid){
    return row.map(function(cell, cellIndex, row){
        var neighbours = 0;
        if (rowIndex != 0){
          //count live neighbours above if cell not in top row
          if ( grid[rowIndex-1][cellIndex-1])  {neighbours +=1 }
          if ( grid[rowIndex-1][cellIndex] )   {neighbours +=1 }
          if ( grid[rowIndex-1][cellIndex+1])  {neighbours +=1 }
        }
        // count neighbourss either side
        if ( grid[rowIndex][cellIndex-1] )   {neighbours +=1 }
        if ( grid[rowIndex][cellIndex+1] )   {neighbours +=1 }
        if (rowIndex != (grid.length-1)){
          // count live neighbourss below if cell not in bottom row
          if ( grid[rowIndex+1][cellIndex-1])  {neighbours +=1 }
          if ( grid[rowIndex+1][cellIndex] )   {neighbours +=1 }
          if ( grid[rowIndex+1][cellIndex+1])  {neighbours +=1 }
        }
        return neighbours;
    });
  });
  return neighbourGrid;
}

function calcNewGrid(currentGrid, neighbourGrid) {
  newGrid = currentGrid.map(function(row, rowNum, grid){
    return row.map(function(cell, cellNum, row){
      alive = cell;
      neighbours = neighbourGrid[rowNum][cellNum];
      if (neighbours < 2) { return false; }
      else if (neighbours === 2 && alive) { return true; }
      else if (neighbours === 3 && alive) { return true; }
      else if (neighbours === 3 && !alive) { return true; }
      // else if (neighbours === 0 && !alive) { return true; }
      else if (neighbours === 4 && !alive) { return true; } //remove this
      else if (neighbours > 3) { return false; }            // change this?
      else { return false; }
    });
  });
  return newGrid;
}

function getNewGrid() {
  let neighbourGrid = getNeighbourGrid(grid);
  return calcNewGrid(grid, neighbourGrid);
}

function togglePlay(){
  play = play ? false : true;
}

function getFlatGrid(){
  return flatGrid = [].concat(...grid);
}

function cellCount(){
  const flatGrid = getFlatGrid();
  return result = flatGrid.reduce((acc,cell) => {
    return cell ? acc += 1 : acc;
  }, 0);
}

function runGame(cycles){
  if(!play){
    togglePlay();
    let cycleCount = (!cycles) ? Infinity : cycles;


    let id = setInterval(function(){
      if(cycleCount>0 && play === true){
          // console.log(`Hello ${cycleCount}`);
          // console.log(`${cellCount()} cells alive`);
          // console.log(`${( cellCount()*100 / (grid[0].length * grid.length) )} % of cells alive`);
          updateDOMGrid();
          grid = getNewGrid();
          console.log(`Cycle ${cycleCount} of ${cycles}`);
          cycleCount -= 1;
      } else {
          clearInterval(id);
          if(play) { togglePlay() };
        }
    }, 300);
    // messageBar.innerHTML = "Game complete";
  }
}


// ========= INPUT/EVENTS  ========= //

const cellOnClick = () => {
  play = play ? false : false;
  updateGrid();
};

function updateGrid() {
  let currentGrid = grid;
  currentGrid.forEach(function(row, rowIndex, grid){
    row.forEach(function(cell, cellIndex, row){
      const domCell = document.getElementById(`checkbox${rowIndex}-${cellIndex}`);
      grid[rowIndex][cellIndex] = domCell.checked ? true : false;
    });
  });
}

// ========= OUTPUT ========= //
function renderDOMGrid(grid){
  console.log(' in renderDOMGrid');
  const world = document.getElementById('world');
  const fragment = document.createDocumentFragment();
  grid.forEach(function(row, rowIndex, grid){
    row.forEach(function(cell, cellIndex, row){

      const div = document.createElement('div')
      div.setAttribute('class','cell');
      div.setAttribute('id',`${rowIndex}-${cellIndex}`);

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type','checkbox');
      checkbox.setAttribute('id',`checkbox${rowIndex}-${cellIndex}`);
      checkbox.setAttribute('class','cell__input');
      div.appendChild(checkbox);

      const label = document.createElement('label');
      label.setAttribute('for', `checkbox${rowIndex}-${cellIndex}`)
      label.setAttribute('class','cell__label');
      div.appendChild(label);

      fragment.appendChild(div);
    });
  });
  world.appendChild(fragment);
}

function updateDOMGrid(){
  grid.forEach(function(row, rowIndex, grid){
    row.forEach(function(cell, cellIndex, row){
      const domCell = document.getElementById(`checkbox${rowIndex}-${cellIndex}`);
      domCell.checked = cell ? true : false;
    });
  });
}

function initDataGrid(){
  grid = getBlankGrid();
};

function setPlayFalse(){
  play = false;
};

let play, grid, world, cells, start, pause, reset, messageBar;

//========= LOCAL STORAGE ========= //
function getSavedGrids(){
  return savedGrids = JSON.parse(localStorage.getItem('grids'));
};

function listSavedGrids(savedGrids) {
  const fragment = document.createDocumentFragment();
  savedGrids.forEach((grid,index) => {
    const el = document.createElement('option');
    const gridName = document.createTextNode(grid.name);
    el.appendChild(gridName);
    el.setAttribute('class','savedGrid');
    el.setAttribute('value',index);
    fragment.appendChild(el);
  });
  const dropdown = document.getElementById('select-grid');
  dropdown.appendChild(fragment);
}

function loadGrid(){
  const dropdown = document.getElementById('select-grid');
  const index = dropdown.value;
  grid = getSavedGrids()[index].grid;
  updateDOMGrid();
}

function saveGrid() {
  const saveName = document.getElementById('save-name').value;
  const saveGrid = JSON.parse(JSON.stringify(grid));
  const newGrid = {
    name: saveName,
    grid: saveGrid
  };
  let newGridsList = getSavedGrids().concat(newGrid);
  localStorage.setItem('grids', JSON.stringify(newGridsList));
  listSavedGrids(getSavedGrids());
}

// ========= GAMEPLAY ========= //

document.addEventListener("DOMContentLoaded", function() {
  if(localStorage.getItem('grids') === null) {
    localStorage.setItem('grids','[]');
  };
  listSavedGrids(getSavedGrids());

  setPlayFalse();
  initDataGrid();
  renderDOMGrid(grid);

  const start = document.getElementById('start');
  start.addEventListener('click', function(){
    runGame();
  });

  const pause = document.getElementById('pause');
  pause.addEventListener('click', function(){
    togglePlay();
  });

  const reset = document.getElementById('reset');
  reset.addEventListener('click', function(){
    play = play ? false : false;
    const freshGrid = getBlankGrid();
    updateDOMGrid(freshGrid);
  });

  const cellInputs = document.getElementsByClassName('cell__input');
  [...cellInputs].forEach(cellInput => cellInput.addEventListener('click', function(){ cellOnClick(); } ));

  const loadBtn = document.getElementById('load-grid');
  loadBtn.addEventListener('click',loadGrid);

  const saveBtn = document.getElementById('save-btn');
  saveBtn.addEventListener('click', saveGrid);

});


// ========= AUDIO STUFF ========= //











// get strings

// (25*4)*100 = 400 8 digit decimals
//
// const grid =
// const flatGrid = [].concat(...newGrid);
// const binaryString = flatGrid.map(bool => bool ? 1 : 0).join();
// //won't work as number to big for js
// //
// const decimal = parseInt(binary,2);
//


// ========= WORKSHOP ========= //

//-->  Time and Colour HSL(36*10);

// 2D - callback() has reference to



// ========= EACH ========= //
// function each2D(grid,callback) {
//   grid.forEach(function(row, rowIndex, grid){
//     row.forEach(function(cell, colIndex, row){
//       callback();
//     });
//   });
//   return result;
// }
//
// function each3D(grid,callback) {
//   grid.forEach(function(row, yIndex, grid){
//     row.forEach(function(column, xIndex, row){
//       column.forEach(function(cell, zIndex, columns){
//         callback();
//       });
//     });
//   });
// }


// ========= MAP - callback must return value ========= //
// function map2D(grid,callback) {
//   const result = grid.map(function(row, rowIndex, grid){
//     return row.map(function(cell, colIndex, row){
//       callback();
//     });
//   });
//   return result;
// }
//
// function map3D(grid,callback) {
//   const result = grid.map(function(row, yIndex, grid){
//     return row.map(function(column, xIndex, row){
//       return column.map(function(cell, zIndex, columns){
//         callback();
//       });
//     });
//   });
//   return result;
// }

// ========= Alternative render method ========= //
//   const domGrid = grid.map(function(row, rowIndex, grid){
//     return row.map(function(cell, cellIndex, row){
//       return `<div id="${rowIndex}-${cellIndex}" class="cell>
//                 <input type='checkbox'>
//                 <button></button>
//               </div>`
//     });
//   });
//   const domGridString = [].concat(...domGrid).join();
//   world.insertAdjacentHTML(afterbegining, domGridString);
// }



// So, with his game of life, you can do cool things like make glider guns. BUT what I'm wondering now is how the game of life would work if it was modified for a 3D space. For instance, what about if you played the Game of Life on a geodesic sphere? Of course, you'd be working with triangles instead of squares, so you'd have to tweak the rules. And there's different sizes for the geodesic sphere that you could use too... Hmm... You wouldn't be able to make an endless glider gun in this because it would wrap around. So I wonder if that means that all potential starting configurations would have stable end states (or a repeating loop). I think this would be really interesting to simulate. ﻿
