'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        browserify: {
            options: {
                debug: true,
            },
            main: {
                files: [
                    {src: ['./src/js/index.js'], dest: './dist/js/index.js'}
                ]
            }
        },

        copy: {
            css: {
                files: [
                    {expand:true, cwd: './src/css', src: '**', dest: './dist/css/'}
                ]
            },

            html: {
                files: [
                    {src: ['./src/index.html'], dest: './dist/index.html'}
                ]
            },
        },
    });

    grunt.registerTask('build', function () {
        grunt.task.run('copy:css', 'copy:html', 'browserify')
    });
};
