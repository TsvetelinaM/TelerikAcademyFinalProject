import * as templates from 'templates';
import 'bootstrap';
import database from 'database';
import $ from 'jquery';
import User from 'classUser'
import toastr from 'toastr';

function login(context) {
    templates.get('login').then((template) => {
        context.$element().html(template());

        $('#tm-singlebutton-login').on('click',() => {
            $('form').submit((e) => { e.preventDefault(); });
            try {
                let email = $('#tm-textinput-email').val();
                let password = $('#tm-passwordinput-password').val();
                database.signInUser(email, password)
                .then(() => {
                    let userAuth = firebase.auth().currentUser;
                    localStorage.setItem('displayUser', JSON.stringify({displayName: userAuth.username, uid: userAuth.uid, email: userAuth.email}));
                    toastr.success('Successfuly logged in');
                    context.redirect('#/');
                })
                .catch((err) => {
                    toastr.error(err.message);
                });
            }
            catch (err) {
                toastr.error(err.message);
            }
        });
    });
}

function register(context) {
    templates.get('register').then((template) => {
        context.$element().html(template());

        $('#tm-singlebutton-login').on('click',() => {
            $('form').submit((e) => { e.preventDefault(); });
            try {
                let username = $('#tm-textinput-username-log').val();
                let email = $('#tm-textinput-email-log').val();
                let password = $('#tm-passwordinput-password-log').val();
                let newUser = new User(username, email,  password);
                database.createUser(email, password, newUser)
                .then(() => {
                    // console.log(localStorage.getItem('displayUser'));
                    toastr.success('Successfuly registered');
                    context.redirect('#/');
                });
            }
            catch (err) {
                toastr.error(err.message);
            }
        });
    });
    
}

function signOut() {
    localStorage.clear();
    database.signOut()
        .then(function () {
            location.hash = '#/';
            location.reload();
            toastr.success("User succesfully signed out.");
        }).catch(function (err) {
            toastr.error(err.name + ": " + err.message);
        })
}

export { login, register, signOut };