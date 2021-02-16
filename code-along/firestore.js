document.addEventListener('DOMContentLoaded', async function(event) {
  let db = firebase.firestore() 
  //^^ ths is abiltiy to talk to firestore 
 
  // Step 1: Make the world's tiniest to-do app
  let form = document.querySelector('form') 
  form.addEventListener('submit', async function(event) {
    event.preventDefault()
    //console.log('todo submitted')

    let todoText = document.querySelector('#todo').value 
    console.log(todoText)
if (todoText.length > 0)  {
  let todoList = document.querySelector('.todos')
  todoList.insertAdjacentHTML('beforeend', `${todoText}`
  )
//This adds to firestore data base
  let docRef = await db.collection('ToDos_Week6').add({ 
    text: todoText

  })

  let todoID = docRef.id
  console.log(`new todo created: ${todoID}`)

  document.querySelector('#todo').value = ''
}
   
  })
  // Step 2: Read existing to-dos from Firestore

  let querySnapshot = await db.collection('ToDos_Week6').get()
  console.log(querySnapshot.size)

  let todos = querySnapshot.docs
  console.log(todos)

  for(let i = 0; i <todos.length; i++){
    let todo = todos[i]
    //console.log(todo)
    let todoId = todo.todoId
    console.log(todoId)
    let todoData = todo.data()
    console.log(todoData)
    let todoText=todoData.text
    let todoList = document.querySelector('.todos')
    todoList.insertAdjacentHTML('beforeend', `
      <div class = "todo-${todoId} py-4 text-xl border-b-2 border-purple-500
      <a href="#" class = "done p-2 text-sm bg-green-500 text-white"></a>
    ${todoText}    </div>` 
    )

    document.querySelector(`.todo-${todoId}.done`)
  // Step 4: Add code to allow completing todos
  let todoLink = document.querySelector(`.todo-${todoId} .done`)
    todoLink.addEventListener('click', async function(event) { 
      event.preventDefault()
      console.log(`${todoLink} was clicked`)

      ///add more missing code here --> document.querySelector() LOOK AT FIRESTORECOMPLETE FLIE!!!!
    })
  }

  // Step 3: Add code to Step 1 to add todo to Firestore
  
  // Step 4: Add code to allow completing todos
})