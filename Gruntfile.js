'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-zip');

    grunt.initConfig({
        browserify: {
            main: {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                files: [
                    {src: ['./src/js/index.js'], dest: './dist/js/index.js'}
                ]
            }
        },

        jade: {
            main: {
                files: [
                    {src: ['./src/index.jade'], dest: './dist/index.html'}
                ]
            }
        },

        copy: {
            css: {
                files: [
                    {expand:true, cwd: './src/css', src: '**', dest: './dist/css/'}
                ]
            },
        },

        zip: {
            dist: {
                files: [
                    {src: './dist/**', dest: './dist/dist.zip'}
                ]
            }
        }
    });

    grunt.registerTask('build', function () {
        grunt.task.run('copy:css', 'jade', 'browserify')
    });
};
