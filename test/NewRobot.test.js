import NewRobot from '../src/NewRobot';

let robot ;
describe('Sample Data test case for NewRobot', () => {
  const success = { result: 'ok' };

  beforeEach(()=> {
    robot = new NewRobot();
  });
  test('Example A', () => {
    const data = ['PLACE 0,0,NORTH', 'MOVE', 'REPORT'];
    expect(robot.addCommand(data[0])).toEqual(success);
    expect(robot.addCommand(data[1])).toEqual(success);
    expect(robot.addCommand(data[2])).toEqual({ result: [0,1,'NORTH'] });
  });
  
  test('Example B', () => {
    const data = ['PLACE 0,0,NORTH', 'RIGHT', 'MOVE', 'MOVE', 'BACK', 'REPORT'];
    expect(robot.addCommand(data[0])).toEqual(success);
    expect(robot.addCommand(data[1])).toEqual(success);
    expect(robot.addCommand(data[2])).toEqual(success);
    expect(robot.addCommand(data[3])).toEqual(success);
    expect(robot.addCommand(data[4])).toEqual(success);
    expect(robot.addCommand(data[5])).toEqual({ result: [1,0,'EAST'] });
  });
});
