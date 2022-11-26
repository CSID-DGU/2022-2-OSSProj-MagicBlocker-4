const gulp = require('gulp');
const gulp_concat = require('gulp-concat');

function job(){
    return gulp.src(['server_data/**/*.js','server_app/**/*.js'])
    .pipe(gulp_concat('gameserver.js'))
    .pipe(gulp.dest('./'));
}

gulp.task('default',job);