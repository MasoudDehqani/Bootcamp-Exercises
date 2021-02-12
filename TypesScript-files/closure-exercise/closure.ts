function closure(): Function[] {

  let arr = [
    {id: 1, title: "carpenter"},
    {id: 2, title: "teacher"},
    {id: 3, title: "programmer"}
  ]
  
  function add(title: string) {
    arr.push({id: arr[arr.length - 1].id + 1, title: title})
    return arr
  }

  function remove(id: number) {
    arr = arr.filter( el => el.id !== id)
    return arr
  }

  function getObjects() {
    return arr.sort((a, b) => a.id - b.id)
  }

  return [add, remove, getObjects]
}

let [add, remove, getObjects] = closure()

add("actor")
add("manager")
remove(2)
add("firefighter")
remove(5)
add("mentor")
remove(4)
console.log(getObjects())