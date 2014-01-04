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
        files: {
          'build/css/style.css': ['common/*.styl', 'blocks/**/*.styl']
        }
      }
    },
    uglify: {
      blocks: {
        options: {
          compress: false,
          mangle: false,
          banner: '/*! Build date: <%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        files: {
          'build/js/libs.js': ['vendor/**/*.js'],
          'build/js/blocks.js': ['blocks/**/*.js']
        }
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
        files: ['bundles/**/*.jade', 'bundles/**/*.json'],
        tasks: 'jade'
      },
      stylus: {
        files: ['common/*.styl', 'blocks/**/*.styl'],
        tasks: 'stylus'
      },
      uglify: {
        files: ['blocks/**/*.js'],
        tasks: 'uglify'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jade', 'stylus', 'copy', 'uglify']);
};
