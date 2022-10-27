//API handling

const users = `https://jsonplaceholder.typicode.com/users`
const posts = `https://jsonplaceholder.typicode.com/posts`
const usersDiv = document.querySelector('.users')

//Fetch users
fetch('https://jsonplaceholder.typicode.com/users')
  .then(function (response){
      return response.json() //parse json
  })
  .then(function (data){
      appendData(data) //run append function on data
  })
  .catch(function (err){
      console.log('error: ' + err) //print any errors
  })

//Append user data to DOM
function appendData(data){
  const container = document.getElementById('users') //target users div
  for(let i = 0; i < data.length; i++){ //for every index in the array:
      const div = document.createElement('div') //grab div element
      div.innerHTML =  data[i].name //grab user's name
      div.classList.add('item') //add div with item class
      div.dataset.userId = data[i].id //grab id
      div.addEventListener('click', (event) => getPosts(event)) //click event listener to run getPosts function
      container.appendChild(div) //append div as a child in users div
    }
  }

  //clears list if it exists
  function clear(){
    const users = document.querySelectorAll('.item ul')
    for(let i = 0; i < users.length; i++){
        if(users[i]){
            users[i].style.display = 'none'
        }
    }
  }

  //Fetch posts
  function getPosts(event){
    const userId = event.target.dataset.userId;
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(json => renderPosts(json, event.target))
  }

  //render the posts
  function renderPosts(posts, target) {
    const postsList = target.childNodes[1]
    
    clear() //remove listed elements
    
    if(postsList){
        postsList.style.display = 'block'
    }else{
        const list = document.createElement("ul")
        
        //loop through posts array
        for(let i = 0; i < posts.length; i++){
            
            //grab dom elements
            const item = document.createElement("li")
            const liTitle = document.createElement("strong")
            const liBody = document.createElement("p")

            //data going into elements as HTML
            liTitle.innerHTML = posts[i].title
            liBody.innerHTML = posts[i].body

            //append list items as children
            item.appendChild(liTitle)
            item.appendChild(liBody)
            list.appendChild(item)
        }
        target.appendChild(list)
    }
}