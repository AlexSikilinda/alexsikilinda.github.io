module.exports = function(grunt) {

  // The old `cssmin` target concatenated `public/css/*.css` into
  // `public/css/all.min.css` — a glob that matched its own output, so every
  // run appended another copy of the whole stylesheet to itself. The site now
  // ships a single hand-authored `public/css/sikilinda.css`, so there is no
  // stylesheet build step at all.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jekyll: {
      build: {},
      serve: {
        options: {
          serve: true,
          watch: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jekyll');

  // Default task(s).
  grunt.registerTask('default', ['jekyll:build']);

};
