'use strict';

import gulp from 'gulp';
import connect from 'gulp-connect';
import livereload from 'gulp-livereload';
import sass from 'gulp-sass';
import ts from 'gulp-typescript';

gulp.task('connect', () => {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('html', () => {
  gulp.src('**/*.html')
    .pipe(livereload());
});

gulp.task('style', () => {
  gulp.src('./src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dest/css'));
});

gulp.task('behaviour', () => {
  gulp.src('src/**/*.ts')
    .pipe(ts({
        noImplicitAny: true,
        outFile: 'main.js'
    }))
    .pipe(gulp.dest('dest/js'));
});


gulp.task('runserver', ['connect', 'style', 'behaviour'], () => {
  livereload.listen();
  gulp.watch('index.html', ['html']);
  gulp.watch('**/*.scss', ['style']);
  gulp.watch('**/*.ts', ['behaviour']);
});
