import 'jquery';
import Sammy from 'sammy';
import * as homeController from 'homeController';
import * as servicesController from 'servicesController';
import 'bootstrap';

(function () {
    
    const app = Sammy('#main',  (Sammy) => {
        Sammy.element_selector = '#main';
        Sammy.get('#/', homeController.all);
        Sammy.get('#/home', homeController.all);
        Sammy.get('#/services', servicesController.all);
    });


    // Start application
    // $(function () {
    //     firebase.auth().onAuthStateChanged(function(user) {
    //         if (localStorage.uid) {
    //             // User is signed in.
    //              app.run('#/dashboard');

    //             console.log(user);
    //             $('#log-buttons').addClass('hidden');
    //             $('#btn-signout').removeClass('hidden');
    //             $('#dashboard-button').removeClass('hidden');
    //             $('#btn-signout').on('click', function (event) {
    //                 usersController.signOut();
    //             });
    //         } else {
    //             // No user is signed in.
    //             app.run('#/');

    //             $('#btn-signout').addClass('hidden');
    //             $('#dashboard-button').addClass('hidden');
    //             $('#log-buttons').removeClass('hidden');
    //         }
    //     });
    // });
    app.run('#/');
} ());

