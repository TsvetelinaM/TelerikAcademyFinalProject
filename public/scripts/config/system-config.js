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
   'homeController': './controllers/home-controller.js',
   


   //models

   // Library files
   'jquery': './libs/jquery.js',
   'jqueryUI': './libs/jquery-ui.js',
   'handlebars': './libs/handlebars.js',
   'sammy': './libs/sammy.js',
   'cryptojs': './libs/crypto-js.js',
   'toastr': './libs/toastr.js',
   'bootstrap': './libs/bootstrap/dist/js/bootstrap.min.js'
 }
});

System.import('main');
