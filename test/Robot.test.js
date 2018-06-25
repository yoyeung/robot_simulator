import Robot from '../src/core/Robot';

import ERROR from '../src/core/errorCode';

let robot ;
describe('Sample Data test case', () => {
  const success = { result: 'ok' };

  beforeEach(()=> {
    robot = new Robot();
  });
  test('Example A', () => {
    const data = ['PLACE 0,0,NORTH', 'MOVE', 'REPORT'];
    expect(robot.addCommand(data[0])).toEqual(success);
    expect(robot.addCommand(data[1])).toEqual(success);
    expect(robot.addCommand(data[2])).toEqual({ result: [0,1,'NORTH'] });
  });
  
  test('Example B', () => {
    const data = ['PLACE 0,0,NORTH', 'LEFT', 'REPORT'];
    expect(robot.addCommand(data[0])).toEqual(success);
    expect(robot.addCommand(data[1])).toEqual(success);
    expect(robot.addCommand(data[2])).toEqual({ result: [0,0,'WEST'] });
  });
  
  test('Example C', () => {
    const data = ['PLACE 1,2,EAST',
    'MOVE',
    'MOVE',
    'LEFT',
    'MOVE',
    'REPORT'];
    expect(robot.addCommand(data[0])).toEqual(success);
    expect(robot.addCommand(data[1])).toEqual(success);
    expect(robot.addCommand(data[2])).toEqual(success);
    expect(robot.addCommand(data[3])).toEqual(success);
    expect(robot.addCommand(data[4])).toEqual(success);
    expect(robot.addCommand(data[5])).toEqual({ result: [3,3,'NORTH'] });
  });
  
  test('Example D ignore the command which missing a validate PLACE command', () => {
    const data = [
    'MOVE',
    'MOVE',
    'LEFT',
    'PLACE 1,2,EAST',
    'MOVE',
    'REPORT'];
    expect(robot.addCommand(data[0])).toEqual({ error: ERROR.MISSINIT });
    expect(robot.addCommand(data[1])).toEqual({ error: ERROR.MISSINIT });
    expect(robot.addCommand(data[2])).toEqual({ error: ERROR.MISSINIT });
    expect(robot.addCommand(data[3])).toEqual(success);
    expect(robot.addCommand(data[4])).toEqual(success);
    expect(robot.addCommand(data[5])).toEqual({ result: [2,2,'EAST'] });
  });

//   test('It will ignore the command which over the boundary', () => {
//     const data = ['PLACE 1,2,EAST',
//     'MOVE',
//     'MOVE',
//     'MOVE',
//     'MOVE',
//     'RIGHT',
//     'REPORT'];
//     expect(processer(data)).toEqual('4,2,SOUTH');
//   });

  test('Place a wrong direction', () => {
    const data = ['PLACE 0,0,NORTHS', 'MOVE', 'REPORT'];
    expect(robot.addCommand(data[0])).toEqual({ error: ERROR.INCORRECTDIRECTION });
    expect(robot.addCommand(data[1])).toEqual({ error: ERROR.MISSINIT });
    expect(robot.addCommand(data[2])).toEqual({ error: ERROR.MISSINIT });
  });
  
});


describe('isValidLocation', () => {
  beforeEach(()=> {
    robot = new Robot();
  })
  test('x is -1', () => {
    expect(robot._isValidLocation([-1,0,'NORTH'])).toBeFalsy();
  });
  test('x is bigger than boundary', () => {
    expect(robot._isValidLocation([5,0,'NORTH'])).toBeFalsy();
  });
  test('y is -1', () => {
    expect(robot._isValidLocation([0,-1,'NORTH'])).toBeFalsy();
  });
  test('y is bigger than boundary', () => {
    expect(robot._isValidLocation([0,5,'NORTH'])).toBeFalsy();
  });
  test('valid case', () => {
    expect(robot._isValidLocation([0,0,'NORTH'])).toBeTruthy();
  });
  test('valid case', () => {
    expect(robot._isValidLocation([4,0,'NORTH'])).toBeTruthy();
  });
  test('valid case', () => {
    expect(robot._isValidLocation([0,4,'NORTH'])).toBeTruthy();
  });
});

