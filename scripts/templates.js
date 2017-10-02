import 'jquery';
import Handlebars from 'handlebars';

function get(templateName) {
    let promise = new Promise((resolve, reject) => {
        let url = 'templates/' + templateName + '.handlebars';

        $.ajax({
            url: url,
            success: function(html) {
                let template = Handlebars.compile(html);
                resolve(template);
            }
        });
    });

    return promise;
}

export { get }


// function viewHandler(viewName, viewData) {
//    const data = viewData || null;
//    return $.get(`templates/${viewName}.handlebars`)
//        .then((view) => {
//            const template = Handlebars.compile(view);
//            return template(data);
//        });
// }

// export {viewHandler};