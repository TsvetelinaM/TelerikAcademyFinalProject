System.config({
  transpiler: 'plugin-babel',
  map: {
    // System.js files
   'plugin-babel': './libs/systemjs-plugin-babel/plugin-babel.js',
   'systemjs-babel-build': './libs/systemjs-plugin-babel/systemjs-babel-browser.js',

   // App files
   'main': './scripts/main.js',
   'templates': './scripts/templates.js',
   'localStorage': './scripts/local-storage.js',
   'homeController': './scripts/controllers/home-controller.js',
   'servicesController': './scripts/controllers/services-controller.js',   
   'userController': './scripts/controllers/user-controller.js', 
   'articleController': './scripts/controllers/articles-controller.js', 
   'database':'./scripts/database.js',

   //models
  'classUser': './scripts/models/user.js',
  'classArticle': './scripts/models/article.js',

   // Library files
   'jquery': './libs/jquery.js',
   'jqueryUI': './libs/jquery-ui.js',
   'handlebars': './libs/handlebars.js',
   'sammy': './libs/sammy.js',
   'cryptojs': './libs/crypto-js.js',
   'toastr': './libs/toastr.js',
   'bootstrap': './libs/bootstrap/dist/js/bootstrap.min.js'
 },
 packages: {
  '/': {
      defaultExtension: 'js',
  }
},
});

