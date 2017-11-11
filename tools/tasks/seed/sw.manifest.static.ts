import * as gulp from 'gulp';
import * as util from 'gulp-util';
import Config from '../../config';

function reportError(message: string) {
  console.error(util.colors.white.bgRed.bold(message));
  process.exit(1);
}

export = () => {
  let exec = require('child_process').exec;

  // Create ngsw.json contorl file from config file using
  // @angular/service-worker's NGSW CLI
  exec('node_modules/.bin/ngsw-config ' + Config.APP_DEST + ' ./src/client/ngsw-config.json', function(
    error: Error,
    stdout: NodeBuffer,
    stderr: NodeBuffer
  ) {
    if (error !== null) {
      reportError('Angular Service Worker config error: ' + error + stderr);
    } else {
      console.log('Angular Service Worker config success');
    }
  });

  // Copy @angular/service-worker's ngsw-worker.js to dist
  return gulp.src(['node_modules/@angular/service-worker/ngsw-worker.js']).pipe(gulp.dest(Config.APP_DEST));
};
