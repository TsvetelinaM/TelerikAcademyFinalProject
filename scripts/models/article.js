
class Article {
    constructor(author, date, title, content, image) {
        this.author = author;
        this.date = date;
        this.title = title;
        this.content = content;
        this.image = image;
        this.comments = [];
    }
}

export { Article as default }