const assert = require('assert');
const game = require('../game.js');


describe('Game', function(){

  it('can create a blank grid of 100*100 by default', function(){
    const largeGrid = game.getBlankGrid();
    // console.log(largeGrid);
    assert.strictEqual(largeGrid[0].length, 100);
    assert.strictEqual(largeGrid.length, 100);
  });

  it('can create a blank grid of 4 long * 5 high (for testing)', function(){
    const smallGrid = game.getBlankGrid(4,5);
    console.log(smallGrid);
    assert.strictEqual(smallGrid[0].length, 4);
    assert.strictEqual(smallGrid.length, 5);
  });

  it('can make cells alive',function(){
    const smallGrid = game.getBlankGrid(4,5);
    smallGrid[0][3] = true;
    smallGrid[1][2] = true;
    smallGrid[1][1] = true
    smallGrid[1][0] = true;
    smallGrid[2][0] = true;
    smallGrid[3][0] = true;
    assert.strictEqual(smallGrid[1][1],true);
    assert.strictEqual(smallGrid[1][3],false);
    assert.strictEqual(smallGrid[3][1],false);
  });

  it('can return neighbour grid based on current grid',function(){
    const smallGrid = game.getBlankGrid(5,5);
    smallGrid[0][0] = true;
    smallGrid[0][2] = true;
    smallGrid[0][4] = true
    smallGrid[2][0] = true;
    smallGrid[2][2] = true;
    smallGrid[2][4] = true;
    smallGrid[4][0] = true;
    smallGrid[4][2] = true;
    smallGrid[4][3] = true;
    smallGrid[4][4] = true;
    const result = game.getNeighbourGrid(smallGrid);
    console.log(result);
  });

  it('can create new grid based on neighbour grid and current grid',function(){
    const smallGrid = game.getBlankGrid(5,5);
    smallGrid[0][0] = true;
    smallGrid[0][2] = true;
    smallGrid[0][4] = true
    smallGrid[2][0] = true;
    smallGrid[2][2] = true;
    smallGrid[2][4] = true;
    smallGrid[4][0] = true;
    smallGrid[4][2] = true;
    smallGrid[4][3] = true;
    smallGrid[4][4] = true;
    const neighbourGrid = game.getNeighbourGrid(smallGrid);
    const newGrid = game.calcNewGrid(smallGrid,neighbourGrid);
    console.log(newGrid);
  });

  it('can take in current grid and return new grid',function(){
    const smallGrid = game.getBlankGrid(5,5);
    smallGrid[0][0] = true;
    smallGrid[0][2] = true;
    smallGrid[0][4] = true
    smallGrid[2][0] = true;
    smallGrid[2][2] = true;
    smallGrid[2][4] = true;
    smallGrid[4][0] = true;
    smallGrid[4][2] = true;
    smallGrid[4][3] = true;
    smallGrid[4][4] = true;
    const autoedNewGrid = game.getNewGrid(smallGrid);
    console.log(autoedNewGrid);
  });

});
