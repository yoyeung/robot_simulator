# Getting Started

## Install and support

Support Node 8 or upper

yarn or npm install for npm package.

## Env setting

XMAX for change the size for square table x

YMAX for change the size for square table y

### Sample
> XMAX=10 YMax=10 npm run start

## Command

### Start dev service
Start a command mode in dev
> npm run start:dev

Start compiled command mode
> npm run start


### Test command
> npm run test

> npm run test:sampleData

> npm run test:watch

Check coverage
> npm run coverage

### Build and Clean command

> npm run build

> npm run clean


## Non-functional requirements explain

1. There have a NewRobot.js file which is going to show you how to enhance the Robot for future feature update.

2. Robot logic is isolated from the main function. So that mean you can easily to import this Robot library into any cloud service which you want to apply.
