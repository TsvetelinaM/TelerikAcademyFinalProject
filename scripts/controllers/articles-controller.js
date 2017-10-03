import * as templates from 'templates';
import 'bootstrap';
import database from 'database';
import $ from 'jquery';
import User from 'classUser';
import toastr from 'toastr';

function all(context) {
    templates.get('articles').then((template) => {
        context.$element().html(template());
    });
}

export { all };