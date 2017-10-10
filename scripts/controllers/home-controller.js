import * as templates from 'templates';
import  'bootstrap';
import database from 'database';
import $ from 'jquery';
import toastr from 'toastr';


// const array = [
//     {imageURL:'./../styles/imgs/precise.jpg', title:'Precise'},
//     {imageURL:'./../styles/imgs/secure.jpg', title:'Secure'},
//     {imageURL:'./../styles/imgs/loyal.jpg', title:'Loyal'},
//     {imageURL:'./../styles/imgs/friendly.jpg', title:'Friendly'},
//     {imageURL:'./../styles/imgs/trustfully.jpg', title:'Trustfully'}
// ];
// database.addJSONToDB('carousel', array);




let templateData;


function getIndex() {
    templates.get('index').then((template) => {
        $('body').html(template());
    });
    
}
function getHome(context) {
    // $('.loader').removeClass('tm-hidden');
    // $('#wrapper').addClass('tm-hidden');
    //show loading screen
    database.getItems('services')
    .then((services) =>{
        templateData={services:services.val(),imagesArray:[]};
        return database.getItems('carousel');
    })
    .then((carousel)=>{
        let carouselUid = Object.keys(carousel.val());
        let carouselItems = [];
        for (let i=carouselUid.length-1; i>=0; i--) {
            let currentCarouselUid = carouselUid[i] 
            carouselItems.push(carousel.val()[currentCarouselUid]);
        };
        const imagesArray = carouselItems.splice(0, 5);
        const incomingImages = carouselItems;
        templateData.imagesArray = imagesArray;
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
                            // imgSource.push(imgSource.slice(0,2)[0]);
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
                            // imgSource.unshift(imgSource.slice(length-1)[0]);
                            imgStorage.unshift(imgSource.pop());
                        }
                        console.log(imgSource);
                        
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

    })
    .catch((err) => {
        console.log(err);
        toastr.error(err.msg)
    });

}



export { getHome, getIndex };

