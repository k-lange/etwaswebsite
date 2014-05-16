var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
var gm = require('gm').subClass({ imageMagick: true });
var Datauri = require('datauri');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-markdown-to-json');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-image-resize');

  var components = [
    'comment.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'dist/pageContent.js',
    'src/**/*.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    m2j: {
        release: {
            options: {
                minify: false,
                width: 100000
            },
            files: {
                'documents.json': ['etwasvonluise/**/*.md']
            },
        }
    },
    watch: {
      documents: {
        files: ['etwasvonluise/*'],
        tasks: ['m2j', 'parseMD']
      }, 
      less: {
        files: ['style/**/*.less'],
        tasks: ['less']
      }
    },
    less: {
      development: {
        options: {
          paths: ['style']
        },
        files: {
          "dist/style.css": "style/main.less"
        }
      }
    }, 
    uglify: {
      main: {
        options: {
          sourceMap: true,
          sourceMapName: 'dist/sourcemap.map',
          mangle: false,
          preserveComments: 'some'
        },
        files: {
          'dist/app.js': components
        }
      }
    },
    copy: {
      index: {
        src: 'src/index.html',
        dest: 'dist/index.html',
      },      
      htaccess: {
        src: 'src/.htaccess',
        dest: 'dist/.htaccess',
      },
      bower_sources: {
        src: 'bower_components/**/*.js',
        dest: 'dist/',
      },
      sources: {
        src: 'src/**/*',
        dest: 'dist/',
      },
      images: {
        src: ['etwasvonluise/**/*.jpg','etwasvonluise/**/*.png','etwasvonluise/**/*.gif',],
        dest: 'dist/',
      },
      fonts: {
        src: 'webfonts/**/*',
        dest: 'dist/',
      },
      deploy: {
        expand:true,
        src: '**/*',
        cwd: 'dist/', 
        dest: 'foo/'
      }
    },
    watch: {
      script: {
        files: ['src/**/*'],
        tasks: ['scripts'],
        options: {
          livereload: true,
          spawn: false
        }
      },
      less: {
        files: ['style/**/*.less'],
        tasks: ['less'],
        options: {
          livereload: true,
          spawn: false
        }   
      },
      content: {
        files: ['etwasvonluise/**/*'],
        tasks: ['prepare_content', 'scripts'],
        options: {
          livereload: true,
          spawn: false
        }
      }
    }

  });


  grunt.registerTask('setm2jConfig', function(){
    var files = {};
    grunt.file.expand('etwasvonluise/*').forEach(function(dir){
      if(dir.indexOf('.md') === -1) {
        var fileName = dir.split('/');
        fileName = 'dist/page-data-' + fileName[fileName.length - 1] + '.json';
        files[fileName] = dir + '/**/*.md';
      }
    })

    files['dist/page-data-static.json'] = 'etwasvonluise/*.md'

    grunt.config.set('m2j.release.files', files);
  })

  grunt.registerTask('parseMD', 'adding parsed markdown files', function() {

    var content = {},
      waiting = 0,
      done = this.async();  

    grunt.file.expand('dist/page-data-*.json').forEach(function(file){

      var name = file.replace('dist/page-data-','').replace('.json', '');

      content[name] = grunt.file.readJSON(file);

      for (var project in content[name]) {
        content[name][project].html = marked(content[name][project].preview);
        delete content[name][project].preview;     

        content[name][project].images = [];

        grunt.file.expand(
            ['etwasvonluise/' + name + '/' + project + '/*.jpg'],
            ['etwasvonluise/' + name + '/' + project + '/*.png'],
            ['etwasvonluise/' + name + '/' + project + '/*.gif']).forEach(function(file){

          console.log(name, project)
          var imageSize;

          waiting++;

          var projectName = project;

          // gm(file).size(function (err, size) {
          //   if (!err) {2
          //     content[name][projectName].images.push({
          //       width: size.width,
          //       height: size.height, 
          //       file: file
          //     });
          //     console.log(name + ' ' + projectName + ' is ' + size.width + ' x ' + size.height +': ' + file)
          //     waiting--;
          //     imagesDone();
          //   }
          // });

          // gm(file)
          //   .resize(30,30)
          //   .write('dist/smallImages/' + file, function (err) {
          //   if (!err) {
          //     content[name][projectName].images.push({
          //       file: file
          //     });
          //     console.log(name + ' ' + projectName + ' is ' + size.width + ' x ' + size.height +': ' + file)
          //     waiting--;
          //     imagesDone();
          //   } else {
          //     console.log(err)
          //   }

          var fileName = file.split('/');
          fileName = fileName[fileName.length-1]

          grunt.file.mkdir('dist/smallImages');

          gm(file)
            .resize(30,30)
            .write('dist/smallImages/' + fileName, function (err) {

              if (!err) {

                Datauri('dist/smallImages/' + fileName, function(err, data){
                  if(err) {
                    console.log(err);

                  } else {
                    content[name][projectName].images.push({
                      file: file,
                      uri: data
                    });
                    waiting--;
                    imagesDone();
                  }

                })

              } else {
                console.log('fehler', err);
              }

          });

        });
      }
    });

    function imagesDone() {
      if (!waiting) {
        var pageContent = 'var pageContent = ' + JSON.stringify(content) + ';';

        grunt.file.write('dist/pageContent.js', pageContent);
        grunt.file.write('dist/pageContent.json', JSON.stringify(content));

     //   console.log(content)      
        console.log('done with that images!');
        done();
      }
    }
  });

  grunt.registerTask('scripts', [
    'uglify:main',
    'copy:index',
    'copy:images',
    'copy:htaccess',
    'copy:sources',
    'copy:fonts',
    'copy:bower_sources'
  ]);

  grunt.registerTask('prepare_content', [
    'setm2jConfig',
    'm2j', 
    'parseMD'
  ]);

  grunt.registerTask('default', [
    'less', 
    'prepare_content',
    'scripts'
  ]);

};
