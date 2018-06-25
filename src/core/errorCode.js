const error = {
  MISSINIT: {
    code: 'E001', // missing place initial location
    msg: 'Place a robot location first'
  },
  CMDNOTFOUND: {
    code: 'E002', // command not found
    msg: 'Command not found'
  }, 
  INCORRECTDIRECTION: {
    code: 'E003', // incorrect direction
    msg: 'Incorrect direction'
  }, 
  CMDREJECT: {
    code: 'E004', // command reject because it will fall down
    msg: 'Command Reject. robot near by edge.'
  }, 
};

export default error;