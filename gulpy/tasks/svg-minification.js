var gulp = require('gulp'),                                         // Gulp JS
    imagemin = require('gulp-imagemin'),
    gutil = require('gulp-util'),                                   // Gulp util module
    gulpif = require('gulp-if'),                                    // Gulp if module
    notify = require('gulp-notify'),                                // Plugin for notify
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,                      // Notify config
    modifyDate = require('../helpers/modifyDateFormatter');         // Date formatter for notify

// Minify sprite img
module.exports = function() {

    return gulp.task('svg-minification', function(cb) {
        if (projectConfig.useSVG) {
            return gulp.src('./dev/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/svg/*.svg')
                .pipe(imagemin(
                        {
                            progressive: true,
                            svgoPlugins: [{removeViewBox: false}],
                            use: []
                        }
                    )
                )
                .on('error', notify.onError(function (error) {
                    return 'Something is wrong.\nLook in console.\n' + error;
                }))
                .pipe(gulp.dest('./dev/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/svg/'))
                .pipe(
                    gulpif(notifyConfig.useNotify, 
                        notify({
                            onLast: true,
                            sound: notifyConfig.sounds.onSuccess,
                            title: notifyConfig.title,
                            message: 'SVG\'ve been minified \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                            templateOptions: {
                                date: modifyDate.getTimeOfModify()
                            }
                        })
                    )
                );

        } else {
            gutil.log('!SVG is not used!');
        }

        cb(null);
    });
};