import * as templates from 'templates';
import  "bootstrap";

function all(context) {
    templates.get('services').then((template) => {
        context.$element().html(template());
    })
}

export { all };
