const rootElement = document.querySelector("#root")! as HTMLDivElement;

interface CommentsType {
  id: string;
  text: string;
  userName: string;
  imageUrl: string;
  date: string;
  point: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  like?: Function
  dislike?: Function
}

class CommentCard implements CommentsType {
  id;
  text;
  userName;
  imageUrl;
  date;
  point;
  isLiked;
  isDisliked;

  constructor(id: string, text: string, userName: string, imageUrl: string, date: string, point: number, isLiked: boolean, isDisliked: boolean) {
    this.id = id
    this.text = text
    this.userName = userName
    this.imageUrl = imageUrl
    this.date = date
    this.point = point
    this.isLiked = isLiked
    this.isDisliked = isDisliked
  }

  like(this: CommentCard) {
    if (!this.isLiked) {
      this.point += 1
      this.isLiked = true
      this.isDisliked = false
      return
    }
    alert("You already liked it")
  }

  dislike(this: CommentCard) {
    if (!this.isDisliked) {
      this.point -= 1
      this.isDisliked = true
      this.isLiked = false
      return
    }
    alert("You already disliked it")
  }
}

const builder = {
  create(elementName: string) {
    const elemet = document.createElement(elementName)
    return new ElementBuilder(elemet)
  }
}

class ElementBuilder {

  constructor(private parentElement: HTMLElement) {
    this.parentElement = parentElement
  }

  setStyle(this: ElementBuilder, styles: string) {
    this.parentElement.style.cssText = styles
    return this
  }

  setText(this: ElementBuilder, text: string) {
    this.parentElement.textContent = text
    return this
  }

  setBackgroundImage(image: string) {
    this.parentElement.style.backgroundImage = `url(${image})`
    return this
  }

  appendTo(this: ElementBuilder, parent: HTMLElement) {
    parent.appendChild(this.parentElement)
    return this
  }

  // static likeDislikeclickHandler(like: HTMLElement, point: number, dislike: HTMLElement, totalPoints: any) {

  //   like.addEventListener('click', likeClickHandler)
  //   dislike.addEventListener("click", dislikeClickHandler)

  //   function likeClickHandler() {
  //     point += 1
  //     like.removeEventListener('click', likeClickHandler)
  //     dislike.addEventListener('click', dislikeClickHandler)
  //     like.addEventListener("click", likeAlert)
  //     dislike.removeEventListener("click", dislikeAlert)
  //     totalPoints.setText(`Total Points: ${point}`)
  //   }

  //   function likeAlert() {
  //     alert("Yuo already liked it")
  //   }

  //   function dislikeClickHandler() {
  //     point -= 1
  //     dislike.removeEventListener('click', dislikeClickHandler)
  //     like.addEventListener('click', likeClickHandler)
  //     dislike.addEventListener("click", dislikeAlert)
  //     like.removeEventListener('click', likeAlert)
  //     totalPoints.setText(`Total Points: ${point}`)
  //   }
    
  //   function dislikeAlert() {
  //     alert("Your already disliked it")
  //   }
  // }

  returnElement(this: ElementBuilder) {
    return this.parentElement
  }
}

class App {

  private static styles = {
    commentContainer: `
      display: flex;
      flex-direction: column;
      margin: 20px 5px;
      font-size: 14px;
      padding: 10px;
      box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.2);
      border-radius: 10px;
      font-family: sans-serif`,

    headSection: `
      display: flex;
      justify-content: space-between;
      align-items: center
    `,

    avatar: `
      width: 60px;
      height: 60px;
      border-radius: 50px;
      background-size: cover;
      margin-right: 10px;
      vertical-align: middle
    `,

    userName: `
      line-height: 60px
    `,

    avatarUserName: `
      display: flex;
      justify-content: space-between;
      font-weight: bold
    `,

    likeDislikePoint: `
      font-weight: bold;
      user-select: none
    `,

    like: `
      cursor: pointer;
      margin: 0 5px;
    `,

    dislike: `
      cursor: pointer;
      margin: 0 5px;
    `,

    commentText: `
    `,

    date: `
    align-self: flex-end
    `
  };

