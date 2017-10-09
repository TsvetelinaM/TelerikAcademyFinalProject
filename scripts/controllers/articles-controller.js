
import * as templates from 'templates';
import  'bootstrap';
import database from 'database';
import $ from 'jquery';
import toastr from 'toastr';
import Article from 'classArticle';
import Comment from 'classComment';

const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };

  const escapeHtml = (string) => {
    return String(string).replace(/[&<>"'`=\/]/g, (s) => {
      return entityMap[s];
    });
  };

function getAllArticles(context) {
    // const articlesArr = [
    //     {linkName:'Tax_at_source_for_interest_income', author:'Georgi Marinov', date:'15-08-2016', category:'Taxes', title:'Tax at source for interest income on loans from a foreign entity to a Bulgarian company', 
    //     content:`A Bulgarian company concludes a loan agreement with a foreign company, which doesn’t have a place of business activity in the country. The interest of the loan agreement is an income for the foreign entity and under the Bulgarian 
    //     laws, it is a subject to tax with a tax at source, which is final. This is applicable in the hypothesis of loan agreements which are concluded between a Bulgarian legal entity and a foreign legal entity which doesn’t have business activity 
    //     in our country. The foreign company, in its capacity as a lender, provides to the Bulgarian company a loan with a certain interest and terms, in which the Bulgarian company is obliged to repay the utilized loan and accumulated interest. 
    //     For the term of the agreement the Bulgarian company reports expenses, because it shall pay loan interests to the lender, subject to a tax at the source. This tax is levied also an all type of penalties and compensations, except for the 
    //     compensations of insurance contracts which are charged by local residents or sole traders or foreign legal persons and soles traders by place of business activity or an exact base in the country to foreign legal persons advantage.`, imgUrl:'./../../styles/imgs/article5.jpg', comments:[], commentsCounter:'0'},       
    //     {linkName:'Responsibility_of_the_manager', author:'Georgi Marinov', date:'16-08-2016', category:'Taxes', title:'Responsibility of the manager in case of company assets reduction and tax liabilities', 
    //     content:`The Tax Insurance and Procedure Code (TIPC) provides for joint responsibility of a person (a manager or member of the management body of the company), who participates in reduction of the company assets, in the case where the 
    //     company has liabilities for taxes and social contributions, which National Revenue Agency (NRA) failed to collect. Anyone, who deliberately makes payments in cash or in-kind from the assets of a legal entity, which owes tax and 
    //     social contributions, in case these payments present a hidden profit distribution or dividend, or asset ownership is transferred as a gift or at non-market prices, and as a result taxes and social contributions were not paid, then 
    //     he/she will be responsible for the liabilities up to the performed payments, respectively to the size of the reduction of the assets of the company.`, imgUrl:'./../../styles/imgs/article4.jpg', comments:[], commentsCounter:'0'},       
    //     {linkName:'VAT_registration_of_an_entity', author:'Georgi Marinov', date:'16-02-2017', category:'Taxes', title:'VAT registration of an entity, whose manager has outstanding tax liabilities exceeding 5 000 BGN', 
    //     content:`It is a common case where the commercial activity of an entity requires VAT registration of a newly established company. However, it would be an obstacle if the manager has outstanding liabilities to the budget exceeding 5,000 BGN 
    //     (which originate from another entity). The VAT Act allows NRA (the National Revenue Agency) to refuse VAT registration in such cases. This is a special hypothesis for VAT registration refusal. Under Art 176a from the VAT Act, NRA can 
    //     refuse VAT registration to an entity if one or several of its owners, managers, procurators and/or major shareholders are (or were, as of the moment of occurrence of the liability) owners, procurators, major shareholders, members of 
    //     management or controlling bodies of other entities with non-settled VAT liabilities (or if they themselves have such liabilities) exceeding 5,000 BGN.`, imgUrl:'./../../styles/imgs/article3.jpg', comments:[], commentsCounter:'0'},
    //     {linkName:'4_Key_Accounting_Issues_to_Watch_in_2017', author:'Terry Sheridan', date:'11-01-2017', category:'Accounting', title:'4 Key Accounting Issues to Watch in 2017', 
    //     content:`1. Banks and credit losses.New rules on the reporting of loans and other credit losses portend one of the biggest changes ever in the financial accounting of banks and other companies, the report states.
    //     2. Insurance. Life insurance and annuities are complex as it is, and a FASB proposal to change insurance accounting rules “brings hurdles, because of challenges inherent in the sector as a whole,” the report states.
    //     3.Non-GAAP financial reporting. Will the SEC’s intense scrutiny of non-GAAP financial reporting continue this year? That’s the big question, according to Bloomberg BNA. A “flurry” of cautionary letters is expected, says one SEC staffer in the report.
    //     4. Auditor disclosure rules. New requirements in audit transparency and a revamp of the auditor’s report are coming, courtesy of the Public Company Accounting Oversight Board (PCAOB).`, imgUrl:'./../../styles/imgs/article1.jpg', comments:[], commentsCounter:'0'},
    //     {linkName:'Treasury_to_pull_regulations_after_review_of_burdensome_tax_rules', author:'Sally P. Schreiber', date:'05-10-2017', category:'Taxes', title:'Treasury to pull regulations after review of burdensome tax rules', 
    //     content:`The Treasury Department announced Wednesday that it will pull several tax regulations identified as burdensome under President Donald Trump’s Executive Order 13789, including the proposed Sec. 2704 regulations that would limit 
    //     valuation discounts for estate, gift, and generation-skipping transfer tax purposes (Second Report to the President on Identifying and Reducing Tax Regulatory Burdens (Oct. 4, 2017)). A Treasury press release said the regulations 
    //     (REG-163113-02) “would have hurt family-owned and operated businesses by limiting valuation discounts” and “made it difficult and costly for a family to transfer their businesses to the next generation.”
    //     A second regulation scheduled for full revocation is the proposed regulation under Sec. 103 defining a political subdivision for tax-exempt bond purposes (REG-129067-15). According to Treasury’s press release, the added requirements 
    //     that require showing a governmental purpose and governmental control in order to qualify as a political subdivision “would have been costly and burdensome.”`, imgUrl:'./../../styles/imgs/article2.jpg', comments:[], commentsCounter:'0'},
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
        const templateData = {activePage:1, pageCount: pageIndex[pageIndex.length-1], pageIndex: pageIndex.slice(1), articlesItems: [articlesItems[0], articlesItems[1]], allArticles:articlesItems};
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
                            let commentsCounter = 0
                            if (articlesItems[i].comments) {
                                commentsCounter = articlesItems[i].comments.length
                            }
                            currentPageArticles+=`<div class="tm-article-main col-xs-12 col-md-8">
                                                    <h2 class="tm-gradient-grey-color tm-article-title tm-Colaborate-30px"><p>${articlesItems[i].title}</p></h2>
                                                    <div class="tm-gradient-white-color tm-article-posted-by">Posted by ${articlesItems[i].author} on ${articlesItems[i].date} in ${articlesItems[i].category} | ${commentsCounter} Comments</div>
                                                    <div class="container tm-hbox tm-article-main-part-container">
                                                        <div class="col-md-4 tm-img-container tm-article-img">
                                                            <img src=${articlesItems[i].imgUrl} alt="" class="tm-img">
                                                            <div class="tm-middle">
                                                                <img src="./../styles/imgs/enlarge.png" alt="" >
                                                                <img src="./../styles/imgs/zoom-in.png" alt="" >                    
                                                            </div>
                                                        </div>
                                                        <div class="container tm-article-content-container col-md-8">
                                                            ${articlesItems[i].content}
                                                        </div>
                                                    </div>
                                                    <div class="tm-article-btn tm-active-page">
                                                        <a href="#/articles/${articlesItems[i].linkName}">Read More</a>
                                                    </div>
                                                </div>`
                        }
                    }
                    $('.tm-current-articles-container').html(currentPageArticles);
                }
            })
        });

    })

}

