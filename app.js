// load alldata
const loadCaregory = () =>{
  try{
    fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(res => res.json())
  .then(data =>DisplayCategory(data.data.news_category));
  }
  catch(error){
    console.log(error)
  }
}

loadCaregory()

// clear the found item div after every time
const foundCount = document.getElementById('found-count')
const div = document.createElement('div')
div.innerHTML = '';



// get the array of catagory

const DisplayCategory = data =>{
  const categoryConatiner = document.getElementById('category-container');
  for(category of data){
    const categoryItem = document.createElement('div');
    // add onclick function
    categoryItem.innerHTML=`
      <h2 onclick="loadAllInACategory(${category.category_id})">${category.category_name}</h2>
    `
    categoryConatiner.appendChild(categoryItem)
  }
}

const spinner = document.getElementById('spinner');

// lodg news array by catagory  id
const loadAllInACategory = (categoryID) =>{
  // spinning will start here
  spinner.classList.remove("hidden");

 fetch(` https://openapi.programming-hero.com/api/news/category/0${categoryID}`)
 .then(res => res.json())
 .then(data=>loadAllNewsInACategory(data.data))
 
}


// loop array to get single news  in a caragory and print number of news in a category
const loadAllNewsInACategory = (ids) =>{
  // print Number of founded etem on loop
  div.classList.add('found-item')
  div.innerHTML = `<p>${ids.length !== 0?ids.length +' News found':'No news found'}</p> `
  foundCount.appendChild(div);
 
  

  // loop the array here
  for(const id of ids){
    fetch(` https://openapi.programming-hero.com/api/news/${id._id}`)
    .then(res => res.json())
    .then(data =>loadNews(data.data[0]))
      
  }
 
  // display card using data of news object
 const loadNews = newsData =>{
  console.log(newsData)

  const cardContainer = document.getElementById('card-container')
 
  const div = document.createElement('div')
   
  // distucture the data from object
  const{thumbnail_url,title,details} = newsData
  
 div.innerHTML = `
  <div class="card card-side bg-base-100 my-2 shadow-xl">
  <figure><img class="h-full w-auto" src="${thumbnail_url
  }" alt="Movie"></figure>
  <div class="card-body">
    <h2 class="card-title">${title}</h2>
    <p>${details.length > 600?details.slice(0,600
      ) +"...":details}</p> 
      
      <div class="text-center">
         <!-- The button to open modal -->
<label for="my-modal-6" class="btn modal-button">Read more</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-6" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <div class="modal-action">
      <label for="my-modal-6" class="btn">Close</label>
    </div>
  </div>
</div>
      </div>
    
     <div class="flex justify-around">
      <div class="flex justify-around">
          <div>
            <img class="h-16 w-16 rounded-full mx-2" src="${newsData.author.img}" alt="">
          </div>
          <div>
             <div>${newsData.author.name}</div>
             <div>${newsData.author.published_date.length >10 ?newsData.author.published_date.slice(0,10):newsData.author.published_date}</div>
         </div>
     </div>
     <div class="flex mx-1 items-center">
         <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
         <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
         <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
       </svg>
       </div>
       <div>
       ${newsData.total_view !== 0?newsData.total_view:'Not Found'
         }</div>
      </div>
      </div>

  </div>
 </div>
  `
  cardContainer.appendChild(div)
 


//  spinning will stop after the function is exicuter by next line
 spinner.classList.add('hidden')

}

}