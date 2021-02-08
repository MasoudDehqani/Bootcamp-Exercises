"use strict";
var rootElement = document.querySelector("#root");
var CommentCard = (function () {
    function CommentCard(id, text, userName, imageUrl, date, point, isLiked, isDisliked) {
        this.id = id;
        this.text = text;
        this.userName = userName;
        this.imageUrl = imageUrl;
        this.date = date;
        this.point = point;
        this.isLiked = isLiked;
        this.isDisliked = isDisliked;
    }
    CommentCard.prototype.like = function () {
        if (!this.isLiked) {
            this.point += 1;
            this.isLiked = true;
            this.isDisliked = false;
            return;
        }
        alert("You already liked it");
    };
    CommentCard.prototype.dislike = function () {
        if (!this.isDisliked) {
            this.point -= 1;
            this.isDisliked = true;
            this.isLiked = false;
            return;
        }
        alert("You already disliked it");
    };
    return CommentCard;
}());
var builder = {
    create: function (elementName) {
        var elemet = document.createElement(elementName);
        return new ElementBuilder(elemet);
    }
};
var ElementBuilder = (function () {
    function ElementBuilder(parentElement) {
        this.parentElement = parentElement;
        this.parentElement = parentElement;
    }
    ElementBuilder.prototype.setStyle = function (styles) {
        this.parentElement.style.cssText = styles;
        return this;
    };
    ElementBuilder.prototype.setText = function (text) {
        this.parentElement.textContent = text;
        return this;
    };
    ElementBuilder.prototype.setBackgroundImage = function (image) {
        this.parentElement.style.backgroundImage = "url(" + image + ")";
        return this;
    };
    ElementBuilder.prototype.appendTo = function (parent) {
        parent.appendChild(this.parentElement);
        return this;
    };
    ElementBuilder.prototype.returnElement = function () {
        return this.parentElement;
    };
    return ElementBuilder;
}());
var App = (function () {
    function App() {
    }
    App.init = function (commentsArray, rootElement) {
        var functionalCommentsArray = commentsArray.map(function (comment) {
            var id = comment.id, text = comment.text, userName = comment.userName, imageUrl = comment.imageUrl, date = comment.date, point = comment.point;
            var commentObject = new CommentCard(id, text, userName, imageUrl, date, point, false, false);
            return commentObject;
        });
        functionalCommentsArray.forEach(function (functionalComment) {
            var id = functionalComment.id, text = functionalComment.text, userName = functionalComment.userName, imageUrl = functionalComment.imageUrl, date = functionalComment.date, point = functionalComment.point;
            var commentContainer = builder.create('div')
                .setStyle(App.styles.commentContainer)
                .appendTo(rootElement)
                .returnElement();
            var headSection = builder.create('div')
                .setStyle(App.styles.headSection)
                .appendTo(commentContainer)
                .returnElement();
            var avatarUserName = builder.create('div')
                .setStyle(App.styles.avatarUserName)
                .appendTo(headSection)
                .returnElement();
            builder.create('span')
                .setStyle(App.styles.avatar)
                .setBackgroundImage(imageUrl)
                .appendTo(avatarUserName);
            var u = builder.create('span')
                .setText("" + userName)
                .setStyle(App.styles.userName)
                .appendTo(avatarUserName);
            var likeDislikePoint = builder.create('div')
                .setStyle(App.styles.likeDislikePoint)
                .appendTo(headSection)
                .returnElement();
            var totalPoints = builder.create('span')
                .setText("Total Points: " + point)
                .appendTo(likeDislikePoint);
            var like = builder.create('span')
                .setStyle(App.styles.likeDislikePoint)
                .setText("👍")
                .setStyle(App.styles.like)
                .appendTo(likeDislikePoint)
                .returnElement()
                .addEventListener('click', function () {
                functionalComment.like();
                totalPoints.setText("Total Points: " + functionalComment.point);
            });
            ;
            var dislike = builder.create('span')
                .setStyle(App.styles.likeDislikePoint)
                .setText("👎")
                .setStyle(App.styles.dislike)
                .appendTo(likeDislikePoint)
                .returnElement()
                .addEventListener('click', function () {
                functionalComment.dislike();
                totalPoints.setText("Total Points: " + functionalComment.point);
            });
            builder.create("p")
                .setStyle(App.styles.commentText)
                .setText(text)
                .appendTo(commentContainer);
            builder.create('span')
                .setStyle(App.styles.date)
                .setText(date)
                .appendTo(commentContainer);
        });
    };
    App.styles = {
        commentContainer: "\n      display: flex;\n      flex-direction: column;\n      margin: 20px 5px;\n      font-size: 14px;\n      padding: 10px;\n      box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.2);\n      border-radius: 10px;\n      font-family: sans-serif",
        headSection: "\n      display: flex;\n      justify-content: space-between;\n      align-items: center\n    ",
        avatar: "\n      width: 60px;\n      height: 60px;\n      border-radius: 50px;\n      background-size: cover;\n      margin-right: 10px;\n      vertical-align: middle\n    ",
        userName: "\n      line-height: 60px\n    ",
        avatarUserName: "\n      display: flex;\n      justify-content: space-between;\n      font-weight: bold\n    ",
        likeDislikePoint: "\n      font-weight: bold;\n      user-select: none\n    ",
        like: "\n      cursor: pointer;\n      margin: 0 5px;\n    ",
        dislike: "\n      cursor: pointer;\n      margin: 0 5px;\n    ",
        commentText: "\n    ",
        date: "\n    align-self: flex-end\n    "
    };
    return App;
}());
var comments = [
    {
        id: "1",
        text: "Great welcoming experience to the Dominican. We used Otium for the airport transport- we were to the resort in 20 minutes. Ralphy has been our concierge for the first half of the stay, he been very helpful- always able to pull through for anything we request",
        userName: "Jake W",
        imageUrl: "https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/9e/avatar069.jpg",
        date: "January 2020",
        point: 11,
    },
    {
        id: "2",
        text: "We travelled as a group of 13 ages 18 to 80 and this resort was enjoyed by all. We’ve been fortunate to travel to many resorts in Punta Cana but the Grand was by far the best",
        userName: "Andrea C",
        imageUrl: "https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/55/avatar028.jpg",
        date: "Jan 2020",
        point: 14,
    },
    {
        id: "3",
        text: "The Hotel opened 1-1,5 hs ago. Everything is new and very clean. Even the cheapest rooms are very spacious (77square meters and room and dinning area with sofa bed are diivided by a sliding door).",
        userName: "sergiogiaco",
        imageUrl: "https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/74/avatar056.jpg",
        date: "Dec 2020",
        point: 11,
    },
];
App.init(comments, rootElement);
//# sourceMappingURL=commentCards.js.map