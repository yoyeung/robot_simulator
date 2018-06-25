import readline from 'readline';
import ERROR from './core/errorCode';
import Robot from './core/Robot';

const robot = new Robot();
const totalPauseTime = 5 ; // second, For how long for pause

let isPause = false;
let offlineTimer ;

const rd = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

rd.setPrompt("Please type in command line by line, or 'exit' to exit > ");
rd.prompt(true);

rd.on('line', function(line) {
  if (!line) return;
  if (line === 'exit') { 
    rd.close();
    process.exit();
  }
  if(!isPause){
    msgFormatter(robot.addCommand(line));
  }
  
});

function msgFormatter(result) {
  if (result.error) {
    if (result.error.code === ERROR.CMDREJECT.code) {
      console.log(ERROR.CMDREJECT.msg);
    } else {
      console.log(`Command Fail, Robot offline ${totalPauseTime} seconds`);
      isPause = true;
      offlineTimer = setTimeout(() => {
        isPause = false;
        console.log('Robot online again');
      }, totalPauseTime * 1000);
    }
    
  } else {
    result.result === 'ok' ? console.log('Command Accept') : console.log(`Robot location : ${result.result.join(', ')}`);
  }
}