describe('Turn left action', () => {
  beforeEach(()=> {
    robot = new Robot();
  })
  test('from north to west', () => {
    robot.addCommand('PLACE 3,3,NORTH');
    expect(robot._turnLeftAction()).toEqual([3, 3, 'WEST']);
  });
  test('from west to south', () => {
    robot.addCommand('PLACE 3,3,WEST');
    expect(robot._turnLeftAction()).toEqual([3, 3, 'SOUTH']);
  });
  test('from south to east', () => {
    robot.addCommand('PLACE 3,3,SOUTH');
    expect(robot._turnLeftAction()).toEqual([3, 3, 'EAST']);
  });
  test('from east to north', () => {
    robot.addCommand('PLACE 3,3,EAST');
    expect(robot._turnLeftAction()).toEqual([3, 3, 'NORTH']);
  });
});

describe('Turn Right action', () => {
  beforeEach(()=> {
    robot = new Robot();
  })
  test('from north to west', () => {
    robot.addCommand('PLACE 3,3,NORTH');
    expect(robot._turnRightAction()).toEqual([3, 3, 'EAST']);
  });
  test('from west to south', () => {
    robot.addCommand('PLACE 3,3,EAST');
    expect(robot._turnRightAction()).toEqual([3, 3, 'SOUTH']);
  });
  test('from south to east', () => {
    robot.addCommand('PLACE 3,3,SOUTH');
    expect(robot._turnRightAction()).toEqual([3, 3, 'WEST']);
  });
  test('from east to north', () => {
    robot.addCommand('PLACE 3,3,WEST');
    expect(robot._turnRightAction()).toEqual([3, 3, 'NORTH']);
  });
});

describe('Move action', () => {
  beforeEach(()=> {
    robot = new Robot();
  })
  test('move to north', () => {
    robot.addCommand('PLACE 3,3,NORTH');
    expect(robot._moveAction([3, 3, 'NORTH'])).toEqual([3, 4, 'NORTH']);
  });
  test('move to east', () => {
    robot.addCommand('PLACE 3,3,EAST');
    expect(robot._moveAction([3, 3, 'EAST'])).toEqual([4, 3, 'EAST']);
  });
  test('move to south', () => {
    robot.addCommand('PLACE 3,3,SOUTH');
    expect(robot._moveAction([3, 3, 'SOUTH'])).toEqual([3, 2, 'SOUTH']);
  });
  test('move to west', () => {
    robot.addCommand('PLACE 3,3,WEST');
    expect(robot._moveAction([3, 3, 'WEST'])).toEqual([2, 3, 'WEST']);
  });
});

describe('Command Handler', () => {
  beforeEach(()=> {
    robot = new Robot();
  })
  test('PLACE command', () => {
    expect(robot._commandHandler('PLACE 3,3,EAST')).toEqual([3, 3, 'EAST']);
  });
  test('MOVE command', () => {
    robot.addCommand('PLACE 3,3,EAST');
    expect(robot._commandHandler('MOVE')).toEqual([4, 3, 'EAST']);
  });
  test('LEFT command', () => {
    robot.addCommand('PLACE 3,3,SOUTH');
    expect(robot._commandHandler( 'LEFT')).toEqual([3, 3, 'EAST']);
  });
  test('RIGHT command', () => {
    robot.addCommand('PLACE 3,3,WEST');
    expect(robot._commandHandler('RIGHT')).toEqual([3, 3, 'NORTH']);
  });
  test('invalid command', () => {
    robot.addCommand('PLACE 3,3,NORTH');
    expect(robot._commandHandler()).toEqual(new Error(ERROR.CMDNOTFOUND.msg));
  });
});
