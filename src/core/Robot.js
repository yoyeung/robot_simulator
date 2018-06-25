"use strict";
import ERROR from './errorCode';

const XMAX = process.env.XMAX || 5;
const YMAX = process.env.YMAX || 5;

export default class Robot {
  constructor() {
    this.location = [];
    this.DIRECTION = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    this.COMMAND = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];
    // this.COMMANDS = {
    //   'PLACE' : this._placeAction,
    //   'MOVE' : this._moveAction,
    //   'LEFT' : this._turnLeftAction,
    //   'RIGHT' : this._turnRightAction,
    //   'REPORT' : this._placeAction,
    // }
  }
  
  _isValidLocation([x, y, direction]) {
    // make sure x, y is within the square table
    if (x < 0 || y < 0 || x > XMAX - 1 || y > YMAX - 1) {
      return false;
    }
    return true;
  }

  _placeAction(src) {
    const [x, y, direction] = src.split(',');
    // check and make sure it's a valid direction.
    if (this.DIRECTION.indexOf(direction) === -1) {
      let err = new Error(ERROR.INCORRECTDIRECTION.msg);
      err.name = ERROR.INCORRECTDIRECTION.code
      return err;
    } 
    return [parseInt(x), parseInt(y), direction];
  }

  _moveAction() {
    const [x, y, direction] = this.location;
    switch (direction) {
      case 'NORTH':
      return [x, y+1, direction];
      
      case 'EAST':
      return [x+1, y, direction];
      
      case 'SOUTH':
      return [x, y-1, direction];
      
      case 'WEST':
      return [x-1, y, direction];
    }
  }

  _turnLeftAction() {
    const [x, y, direction] = this.location;
    const index = this.DIRECTION.indexOf(direction);
    if (index - 1 < 0 ) {
      return [x, y, this.DIRECTION[this.DIRECTION.length - 1]];
    }
    return [x, y, this.DIRECTION[index - 1]];
  }

  _turnRightAction() {
    const [x, y, direction] = this.location;
    const index = this.DIRECTION.indexOf(direction);
    if (index + 1 > this.DIRECTION.length -1 ) {
      return [x, y, this.DIRECTION[0]];
    }
    return [x, y, this.DIRECTION[index + 1]];
  }

  _commandHandler(instruction = '') {
    const _instruction = instruction.toUpperCase();
    const [command, extra] = _instruction.split(' ');
    const index = this.COMMAND.indexOf(command);
    if (this.location.length === 0 && index !== 0) { // for the case which missing a valide place command;
      let err = new Error(ERROR.MISSINIT.msg);
      err.name = ERROR.MISSINIT.code
      return err;
    }
    let result = this.location;
    switch (index) {
      case 0:
      result = this._placeAction(extra);
      break;
      case 1:
      result = this._moveAction();
      break;
      case 2:
      result = this._turnLeftAction();
      break;
      case 3:
      result = this._turnRightAction();
      break;
      case 4:
      break;
      default:
      let err = new Error(ERROR.CMDNOTFOUND.msg);
      err.name = ERROR.CMDNOTFOUND.code
      result = err;
    }
    return result;
  }


  addCommand(input) {
    const isReport = input.toUpperCase() === 'REPORT';
    let result = this._commandHandler(input);
    if (!(result instanceof Error) && this._isValidLocation(result)) {
      this.location = result;
      return isReport ? { result: this.location } : { result: 'ok' };
    } else if (result instanceof Error) {
      return { error: { msg: result.message, code: result.name } };
    } else { // for the case robot who near by the edge.
      return { error: { msg: ERROR.CMDREJECT.msg, code: ERROR.CMDREJECT.code } };
    }
  }
};



