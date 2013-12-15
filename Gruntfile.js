module.exports = function(grunt) {

  grunt.initConfig({
    jade: {
      compile: {
        files: [{
          cwd: 'bundles',
          src: '**/*.jade',
          dest: 'build',
          expand: true,
          ext: '.html',
          rename: function(destBase, destPath) {
            return destBase + destPath.replace(/(.*)\//, '/');
          }
        }],
        options: {
          pretty: true,
          data: function(dest, src) {
            var file = src[0].replace('.jade', '.json');
            return grunt.file.exists(file)? grunt.file.readJSON(file) : {};
          }
        }
      }
    },
    stylus: {
      compile: {
        files: [{
          'build/css/style.css': [
            'blocks/blocks.styl',
            'blocks/reset.styl'
          ]
        }]
      }
    },
    copy: {
      images: {
        files: [{
          cwd: 'blocks',
          src: '**/img/*',
          expand: true,
          dest: 'build/img',
          rename: function(destBase, destPath) {
            var block = destPath.split('/')[0];
            return destBase + destPath.replace(/(.*)\//, '/' + block + '/');
          }
        }]
      }
    },
    watch: {
      jade: {
        files: ['bundles/**/*.jade'],
        tasks: 'jade'
      },
      stylus: {
        files: ['blocks/**/*.styl'],
        tasks: 'stylus'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jade', 'stylus', 'copy']);
};
