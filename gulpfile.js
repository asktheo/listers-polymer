var gulp = require('gulp');
var replace = require('gulp-replace');
 
gulp.task('default', function(){
  gulp.src(['build/theori/src/checklist-view.js','build/theori/src/profile-view.js','build/theori/src/profiles-view.js'])
    .pipe(replace('http://localhost:8080', ''))
    .pipe(gulp.dest('build/theori/src2'));
});

