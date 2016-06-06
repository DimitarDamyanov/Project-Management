/**
 * Created by D on 29.4.2016 ã..
 */
// Gulpfile.js
var gulp = require('gulp')
    , nodemon = require('gulp-nodemon')
    , jshint = require('gulp-jshint')

gulp.task('lint', function () {
    gulp.src('./public/*.js')
        .pipe(jshint())
})

gulp.task('develop', function () {
    nodemon({
        script: 'app.js'
        , ext: 'html js'
        , ignore: ['./node_modules/**']
        , tasks: ['lint']
    })
        .on('restart', function () {
            console.log('restarted!')
        })
})


gulp.task('default', ['lint', 'develop']);