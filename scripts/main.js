import 'jquery';
import Sammy from 'sammy';
import * as homeController from 'homeController';
import * as servicesController from 'servicesController';
import * as userController from 'userController';
import * as articleController from 'articleController'
import 'bootstrap';


(() => {
    const app = Sammy('#main', (Sammy) => {
        Sammy.element_selector = '#main';
        Sammy.get('#/', homeController.all);
        Sammy.get('#/home', homeController.all);
        Sammy.get('#/services', servicesController.getAllServices);
        Sammy.get('#/articles', articleController.getAllArticles);
        Sammy.get('#/login', userController.login);
        Sammy.get('#/register', userController.register);
        Sammy.get('#/articles/:name', articleController.getSingleArticle);
        Sammy.get('#/services/:name', servicesController.getSingleService);
    });


    // Start application
    $(() => {
        // $('body').html();
        $('.tm-responsive-nav').on('click',()=>{
            $('.tm-nav-dropdown').toggleClass('tm-hidden');
            $('.tm-nav-dropdown').on('click', ()=>{
                $('.tm-nav-dropdown').toggleClass('tm-hidden');
            })
        })
        firebase.auth().onAuthStateChanged((user) => {
            if (localStorage.displayUser) {
                // User is signed in.
                 app.run('#/');
                $('#tm-btn-login').addClass('tm-hidden');
                $('#tm-btn-signout').removeClass('tm-hidden');
                $('#tm-btn-signout').on('click', (event) => {
                    userController.signOut();
                });
            } else {
                // No user is signed in.
                app.run('#/');

                $('#tm-btn-signout').addClass('tm-hidden');
                $('#tm-btn-login').removeClass('tm-hidden');
            }
        });
    });
})();

