

/*---------------------FUNCTIONS---------------------*/
function getBlankGrid(xLength = 2,yLength = 2) {
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
      else if (neighbours > 3) { return false; }
      else { return false; }
    });
  });
  return newGrid;
}

function getNewGrid(currentGrid) {
  let neighbourGrid = getNeighbourGrid(currentGrid);
  return calcNewGrid(currentGrid, neighbourGrid);
}



: = references and mutates 'play' variable. = //
: = grabs 'cycles' variable from input element. = //
: = updates messageBar element. = //

function runGame(startGrid) {
  if(!play){
      let cycle = 1;
      let cycleLimit = document.getElementById('cycles').value;
      if (cycleLimit == 0){ cycleLimit = 60;}
      let currentGrid = startGrid;
      play = true;
      setInterval(() => {
          if (play && cycle <= cycleLimit){
            let newGrid = getNewGrid(currentGrid);
            updateGrid(newGrid);
            currentGrid = newGrid;
            messageBar.innerHTML = `Cycle: ${cycle}`;
            cycle++
          } else {return;}
      }, 1000);
      messageBar.innerHTML = "Game Complete";
  }
};

// ========= INPUT/EVENTS  ========= //

const cellOnClick = (grid) => {
  play = play ? false : false;
  updateGrid(grid);
};

// Updates data grid based on DOM grid state.
function updateGrid(grid) {
  grid.forEach(function(row, rowIndex, grid){
    row.forEach(function(cell, cellIndex, row){
      const domCell = document.getElementById(`checkbox${rowIndex}-${cellIndex}`);
      cell = domCell.checked ? true : false;
    });
  });
}

// ========= OUTPUT ========= //
function renderDOMGrid(grid){
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

function updateDOMGrid(newGrid){
  console.log('in update DOM grid');
  console.log(newGrid);
  newGrid.forEach(function(row, rowIndex, grid){
    row.forEach(function(cell, cellIndex, row){
      const domCell = document.getElementById(`checkbox${rowIndex}-${cellIndex}`);
      domCell.checked = cell ? true : false;
    });
  });
}

let play, grid, world, cells, start, pause, reset, messageBar;

// ========= GAMEPLAY ========= //

document.addEventListener("DOMContentLoaded", function() {
  let play = false;
  let grid = getBlankGrid();
  renderDOMGrid(grid);

  const world = document.getElementById('world');
  const cellInputs = document.getElementsByClassName('cell__input');
  const start = document.getElementById('start');
  const pause = document.getElementById('pause');
  const reset = document.getElementById('reset');
  // const messageBar = document.getElementById('messageBar');

  [...cellInputs].forEach(cellInput => cellInput.addEventListener('click', function(){
    cellOnClick(grid);
  }));

  start.addEventListener('click', function(){
    runGame(grid);
  });

  pause.addEventListener('click', function(){
    play = play ? false : true;
  });

  reset.addEventListener('click', function(){
    play = play ? false : false;
    const freshGrid = getBlankGrid();
    console.log(freshGrid);
    updateDOMGrid(freshGrid);
  });
});



// ========= LOCAL STORAGE ========= //
// function getSavedGrids(){
//   return savedGrids = JSON.parse(localStorage.getItem('grids'));
//   }
//
// function listSavedGrids(savedGrids) {
//   const fragment = document.createDocumentFragment();
//   savedGrids.forEach(grid => {
//     const el = document.createElement('li');
//     el.setContent(grid.name);
//     el.setAttribute('class','savedGrid');
//     fragment.appendChild(el);
//   });
//   savedGridsList.appendChild(fragment);
// }
//
// const savedGrids = getSavedGrids();
// listSavedGrids(savedGrids);
//
// function saveGrid(name, grid) {
//   newGrid = {
//     name,
//     grid,
//   }
//   let newGridsList = getSavedGrids().push(newGrid);
//   localStorage.setItem('grids', JSON.stringify(newGridsList));
// }



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
