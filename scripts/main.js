import 'jquery';
import Sammy from 'sammy';
import * as homeController from 'homeController';
import * as servicesController from 'servicesController';
import * as userController from 'userController';
import * as articleController from 'articleController'
import 'bootstrap';


(() => {
    function loadingScreen() {
        window.loading_screen = window.pleaseWait({
            logo: './../styles/imgs/fb_tw.png',
            backgroundColor: 'grey',
            loadingHtml: `<div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>`
        });
        return window.loading_screen;
        
    };


    homeController.getIndex();
    
    const app = Sammy('#main', (Sammy) => {
        Sammy.element_selector = '#main';
        Sammy.get('#/', homeController.getHome);
        Sammy.get('#/home', homeController.getHome);
        Sammy.get('#/services', servicesController.getAllServices);
        Sammy.get('#/articles', articleController.getAllArticles);
        Sammy.get('#/login', userController.login);
        Sammy.get('#/register', userController.register);
        Sammy.get('#/articles/add', articleController.addArticle);
        Sammy.get('#/articles/:name', articleController.getSingleArticle);
        Sammy.get('#/services/:name', servicesController.getSingleService);
    });

    
    // Start application
    $(() => {
        
        $('.tm-responsive-nav').on('click',()=>{
            $('.tm-nav-dropdown').toggleClass('tm-hidden');
        })
        $('.tm-nav-dropdown').on('click', ()=>{
            $('.tm-nav-dropdown').toggleClass('tm-hidden');
        })
        firebase.auth().onAuthStateChanged((user) => {
            if (localStorage.displayUser) {
                // User is signed in.
                // const screen = loadingScreen();
                 app.run('#/');
                $('.tm-btn-add-article').each((index, element)=>{
                    $(element).removeClass('tm-hidden')
                });
                 
                $('#tm-btn-login').addClass('tm-hidden');
                $('#tm-btn-signout').removeClass('tm-hidden');
                $('#tm-btn-signout').on('click', (event) => {
                    userController.signOut();
                });

                $('#tm-btn-login-drop').addClass('tm-hidden');
                $('#tm-btn-signout-drop').removeClass('tm-hidden');
                $('#tm-btn-signout-drop').on('click', (event) => {
                    userController.signOut();
                });

                // screen.finish();
            } else {
                // const screen = loadingScreen();
                // No user is signed in.
                app.run('#/');

                $('#tm-btn-signout').addClass('tm-hidden');
                $('#tm-btn-login').removeClass('tm-hidden');
                $('#tm-btn-signout-drop').addClass('tm-hidden');
                $('#tm-btn-login-drop').removeClass('tm-hidden');
                // screen.finish();
            }
           
        });
        
    });
})();

