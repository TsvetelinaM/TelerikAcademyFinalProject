import * as templates from 'templates';
import  'bootstrap';
import database from 'database';
import $ from 'jquery';
import toastr from 'toastr';

function getAllServices(context) {
    // const servicesArr = [
    //     {linkName:'accounting',title:'Accounting', imgUrl:'./../../styles/imgs/accounting.jpg', content:[
    //     'Development of a company accounting policy and chart of accounts.',
    //     'Certification of annual financial statement by a registered auditor.',
    //     'Fixed assets: recording, preparation of depreciation plans, accrual of depreciation, stocktaking, periodic valuations, statistical returns.',
    //     'Stock: movement, stocktaking, periodic valuations, statistical returns.',
    //     'Processing of invoices: clients and suppliers.',
    //     'Preparation and verification of sales and purchases ledgers.',
    //     'Preparation and submission of monthly and annual VAT returns.',
    //     'Periodic valuations of receivables and liabilities in accordance with the accounting policy adopted by the company.',
    //     'Processing of bank statements, credit orders and debit orders in BGN and foreign currencies.',
    //     'Processing of reports on prepayments in BGN and foreign currencies.',
    //     'Booking of bank loans and leases in BGN and foreign currencies.',
    //     'Accrual of taxes and fees due pursuant to the Value Added Tax Act, Natural Persons Income Tax Act, Corporate Income Tax Act, and Local Taxes and Fees Act.',
    //     'Accrual of salaries and contractor fees due for the month.',
    //     'Accrual of social security contributions and wage cost taxes due for the month.',
    //     'Inspection- and audit-related returns required by the tax authorities.']},
    //     {linkName:'taxes',title:'Taxes', imgUrl:'./../../styles/imgs/taxes.jpg', content:[
    //     'Income tax prepayments: determination of type and amount.',
    //     'Expenditure taxes: vehicle, entertainment and social expenses.',
    //     'Taxes deducted at source: on dividends, liquidation quotas, interest payments, etc.',
    //     'Annual tax returns: determination of taxes due, completion and submission of tax return forms.',
    //     'Inspections and audits: legal representation, counsel and appeals.',
    //     'VAT registration with / deregistration from the National Revenue Agency',
    //     'Registration of cash registers in the National Revenue Agency.',
    //     'Preparation of returns, declarations, statements and sales and purchases ledgers.',
    //     'Preparation and submission of VIES declarations.',
    //     'Filings with the National Revenue Agency (authenticated by an electronic signature).',
    //     'Payment of VAT: preparation of payment orders.']},
    //     {linkName:'salaries', title:'Salaries and Personnel', imgUrl:'./../../styles/imgs/salary.jpg', content:[
    //         'Calculation of basic pay and additional payments.',
    //         'Calculation of holidays and compensations.',
    //         'Calculation of social and health insurance contributions.',
    //         'Preparation and submission of social security declarations (Form 1 and Form 6) (authenticated by an electronic signature).',
    //         'Preparation of payments orders for wages and social and health insurance contributions.',
    //         'Service contracts: accounts of amounts paid, fee statements and declarations.',
    //         'Representation during inspections and audits by the National Revenue Agency relating to State Social Security, Supplementary Compulsory Pension Insurance and Health Insurance.',
    //         'Preparation of employments contracts and addendums.',
    //         'Preparation of a notification pursuant to Article 62 of the Labour Code.',
    //         'Tracking of used/unused holidays.',
    //         'Documents related to the termination of employment contracts: records of employment, payroll statements and notices.',
    //         'Preparation and filing of documents relating to doctor’s notes.',
    //         'Certification of records of social security contributions.',
    //         'Preparation of certificates of insurable earnings (Forms UP 2 and 3).'
    //     ]},
    //     {linkName:'legal_services', title:'Legal services', imgUrl:'./../../styles/imgs/law.jpg', content:[
    //         'Registration of Bulgarian and foreign companies with the Registry Agency.',
    //         'Registration of companies with the Registry Agency (BULSTAT Register).',
    //         'Registration of non-profit legal entities with the Ministry of Justice.',
    //         'Issue of certificates of: tax liability; initiated enforcement proceedings; liquidation proceedings; good standing; insolvency proceedings;',
    //         'Issue of electronic signatures: preparation and submission of documents to Infonotary;',
    //         'Provision of legal consultations with highly qualified lawyers'
    //     ]},
    //     {linkName:'specialised_services', title:'Specialised services', imgUrl:'./../../styles/imgs/special.jpg', content:[
    //         'Monitoring of document management and financial reporting in companies that have their own accounting departments.',
    //         'Secondment of qualified accountants employed by Active Consult to the client’s premises.',
    //         'Periodic reports for the company’s management.',
    //         'Budget prepared in the standard format of Active Consult.',
    //         'Budget prepared according to the client’s specifications.',
    //         'Report on fixed assets and accumulated depreciation.',
    //         'Report on receivables and liabilities.',
    //         'Report on cash on hand and cash flows.',
    //         'Report on remaining amounts of loans and leases.',
    //         'Report on the company’s financial indicators.'
    //     ]},
    // ];
    // database.addJSONToDB('services', servicesArr);
    database.getItems('services')
    .then((services) =>{
        templates.get('services').then((template) => {
            context.$element().html(template(services.val()));
        })
    });

};

function getSingleService(context) {
    let templateData;
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
        templateData = { allArticles:articlesItems };
        return database.getItems('services')
    })
    .then((services) =>{
        const currentServiceName = this.params['name'];
        let servicesItems = [];
        let servicesUid = Object.keys(services.val());

        for (let i=servicesUid.length-1, y=1; i>=0; i--, y++) {
            let currentServiceUid = servicesUid[i];
            
            servicesItems.push(services.val()[currentServiceUid]);
        };

        const currentService = servicesItems.filter((service) => service.linkName === currentServiceName);
        templateData.currentServiceName = currentServiceName;
        templateData.currentService = currentService;
       console.log(currentService);
        templates.get('single_service').then((template) => {
            context.$element().html(template(templateData));
        })
    });

};


export { getAllServices, getSingleService };
