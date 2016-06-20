module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  
  grunt.initConfig({
    sass: {
      options: {
        outputStyle: 'compressed'
      },
      dist: {
        files: [
          {
            expand: true,
            src: ['src/**/*.scss'],
            ext: '.css'
          }
        ]
      }
    },
    watch: {
      sass: {
        options: {
          interval: 300,
          spawn: false
        },
        files: ['src/**/*.scss'],
        tasks: ['sass']
      }
    }
  });
  
  grunt.registerTask('default', ['sass', 'watch:sass']);
};
