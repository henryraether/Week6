// First, sign up for an account at https://themoviedb.org
// Once verified and signed-in, go to Settings and create a new
// API key; in the form, indicate that you'll be using this API
// key for educational or personal use, and you should receive
// your new key right away.

// For this exercise, we'll be using the "now playing" API endpoint
// https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US

// Note: image data returned by the API will only give you the filename;
// prepend with `https://image.tmdb.org/t/p/w500/` to get the 
// complete image URL

window.addEventListener('DOMContentLoaded', async function(event) {
  // Step 1: Construct a URL to get movies playing now from TMDB, fetch
  // data and put the Array of movie Objects in a variable called
  // movies. Write the contents of this array to the JavaScript
  // console to ensure you've got good data
  // ⬇️ ⬇️ ⬇️
let url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=11b396b295f274c757445c46848480c6'
//might want to us: 'https://api.themoviedb.org/3/movie/now_playing?api_key=${11b396b295f274c757445c46848480c6}&language=en-US'???
  let response = await fetch(url)
  let json = await response.json()
  let movies = json.results
  let db = firebase.firestore()

  let WatchedSnapshot = await db.collection('Watched').get()
  console.log(movies)
  console.log(WatchedSnapshot)

  let WatchedMovies = WatchedSnapshot.docs

  // ⬆️ ⬆️ ⬆️ 
  // End Step 1
  
  // Step 2: 
  // - Loop through the Array called movies and insert HTML
  //   into the existing DOM element with the class name .movies
  // - Include a "watched" button to click for each movie
  // - Give each "movie" a unique class name based on its numeric
  //   ID field.
  // Some HTML that would look pretty good... replace with real values :)
  // <div class="w-1/5 p-4 movie-abcdefg1234567">
  //   <img src="https://image.tmdb.org/t/p/w500/moviePosterPath.jpg" class="w-full">
  //   <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
  // </div>
  // ⬇️ ⬇️ ⬇️
    for(let i=0; i < movies.length; i++){
      let movieId = movies[i].id
      let dbMovie = await db.collection('Watched').doc(`${movieId}`).get()
      let dbMovieData = dbMovie.data()
      let movie = movies[i]
      let posterUrl = movies[i].poster_path

      console.log(movieId)
      console.log(posterUrl)
      let movieDOMElement = document.querySelector('.movies')

      movieDOMElement.insertAdjacentHTML('beforeend', `
    <div class="movies-${movieId} w-1/5 p-4">
    <img src="https://image.tmdb.org/t/p/w500${posterUrl}" class="w-full">
      <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
      </div>
      </div>` )

      
if (dbMovieData ){
  let movieView = document.querySelector(`.movies-${movieId}`)
        movieView.classList.add('opacity-20')
}

   
      let watchedButton = document.querySelector(`.movies-${movieId}`)
      watchedButton.addEventListener('click', async function  (event) {
        event.preventDefault()
        
        let movieView = document.querySelector(`.movies-${movieId}`)
        movieView.classList.add('opacity-20')
        await db.collection('Watched').doc(`${movieId}`).set({})



      })
    }
    
  // ⬆️ ⬆️ ⬆️ 
  // End Step 2

  // Step 3: 
  // - Attach an event listener to each "watched button"
  // - Be sure to prevent the default behavior of the button
  // - When the "watched button" is clicked, changed the opacity
  //   of the entire "movie" by using .classList.add('opacity-20')
  // - When done, refresh the page... does the opacity stick?
  // - Bonus challenge: add code to "un-watch" the movie by
  //   using .classList.contains('opacity-20') to check if 
  //   the movie is watched. Use .classList.remove('opacity-20')
  //   to remove the class if the element already contains it.
  // ⬇️ ⬇️ ⬇️
  // let db = firebase.firestore()

  // let watchedButtons = document.querySelectorAll('.watched-button')
  // console.log(watchedButtons)
  // watchedButtons.addEventListener('click', async function  (event) {
  //   event.preventDefault()
  //   document.querySelector('.movie-movieid').classList.add('opacity-20')
  // })
  
  
  // window.addEventListener('DOMContentLoaded', async function(event) {

  //   let movieLink = document.querySelector(`.movie-${movieID} .watched-button`)
  // console.log(movieLink)
  
  //   document.querySelector('.watched-button').addEventListener('click', async function(event) {
  //     event.preventDefault()
  //     // let movieId = document.querySelector('#username').value
  //     // let movieImageUrl = document.querySelector('#image-url').value
  
  //     document.querySelector(`movies-${m}`).classList.add('opacity-20')
  //     await db.collection('watched-button').add({movieId})
  //     console.log(`I've watched this for ${movieId} clicked`)
  //   })
  // })
  // let querySnapshot=await db.collection('watched-tmdb').get()
  // let watchedMovies=querySnapshot.docs

  // for(let j=0;j<watchedMovies.length;j++){
  // if(watchedMovies[j].data()) {
  // let movId=watchedMovies[j].data()
  // let m= movId.text
      
  // document.querySelector(`movies-${m}`).classList.add('opacity-20')
  //   console.log()
  // }   }
  // ⬆️ ⬆️ ⬆️ 
  // End Step 3

  // Step 4: 
  // - Properly configure Firebase and Firebase Cloud Firestore
  // - Inside your "watched button" event listener, you wrote in
  //   step 3, after successfully setting opacity, persist data
  //   for movies watched to Firebase.
  // - The data could be stored in a variety of ways, but the 
  //   easiest approach would be to use the TMDB movie ID as the
  //   document ID in a "watched" Firestore collection.
  // - Hint: you can use .set({}) to create a document with
  //   no data – in this case, the document doesn't need any data;
  //   if a TMDB movie ID is in the "watched" collection, the 
  //   movie has been watched, otherwise it hasn't.
  // - Modify the code you wrote in Step 2 to conditionally
  //   make the movie opaque if it's already watched in the 
  //   database.
  // - Hint: you can use if (document) with no comparison
  //   operator to test for the existence of an object.

    // attach an event listener to the specific like button using the .post-* selector
  
    
    //let docRef=await db.collection(`movies`).doc(`${movieId}`).set({})
    

  })
//     for(let j=0;j<watchedMovies.length;j++){
//       if(watchedMovies[j].data()) {
//         let movieId=(`${json.results[j].id}`)
//       let m= movId.text

//     let movieClicked= document.querySelector(`.watched-${json.results[i].id}` )
//     console.log(movieClicked)
//     movieClicked.addEventListener('click', async function(event){
//   //if(document.querySelector(`.watched-${json.results[i].id}`).classList.contains(`opacity-20`))
//   temp = db.collection('movies').doc('${json.results[i].id').get()
// if ( temp.exists) {
//     document.querySelector(`.watched-${json.results[i].id}`).classList.remove(`opacity-20`)
//   docRef=await db.collection(`movies`).doc(`${movieId}`).set({})}

//   else{document.querySelector(`.watched-${json.results[i].id}`).classList.add(`opacity-20`)
// //let docRef=await db.collection(`movies`).doc(`${movieId}`).set({})
//  docRef=await db.collection(`movies`).doc(`${movieId}`).update({text: `watched`})
//     console.log(docRef)
// }
// })
// }
  // }