function getSingleArticle(context) {
    database.getItems('articles')
    .then((articles) => {
        const currentArticleName = this.params['name'];
        let articlesItems = [];
        let articlesUid = Object.keys(articles.val());
        
        for (let i=articlesUid.length-1, y=1; i>=0; i--, y++) {
            const currentArticleUid = articlesUid[i];
            const articleWithUid = articles.val()[currentArticleUid];
            articleWithUid.uid = currentArticleUid;
            articlesItems.push(articleWithUid);
            
        };
        const currentArticle = articlesItems.filter((article) => article.linkName === currentArticleName);
        const templateData = {currentArticleName, currentArticle, allArticles:articlesItems};
        console.log(currentArticle);
        templates.get('single_article').then((template) => {
            context.$element().html(template(templateData));

            const currentUser = JSON.parse(localStorage.getItem('displayUser'));
            $('.tm-comments-toggle-btn').on('click', (ev) => {
                $('.tm-dialogs-container').toggleClass('tm-hidden');
            });
            $('.tm-comments-input').on('focus', (ev) => {
                
                if (currentUser) {
                    $(ev.target).val('');
                    $('.tm-post-comment-btn').removeClass('tm-hidden');
                } else {
                    toastr.error('Please sign in to leave a comment!');
                }
            });

            $('.tm-post-comment-btn').on('click', (ev)=>{
                const comment = escapeHtml($('.tm-comments-input').val().trim());
                if (comment.length) {
                    const currentDate = new Date();
                    let day = currentDate.getDate();
                    if ( day < 10 ) {
                        day = '0' + day;
                    }
                    let month = currentDate.getMonth() + 1;
                    if ( month < 10 ) {
                        month = '0' + month;
                    }
                    const year = currentDate.getFullYear();
                    const stringDate = day+'-'+month+'-'+year;

                    const addComment = new Comment(currentUser.displayName, stringDate, comment);

                    
                    currentArticle[0].commentsCounter = +currentArticle[0].commentsCounter + 1;
                    $('.tm-comments-counter-span').html(currentArticle[0].commentsCounter);
                    const commentHTML = `<div class="container tm-comment-dialog-container tm-hbox">
                    <div class="tm-comment-img-date-container">
                        <div class="col-md-4 tm-img-container tm-comment-img">
                            <div class="tm-img-shadow-container">
                                <div class="tm-img-shadow"></div>
                                <img src="./../styles/imgs/kai.jpeg" alt="" class="tm-img">
                            </div>
                        </div>
                        <div class="tm-comment-date">${addComment.date}</div>
                    </div>
                    <div class="container-fluid tm-dialog-container">
                        <div class="tm-dialog">
                            <span class="tm-top-bot"></span>
                            <span class="tm-top-bot tm-top-bot-border"></span>
                            <div class="tm-dialog-content">
                                <span class="tm-comment-author">${addComment.author} says:</span> 
                                <span class="tm-comment-content">${addComment.comment}</span>
                                <button class="tm-comment-btn tm-active-page">Read More</button>
                            </div>
                        </div>
                    </div>
                </div>`;
                    $('.tm-dialogs-container').append(commentHTML);
                    database.pushItems('comments', addComment)
                    .then((conf) => {
                        return database.pushItems('articles/'+currentArticle[0].uid+'/comments', addComment);
                    })
                    .then((conf) => {
                        return database.pushItemByGivenElement('articles/'+currentArticle[0].uid, 'commentsCounter', currentArticle[0].commentsCounter);
                    })
                    .catch((err) => toastr.error(err.msg));
                } else {
                    toastr.error('The comment should not be empty!');
                }
                
                $('.tm-comments-input').val('Leave a Comment');
                $(ev.target).addClass('tm-hidden');
            })
        });

        

    })

}

function addArticle(context) {
        templates.get('add_article').then((template) => {
            context.$element().html(template());
    });
}

export { getAllArticles, getSingleArticle, addArticle };