
class Article {
    constructor(author, date, category, title, content, imgUrl) {
        this.author = author;
        this.date = date;
        this.category = category;
        this.title = title;
        this.content = content;
        this.imgUrl = imgUrl;
        this.comments = [];
    }
}

export { Article as default }