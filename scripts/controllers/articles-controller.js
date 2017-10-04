
import * as templates from 'templates';
import  'bootstrap';
import database from 'database';
import $ from 'jquery';
import toastr from 'toastr';
import Article from 'classArticle';

function all(context) {
    // const articlesArr = [
    //     {linkName:'test1', author:'This is a test 1', date:'March 3, 2017', category:'accounting', title:'Accounting Issues to Watch', content:`Rhoncus quis, varius sed velit. 
    //     Mauris quis nunc eu nunc molestie egestas et sit amet odio. Morbi lacinia velit in nibh sodales sed pharetra sem feugiat. Vivamus ut 
    //     cursus augue. Integer sit amet arcu lorem, at egestas tellus. Phasellus tellus orci, congue at tristique at,  mattis ut arcu. Donec dictum eros eu 
    //     felis laoreet egestas. Nullam adipiscing nibh id felis lacinia a iaculis nisi vestibulum. Ut sit amet urna enim, at accumsan quam. Nunc dui elit, hendrerit quis convallis sit amet,`, imgUrl:'./../../styles/imgs/accounting.jpg', comments:[]},
    //     {linkName:'test2', author:'This is a test 2', date:'March 3, 2017', category:'accounting', title:'Accounting Issues to Watch', content:`Rhoncus quis, varius sed velit. 
    //     Mauris quis nunc eu nunc molestie egestas et sit amet odio. Morbi lacinia velit in nibh sodales sed pharetra sem feugiat. Vivamus ut 
    //     cursus augue. Integer sit amet arcu lorem, at egestas tellus. Phasellus tellus orci, congue at tristique at,  mattis ut arcu. Donec dictum eros eu 
    //     felis laoreet egestas. Nullam adipiscing nibh id felis lacinia a iaculis nisi vestibulum. Ut sit amet urna enim, at accumsan quam. Nunc dui elit, hendrerit quis convallis sit amet,`, imgUrl:'./../../styles/imgs/accounting.jpg', comments:[]},
    //     {linkName:'test3', author:'This is a test 3', date:'March 3, 2017', category:'accounting', title:'Accounting Issues to Watch', content:`Rhoncus quis, varius sed velit. 
    //     Mauris quis nunc eu nunc molestie egestas et sit amet odio. Morbi lacinia velit in nibh sodales sed pharetra sem feugiat. Vivamus ut 
    //     cursus augue. Integer sit amet arcu lorem, at egestas tellus. Phasellus tellus orci, congue at tristique at,  mattis ut arcu. Donec dictum eros eu 
    //     felis laoreet egestas. Nullam adipiscing nibh id felis lacinia a iaculis nisi vestibulum. Ut sit amet urna enim, at accumsan quam. Nunc dui elit, hendrerit quis convallis sit amet,`, imgUrl:'./../../styles/imgs/accounting.jpg', comments:[]},
    //     {linkName:'test4', author:'This is a test 4', date:'March 3, 2017', category:'accounting', title:'Accounting Issues to Watch', content:`Rhoncus quis, varius sed velit. 
    //     Mauris quis nunc eu nunc molestie egestas et sit amet odio. Morbi lacinia velit in nibh sodales sed pharetra sem feugiat. Vivamus ut 
    //     cursus augue. Integer sit amet arcu lorem, at egestas tellus. Phasellus tellus orci, congue at tristique at,  mattis ut arcu. Donec dictum eros eu 
    //     felis laoreet egestas. Nullam adipiscing nibh id felis lacinia a iaculis nisi vestibulum. Ut sit amet urna enim, at accumsan quam. Nunc dui elit, hendrerit quis convallis sit amet,`, imgUrl:'./../../styles/imgs/accounting.jpg', comments:[]},
    //     {linkName:'test5', author:'This is a test 5', date:'March 3, 2017', category:'accounting', title:'Accounting Issues to Watch', content:`Rhoncus quis, varius sed velit. 
    //     Mauris quis nunc eu nunc molestie egestas et sit amet odio. Morbi lacinia velit in nibh sodales sed pharetra sem feugiat. Vivamus ut 
    //     cursus augue. Integer sit amet arcu lorem, at egestas tellus. Phasellus tellus orci, congue at tristique at,  mattis ut arcu. Donec dictum eros eu 
    //     felis laoreet egestas. Nullam adipiscing nibh id felis lacinia a iaculis nisi vestibulum. Ut sit amet urna enim, at accumsan quam. Nunc dui elit, hendrerit quis convallis sit amet,`, imgUrl:'./../../styles/imgs/accounting.jpg', comments:[]},
    //     {linkName:'test6', author:'This is a test 6', date:'March 3, 2017', category:'accounting', title:'Accounting Issues to Watch', content:`Rhoncus quis, varius sed velit. 
    //     Mauris quis nunc eu nunc molestie egestas et sit amet odio. Morbi lacinia velit in nibh sodales sed pharetra sem feugiat. Vivamus ut 
    //     cursus augue. Integer sit amet arcu lorem, at egestas tellus. Phasellus tellus orci, congue at tristique at,  mattis ut arcu. Donec dictum eros eu 
    //     felis laoreet egestas. Nullam adipiscing nibh id felis lacinia a iaculis nisi vestibulum. Ut sit amet urna enim, at accumsan quam. Nunc dui elit, hendrerit quis convallis sit amet,`, imgUrl:'./../../styles/imgs/accounting.jpg', comments:[]},
    //     {linkName:'test7', author:'This is a test 7', date:'March 3, 2017', category:'accounting', title:'Accounting Issues to Watch', content:`Rhoncus quis, varius sed velit. 
    //     Mauris quis nunc eu nunc molestie egestas et sit amet odio. Morbi lacinia velit in nibh sodales sed pharetra sem feugiat. Vivamus ut 
    //     cursus augue. Integer sit amet arcu lorem, at egestas tellus. Phasellus tellus orci, congue at tristique at,  mattis ut arcu. Donec dictum eros eu 
    //     felis laoreet egestas. Nullam adipiscing nibh id felis lacinia a iaculis nisi vestibulum. Ut sit amet urna enim, at accumsan quam. Nunc dui elit, hendrerit quis convallis sit amet,`, imgUrl:'./../../styles/imgs/accounting.jpg', comments:[]}
    // ]
    // database.addJSONToDB('articles', articlesArr);
    database.getItems('articles')
    .then((articles) => {

        let articlesUid = Object.keys(articles.val());
        let articlesItems = [];
        let pageIndex = [];
        for (let i=articlesUid.length-1, y=1; i>=0; i--, y++) {
            let currentArticleUid = articlesUid[i] 
            articlesItems.push(articles.val()[currentArticleUid]);
            if (y<=articlesUid.length/2+1) {
                pageIndex.push(y);
            }
        };
        const templateData = {activePage:1, pageCount: pageIndex[pageIndex.length-1], pageIndex: pageIndex.slice(1), articlesItems: [articlesItems[0], articlesItems[1]]};
        templates.get('articles').then((template) => {
            context.$element().html(template(templateData));
            let $activePage = $('.tm-active-page');
            $('.pagination').on('click', (ev) => {
                if (ev.target.nodeName === 'BUTTON') {
                    $activePage.removeClass('tm-active-page');
                    let $currentPage = $(ev.target);
                    $currentPage.addClass('tm-active-page');
                    $activePage =  $('.tm-active-page');
                    let $currentPageNumber = $currentPage.html();

                    console.log($currentPageNumber);

                    $('.tm-active-page-info').html($currentPageNumber);
                    let currentPageArticles ='';
                    for (let i = (+$currentPageNumber-1)*2; i <= (+$currentPageNumber-1)*2 + 1; i++ ) {
                        if (articlesItems[i]) {
                            currentPageArticles+=`<div class="tm-article-main col-xs-12 col-md-8">
                            <h2>${articlesItems[i].title}</h2>
                            <div>Posted by ${articlesItems[i].author}</div>
                            </div>` 
                        }
                    }
                    $('.tm-current-articles-container').html(currentPageArticles);
                }
            })
        });

    })

}

export { all };