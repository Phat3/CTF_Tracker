/* 
 * 
 * @author Sebastiano Mariani <mariani.sebastiano@gmail.com>
 * 
 */

 module.exports = function(grunt) {
         //init grunt
         grunt.initConfig({
             
            //common options for package
            options: {
                //Name of the application
                name: 'CTF_Tracker',
                //Current Version number
                version : '1.0.0',
                // Base path to your assets folder
                base: 'assets',
                // Published assets path
                publish: 'public',              
                //prepend banner after each compile task
                compileBanner : '/*! <%= options.name %> - v<%= options.version %> - ' +
                               'compiled at <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */\n',
                //we use bower as packet manager then all vendor package are under bower_components directory
                vendor: {
                    //our root directory for every vendor package
                    baseBower: 'bower_components',
                    //option for the concat task
                    concat: [
                        "<%= options.vendor.baseBower %>/angularjs/angular.js",
                        "<%= options.vendor.baseBower %>/jquery-legacy/dist/jquery.min.js",
                        "<%= options.vendor.baseBower %>/bootstrap/dist/js/bootstrap.min.js",
                        "<%= options.vendor.baseBower %>/angular-ui-router/release/angular-ui-router.min.js",
                        "<%= options.vendor.baseBower %>/metisMenu/dist/metisMenu.min.js"
                    ],
                    //option for the copy task
                    copy: {
                        css: {
                            //we put the minified vendor css in public/css/vendor
                            publish : '<%= options.publish %>/css/',
                            //specify the files that you want to copy
                            files : [
                                "<%= options.vendor.baseBower %>/bootstrap/dist/css/bootstrap.min.css",
                                "<%= options.vendor.baseBower %>/font-awesome/css/font-awesome.min.css",
                            ]
                        },
                        fonts: {
                            //we put the minified vendor css in public/css/vendor
                            publish : '<%= options.publish %>/fonts/',
                            //specify the files that you want to copy
                            files : [
                                "<%= options.vendor.baseBower %>/font-awesome/fonts/*",
                            ]
                        }
                    }
                    
                },            
                // Notification messages options
                notify: {
                        css: {
                                title: 'Css compiled succesfully!',
                                message: 'Less files were modified, recompiled and copied in public/css/'
                        },
                        js: {
                                title: 'JS minified succesfully!',
                                message: 'JS files were modified, reminified and copied in public/js/'
                        },
                        html: {
                                title: 'Views copied succesfully',
                                message: 'HTML files were modified, and copied in public/views/'
                        },
                        all: {
                                title: 'CTF_Tracker Reloaded!',
				message: 'Files were modified, recompiled and site reloaded'
                        }
                },
                // Less compiler options
                less:{
                    paths : ["assets/*"],
                    files : "" //set by the preparefiles task
                },
                // Watch compiler options
                watch:{
                    css:{
                        files : "" //set by the preparefiles task
                    },
                    js:{
                        files : "" //set by the preparefiles task
                    },
                    html:{
                        files : "" //set by the preparefiles task
                    }
                },
                // Concat task options
                concat:{                  
                    files : "" //set by the preparefiles task
                },
                // Copy task options
                copy:{ 
                    js : {
                        files : "" //set by the preparefiles task
                    },
                    html : {
                        files : "" //set by the preparefiles task
                    },
                    img : {
                        files : "" //set by the preparefiles task
                    }
                },
                // Copy task options
                uglify:{                  
                    files : "" //set by the preparefiles task
                }
            },
            
            // Concatenate multiple js files into one
            concat: {
                    js: {                       
                        files: '<%= options.concat.files %>'
                    },
                    vendor: {
                        src: '<%= options.vendor.concat %>',
                        dest: '<%= options.publish %>/js/concat.vendor.js'
                    }
             },
               
            //compile and minify less file   
            less: {
                 local: {
                     options: {
                         paths: '<%= options.less.path %>',
                         //track the date of the last compile task
                         banner: '<%= options.compileBanner %>'
                     },
                     files: "<%= options.less.files %>"
                 },
                 production: {
                     options: {
                         paths: '<%= options.less.path %>',
                         //minify css
                         cleancss: true,
                         //track the date of the last compile task
                         banner: '<%= options.compileBanner %>'
                     },
                     files: "<%= options.less.files %>"
                 }
             },
                   
            // Display notifications
            notify: {
                    css: {
                            options: {
                                    title: '<%= options.notify.css.title %>',
                                    message: '<%= options.notify.css.message %>'
                            }
                    },
                    js: {
                            options: {
                                    title: '<%= options.notify.js.title %>',
                                    message: '<%= options.notify.js.message %>'
                            }
                    },
                    html: {
                            options: {
                                    title: '<%= options.notify.html.title %>',
                                    message: '<%= options.notify.html.message %>'
                            }
                    },
                    all: {
                            options: {
                                    title: '<%= options.notify.all.title %>',
                                    message: '<%= options.notify.all.message %>'
                            }
                    }
            },
            
            // Watch for files and folder changes (only local env)
            watch: {
                    options: {
                        livereload: true,
                        //prevent the spawn of a child process, with this solution we can set the files option in the watch event and compile only the file that has been changed
                        nospawn: true
                    },
                    css: {
                        files: '<%= options.watch.css.files %>', 
                        tasks: ['less:local', 'notify:css']
                    }, 
                    js: {
                        files: '<%= options.watch.js.files %>', 
                        tasks: ['concat:js', 'copy:js', 'clean:concat','notify:js']
                    },
                    html: {
                        files: '<%= options.watch.html.files %>', 
                        tasks: ['copy:html', 'notify:html']
                    } 
            },
            
            // Clean files and folders before replacement
            clean: {
                    all: {
                            src: ['<%= options.publish %>/css/', '<%= options.publish %>/js/', '<%= options.publish %>/views/']
                    },
                    js: {
                            src: '<%= options.publish %>/js/' 
                    },
                    css: {
                            src: '<%= options.publish %>/css/' 
                    },
                    concat: {
                            src: '<%= options.publish %>/js/concat.*' 
                    }
            },
            
            // Javascript minify (run this task only in production)
            uglify: {
                options: {
                    //delete all comments
                    preserveComments: false,
                    //prevent changes to variable and function names
                    mangle: false,
                    //drop console.* debug calls
                    compress: {
                        drop_console: true
                    },
                    //track the date of the last compile task
                    banner: '<%= options.compileBanner %>'

                },
                vendor : {                                    
                    files: { 
                        "<%= options.publish %>/js/vendor.min.js": ["<%= options.publish %>/js/concat.vendor.js"] 
                    }                   
                },
                js : {
                   files: '<%= options.uglify.files %>' 
                }
            },
            //copy the vedor minified files in the public folder
            copy: {
                css: {
                    //copy only the specified file and not its directory structure
                    expand: true,
                    flatten: true,
                    src: '<%= options.vendor.copy.css.files %>',
                    dest: '<%= options.vendor.copy.css.publish %>'
                },
                fonts: {
                    //copy only the specified file and not its directory structure
                    expand: true,
                    flatten: true,
                    src: '<%= options.vendor.copy.fonts.files %>',
                    dest: '<%= options.vendor.copy.fonts.publish %>'
                },
                js : {
                    files: '<%= options.copy.js.files %>'
                },
                html : {
                    //copy only the specified file and not its directory structure
                    files: '<%= options.copy.html.files %>'
                },
                img : {
                    //copy only the specified file and not its directory structure
                    files: '<%= options.copy.img.files %>'
                }
            }
                      
         });
        
        grunt.registerTask('preparefiles', 'Scan the asset subdirectory and compile every less file', function() {
            //publisg root directory
            var publish = grunt.config.get('options.publish');
            //initialize the proper objecys
            var lessFiles = [];
            var jsCopyFiles = [];
            var jsConcatFiles = [];
            var htmlCopyFiles = [];
            var imgCopyFiles = [];
            var watchLessFiles = [];
            var watchJsFiles = [];
            var watchHtmlFiles = [];
            var watchImgFiles = [];

            // read all subdirectories from assets folder
            grunt.file.expand(grunt.config.get('options.base') + '/*').forEach(function(module){
                //prepare the local object
                var lessFile = {};
                //prepare the local object
                var jsCopyFile = {};
                //prepare the local object
                var jsConcatFile = {};
                //prepare info
                var taskUnit = {
                      less : {
                          //include every less files of the submodule in the main.less file and save it to es : "public/coss/common.min.css"
                          target : publish + '/css/' + module.split('/').pop() + '.min.css',
                          source : module + '/less/main.less'
                      },
                      js : {
                          targetConcat : publish + '/js/' + 'concat.' + module.split('/').pop() + '.min.js',
                          targetCopy : publish + '/js/' + module.split('/').pop() + '.min.js',
                          source : module + '/js/*.js'
                      },
                      html : {
                          src : module + '/views/*.html',
                          dest : publish + '/views/' + module.split('/').pop() + '/',
                          expand : true,
                          flatten : true
                      },
                      img : {
                          src : module + '/img/*',
                          dest : publish + '/img/' + module.split('/').pop() + '/',
                          expand : true,
                          flatten : true 
                      }
                };
                //check if the source file exist
                if(grunt.file.exists(taskUnit.less.source)){
                     //build the proper object
                     lessFile[taskUnit.less.target] = taskUnit.less.source;
                     //push the object into the general files object
                     lessFiles.push(lessFile);
                     watchLessFiles.push(taskUnit.less.source);
                }
                //check if exist at least one file in the source pattern
                if(grunt.file.expand(taskUnit.js.source).length > 0){
                    //build the proper object
                    jsConcatFile[taskUnit.js.targetConcat] = taskUnit.js.source;
                    jsCopyFile[taskUnit.js.targetCopy] = taskUnit.js.targetConcat;
                    //push the object into the general files object
                    jsCopyFiles.push(jsCopyFile);
                    //push the object into the general files object
                    jsConcatFiles.push(jsConcatFile);
                    watchJsFiles.push(taskUnit.js.source);
                }
                //check if exist at least one file in the source pattern
                if(grunt.file.expand(taskUnit.html.src).length > 0){                                    
                    //push the object into the general files object
                    htmlCopyFiles.push(taskUnit.html);
                    //push the object into the general files object
                    watchHtmlFiles.push(taskUnit.html.src);                 
                }
                //check if exist at least one file in the source pattern
                if(grunt.file.expand(taskUnit.img.src).length > 0){                                    
                    //push the object into the general files object
                    imgCopyFiles.push(taskUnit.img);
                    //push the object into the general files object
                    watchImgFiles.push(taskUnit.img.src);                 
                }
               
            });
            //set the proper option
            grunt.config.set('options.less.files', lessFiles);
            grunt.config.set('options.watch.css.files', watchLessFiles);
            grunt.config.set('options.concat.files', jsConcatFiles);
            grunt.config.set('options.copy.js.files', jsCopyFiles);
            grunt.config.set('options.uglify.files', jsCopyFiles);
            grunt.config.set('options.copy.html.files', htmlCopyFiles);
            grunt.config.set('options.copy.img.files', imgCopyFiles);
            grunt.config.set('options.watch.js.files', watchJsFiles);
            grunt.config.set('options.watch.html.files', watchHtmlFiles);
            grunt.config.set('options.watch.img.files', watchImgFiles);
                       
        });
        
        //catch the watch:css event and set the proper source file that has to be compiled
        grunt.event.on('watch', function(action, filepath){
            //get the root publish directory
            var publish = grunt.config.get('options.publish');
            //set less src
            if(filepath.split('.').pop() === 'less'){                
                //set the target of the compilation process 
                var target = publish + '/css/' + filepath.split('/')[1] + '.min.css';
                //create the object
                var lessFile = {};
                //all sub files are included into main.less file of the module, compile it
                var source = filepath.split('/')[0] + '/' +filepath.split('/')[1] + '/less/main.less';
                //set the object
                lessFile[target] = source;
                //set the proper option
                grunt.config.set('options.less.files', lessFile);  
            }
            //set js source
            else if(filepath.split('.').pop() === 'js'){
                //set the target of the compilation process 
                var targetConcat = publish + '/js/' + 'concat.' + filepath.split('/')[1] + '.min.js';
                //set the target of the compilation process 
                var targetCopy = publish + '/js/' + filepath.split('/')[1] + '.min.js';
                //create the object
                var jsCopyFile = {};
                var jsConcatFile = {};
                
                var source = filepath.split('/')[0] + '/' +filepath.split('/')[1] + '/js/*.js';
                //set the object
                jsCopyFile[targetCopy] = targetConcat;
                jsConcatFile[targetConcat] = source;
                //set the proper option
                grunt.config.set('options.copy.js.files', jsCopyFile);
                grunt.config.set('options.concat.files', jsConcatFile);
            }
            else{                
                //create the object
                var htmlCopyFile = {
                    src : filepath,
                    dest : publish + '/views/' + filepath.split('/')[1],
                    flatten : true,
                    expand : true
                };
                
                grunt.config.set('options.copy.html.files', [htmlCopyFile]);
            }
        });

         
         //load tasks
         grunt.loadNpmTasks('grunt-contrib-concat');
         grunt.loadNpmTasks('grunt-contrib-less');
         grunt.loadNpmTasks('grunt-notify');
         grunt.loadNpmTasks('grunt-contrib-watch');
         grunt.loadNpmTasks('grunt-contrib-clean');
         grunt.loadNpmTasks('grunt-contrib-uglify');
         grunt.loadNpmTasks('grunt-contrib-copy');
         
         //divide our task in subtask for each environment
         //task for production (compile and minify all)
         grunt.registerTask('default', ['clean:all', 'preparefiles', 'concat', 'uglify', 'less:production', 'copy:css', 'copy:fonts', 'copy:html', 'copy:img', 'clean:concat', 'notify:all']);
         //task for local env (compile and minify only less file and vendor)
         grunt.registerTask('local', ['clean:all', 'preparefiles', 'concat', 'uglify:vendor', 'less:local', 'copy', 'clean:concat', 'notify:all', 'watch']);
       
     };