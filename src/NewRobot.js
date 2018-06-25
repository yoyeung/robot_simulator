/*
* This is a Robot extend sample file.
*
*/
import Robot from './core/Robot';

export default class extends Robot {
  constructor() {
    super();
    this.COMMAND = this.COMMAND.concat('BACK');
  }

  _backAction(){
    const [x, y, direction] = this.location;
    switch (direction) {
      case 'NORTH':
      return [x, y-1, direction];
      
      case 'EAST':
      return [x-1, y, direction];
      
      case 'SOUTH':
      return [x, y+1, direction];
      
      case 'WEST':
      return [x+1, y, direction];
    }
  }

  _commandHandler(instruction = '') {
    let result = super._commandHandler(instruction);
    if (result instanceof Error) {
      const _instruction = instruction.toUpperCase();
      if (_instruction === 'BACK') {
        return this._backAction();
      }
    }
    return result;
  }
}