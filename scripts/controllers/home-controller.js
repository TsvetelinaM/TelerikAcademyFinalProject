import * as templates from 'templates';
import  'bootstrap';
import database from 'database';
import $ from 'jquery';
import toastr from 'toastr';

const array = [
    {imageURL:'./../styles/imgs/flower1.jpeg', title:'Image test 1'},
    {imageURL:'./../styles/imgs/flower1.jpeg', title:'Image test 2'},
    {imageURL:'./../styles/imgs/flower1.jpeg', title:'Image test 3'},
    {imageURL:'./../styles/imgs/flower1.jpeg', title:'Image test 2'},
    {imageURL:'./../styles/imgs/flower1.jpeg', title:'Image test 3'}
];


const imagesArray = array.splice(0, 5);
const incomingImages = array;


function all(context) {
    database.getItems('services')
    .then((services) =>{
        const templateData={services:services.val(),imagesArray};
        templates.get('home').then((template) => {
            context.$element().html(template(templateData));
        
            (() => {
                $('.tm-carrousel-container').on('click', (ev) => {
                    let elements = $('.tm-carrousel-image'),
                        container = $('.tm-carrousel-image-container'),
                        active = $('.tm-carrousel-image-center'),
                        imgSource = imagesArray,
                        imgStorage = incomingImages,
                        len = imgSource.length,
                        target = $(ev.target);
            
                    if (target.hasClass('glyphicon-chevron-right')) {
                        if (imgStorage.length) {
                            imgSource.push(imgStorage.shift());
                            imgStorage.push(imgSource.shift());
                        } else {
                            imgSource.push(imgSource.slice(0,2)[0]);
                            imgStorage.push(imgSource.shift());
                        }
                        
                        let elementToGo = elements.first(),
                            elementToCome = $("<div><img src=" + imgSource[len - 1].imageURL + "></div>").addClass('tm-carrousel-image');
                        elementToGo.addClass('tm-shrink-right');
                        container.append(elementToCome.addClass('tm-grow-right'));
                        setTimeout(() => {
                            active.attr('src', imgSource[2].imageURL);
                            $('.tm-carrousel-title').html(imgSource[2].title);
                            elementToGo.remove();
                            elementToCome.removeClass('tm-grow-right');
                        }, 350);
                    }
                    if (target.hasClass('glyphicon-chevron-left')) {
                        if (imgStorage.length) {
                            imgSource.unshift(imgStorage.pop());
                            imgStorage.unshift(imgSource.pop());
                        } else {
                            imgSource.unshift(imgSource.slice(length-1)[0]);
                            imgStorage.unshift(imgSource.pop());
                        }
                        
                        let elementToGo = $('.tm-carrousel-image:nth-child(5)'),
                            elementToCome = $("<div><img src=" + imgSource[0].imageURL + "></div>").addClass('tm-carrousel-image');
                        elementToGo.addClass('tm-shrink-left');
                        container.prepend(elementToCome.addClass('tm-grow-left'));
                        setTimeout(() => {
                            active.attr('src', imgSource[2].imageURL);
                            $('.tm-carrousel-title').html(imgSource[2].title);
                            elementToGo.remove();
                            elementToCome.removeClass('tm-grow-left');
                        }, 350);
                    }
                });
            })();
        })
    });
}



export { all };