  static init(commentsArray: CommentsType[], rootElement: HTMLElement) {

    const functionalCommentsArray = commentsArray.map( comment => {
      let {id, text, userName, imageUrl, date, point} = comment
      let commentObject = new CommentCard(id, text, userName, imageUrl, date, point, false, false)
      return commentObject
    })

    functionalCommentsArray.forEach( functionalComment => {
      let {id, text, userName, imageUrl, date, point} = functionalComment

      const commentContainer = builder.create('div')
        .setStyle(App.styles.commentContainer)
        .appendTo(rootElement)
        .returnElement();
      
      const headSection = builder.create('div')
        .setStyle(App.styles.headSection)
        .appendTo(commentContainer)
        .returnElement();
  
      const avatarUserName = builder.create('div')
        .setStyle(App.styles.avatarUserName)
        .appendTo(headSection)
        .returnElement();
  
      builder.create('span')
        .setStyle(App.styles.avatar)
        .setBackgroundImage(imageUrl)
        .appendTo(avatarUserName);
  
      const u = builder.create('span')
        .setText(`${userName}`)
        .setStyle(App.styles.userName)
        .appendTo(avatarUserName);
  
      const likeDislikePoint = builder.create('div')
        .setStyle(App.styles.likeDislikePoint)
        .appendTo(headSection)
        .returnElement()
  
      const totalPoints = builder.create('span')
        .setText(`Total Points: ${point}`)
        .appendTo(likeDislikePoint);
      
      const like = builder.create('span')
        .setStyle(App.styles.likeDislikePoint)
        .setText("👍")
        .setStyle(App.styles.like)
        .appendTo(likeDislikePoint)
        .returnElement()
        .addEventListener('click', () => {
          functionalComment.like()
          totalPoints.setText(`Total Points: ${functionalComment.point}`)
        });;
  
      const dislike = builder.create('span')
        .setStyle(App.styles.likeDislikePoint)
        .setText("👎")
        .setStyle(App.styles.dislike)
        .appendTo(likeDislikePoint)
        .returnElement()
        .addEventListener('click', () => {
          functionalComment.dislike()
          totalPoints.setText(`Total Points: ${functionalComment.point}`)
        });
  
      // ElementBuilder.likeDislikeclickHandler(like, point, dislike, totalPoints)
  
      builder.create("p")
        .setStyle(App.styles.commentText)
        .setText(text)
        .appendTo(commentContainer);
  
      builder.create('span')
        .setStyle(App.styles.date)
        .setText(date)
        .appendTo(commentContainer)
    })
  }
}

const comments = [
  {
    id: "1",
    text:
      "Great welcoming experience to the Dominican. We used Otium for the airport transport- we were to the resort in 20 minutes. Ralphy has been our concierge for the first half of the stay, he been very helpful- always able to pull through for anything we request",
    userName: "Jake W",
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/9e/avatar069.jpg",
    date: "January 2020",
    point: 11,
  },
  {
    id: "2",
    text:
      "We travelled as a group of 13 ages 18 to 80 and this resort was enjoyed by all. We’ve been fortunate to travel to many resorts in Punta Cana but the Grand was by far the best",
    userName: "Andrea C",
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/55/avatar028.jpg",
    date: "Jan 2020",
    point: 14,
  },
  {
    id: "3",
    text:
      "The Hotel opened 1-1,5 hs ago. Everything is new and very clean. Even the cheapest rooms are very spacious (77square meters and room and dinning area with sofa bed are diivided by a sliding door).",
    userName: "sergiogiaco",
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/74/avatar056.jpg",
    date: "Dec 2020",
    point: 11,
  },
];

App.init(comments, rootElement)
