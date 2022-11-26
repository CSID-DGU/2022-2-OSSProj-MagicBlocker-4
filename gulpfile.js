const gulp = require('gulp');
const gulp_concat = require('gulp-concat');

function job(){
<<<<<<< HEAD
    return gulp.src(['server_data/**/*.js','server_app/**/*.js'])
    .pipe(gulp_concat('gameserver.js'))
    .pipe(gulp.dest('./'));
=======
    return gulp.src(['server/**/*.js','app.js'])
    .pipe(gulp_concat('completeApp.js'))
    .pipe(gulp.dest('./'));

>>>>>>> 66b9ba5 ([22.11.13](Feat))
}

gulp.task('default',job);