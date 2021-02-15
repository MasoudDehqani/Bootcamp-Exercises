
// fetch("https://jsonplaceholder.typicode.com/photos").then( res => res.json()).then( res => console.log(res[0]))

import {rootElement} from '../commentCards/commentCards.js'
import {builder} from "../commentCards/commentCards.js"
rootElement.innerHTML = ''

const styles = {
  mainContainer: `
    display: flex;
    flex-direction: column;`,
  head: `
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 30px
  `,
  mainInput: `
    border-radius: 6px;
    outline: none;
    background-color: rgba(0,0,0,0.1);
    border: none;
    padding: 10px 10px
  `,
  loadButton: `
    margin-left: 0.6rem;
    border-radius: 6px;
    outline: none;
    border: none;
    width: 4rem;
    padding: 5px 5px;
    background-color: lightblue;
  `,
  recordsContainer: `
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  recordContainer:`
    height: fit-content;
    width: 20rem;
    margin-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 1px 1px 20px 1px rgba(0,0,0,0.2)
  `,
  thumbnail: `
    height: 10rem;
  `,
  titleBar: `
    text-align: center;
    padding: 10px 35px;
    color: black;
    background-color: #CDCDCD
  `
}

function render(): [HTMLElement, HTMLInputElement, HTMLElement] {
  const mainContainer = builder.create('div')
  .setStyle(styles.mainContainer)
  .appendTo(rootElement)
  .returnElement();

  const head = builder.create('div')
    .setStyle(styles.head)
    .appendTo(mainContainer)
    .returnElement();

  const recordsContainer = builder.create('div')
    .setStyle(styles.recordsContainer)
    .appendTo(mainContainer)
    .returnElement();

  const mainInput = builder.create('input')
    .setType("number")
    .setPlaceholder("Number of records")
    .setStyle(styles.mainInput)
    .appendTo(head)
    .returnElement() as HTMLInputElement;

  const loadButton = builder.create('button')
    .setStyle(styles.loadButton)
    .setText("Load")
    .appendTo(head)
    .returnElement();

  return [recordsContainer, mainInput, loadButton]
}

const [recordsContainer, mainInput, loadButton]: [HTMLElement, HTMLInputElement, HTMLElement] = render()

async function getPhotos() {
  let responsePromise = await fetch("https://jsonplaceholder.typicode.com/photos")
  if (!responsePromise.ok) throw new Error("Requested page not found")
  let response = await responsePromise.json()

  loadButton.addEventListener("click", () => {
    console.log(+mainInput.value)
    for (let i = 0; i < +mainInput.value; i++) {
      const recordContainer = builder.create('div')
        .setStyle(styles.recordContainer)
        .appendTo(recordsContainer)
        .returnElement();

      builder.create('div')
        .setStyle(styles.thumbnail)
        .setBackgroundImage(response[i].thumbnailUrl)
        .appendTo(recordContainer);

      const titleBar = builder.create('div')
        .setStyle(styles.titleBar)
        .setText(`Title: ${response[i].title}`)
        .appendTo(recordContainer)
    }
  })
}

getPhotos().catch( e => alert(e.message))