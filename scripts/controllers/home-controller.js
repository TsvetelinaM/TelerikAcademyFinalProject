import * as templates from 'templates';
import  "bootstrap";

const array = [
    {imageURL:'./styles/imgs/flower1.jpg', title:'Image test 1'},
    {imageURL:'https://static.pexels.com/photos/54630/japanese-cherry-trees-flowers-spring-japanese-flowering-cherry-54630.jpeg', title:'Image test 2'},
    {imageURL:'https://static.pexels.com/photos/54630/japanese-cherry-trees-flowers-spring-japanese-flowering-cherry-54630.jpeg', title:'Image test 3'}
];

function all(context) {
    templates.get('home').then(function(template) {
        context.$element().html(template(array));
    })
}

(function attach() {
    $('#carousel_container').on('click', function(ev) {
        var elements = $('.carrousel__image'),
            container = $('.carrousel__image__container'),
            active = $('.carrousel__image--center'),
            imgSource = imagesArray,
            imgStorage = incomingImages,
            len = imgSource.length,
            target = $(ev.target);

        if (target.hasClass('fa-chevron-right')) {
            imgSource.push(imgStorage.shift());
            imgStorage.push(imgSource.shift());
            var elementToGo = elements.first(),
                elementToCome = $("<div><img src=" + imgSource[len - 1].imageUrl + "></div>").addClass('carrousel__image');
            elementToGo.addClass('shrink--right');
            container.append(elementToCome.addClass('grow--right'));
            setTimeout(function() {
                active.attr('src', imgSource[2].imageUrl);
                $('.carrousel__title').html(imgSource[2].title);
                elementToGo.remove();
                elementToCome.removeClass('grow--right');
            }, 350);
        }
        if (target.hasClass('fa-chevron-left')) {
            imgSource.unshift(imgStorage.pop());
            imgStorage.unshift(imgSource.pop());
            var _elementToGo = $('.carrousel__image:nth-child(5)'),
                _elementToCome = $("<div><img src=" + imgSource[0].imageUrl + "></div>").addClass('carrousel__image');
            _elementToGo.addClass('shrink--left');
            container.prepend(_elementToCome.addClass('grow--left'));
            setTimeout(function() {
                active.attr('src', imgSource[2].imageUrl);
                $('.carrousel__title').html(imgSource[2].title);
                _elementToGo.remove();
                _elementToCome.removeClass('grow--left');
            }, 350);
        }
    });
})();

export { all };

