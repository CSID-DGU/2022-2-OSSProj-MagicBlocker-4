const gulp = require('gulp');
const gulp_concat = require('gulp-concat');

function job(){
    return gulp.src(['scripts/*.js'])
    .pipe(gulp_concat('gameclient.js'))
    .pipe(gulp.dest('./'));
}

gulp.task('default',job);