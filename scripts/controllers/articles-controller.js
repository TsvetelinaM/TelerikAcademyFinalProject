import * as templates from 'templates';
import 'bootstrap';
import * as templates from 'templates';
import  'bootstrap';
import database from 'database';
import $ from 'jquery';
import toastr from 'toastr';
import Article from 'classArticle';

function all(context) {
    const articlesArr = [
        
    ]


    templates.get('articles').then((template) => {
        context.$element().html(template());
    });
}

export { all };