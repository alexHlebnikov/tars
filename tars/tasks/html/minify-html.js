var gulp = require('gulp');
var HtmlMin = require('gulp-minify-html');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifyConfig = tarsConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');

/**
 * Minify HTML (optional task)
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {
    var opts = {
        conditionals: true,
        quotes: true
    };

    return gulp.task('minify-html', function(cb) {

        if (tarsConfig.minifyHtml) {
            return gulp.src('./dev/**/*.html')
                .pipe(HtmlMin(opts))
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while minifing html-files.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest('./dev/'))
                .pipe(
                    gulpif(notifyConfig.useNotify,
                        notify({
                            onLast: true,
                            sound: notifyConfig.sounds.onSuccess,
                            title: notifyConfig.title,
                            message: 'Html \'ve been minified \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                            templateOptions: {
                                date: modifyDate.getTimeOfModify()
                            }
                        })
                    )
                );
        } else {
            gutil.log('!Html-minify disabled!');
            cb(null);
        }
    });
};