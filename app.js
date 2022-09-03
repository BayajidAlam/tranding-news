// load alldata
const loadCaregory = () =>{
  fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(res => res.json())
  .then(data =>DisplayCategory(data.data.news_category));
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
  const{thumbnail_url,title,details,img} = newsData

 div.innerHTML = `
  <div class="card card-side bg-base-100 my-2 shadow-xl">
  <figure><img class="h-full w-auto" src="${thumbnail_url
  }" alt="Movie"></figure>
  <div class="card-body">
    <h2 class="card-title">${title}</h2>
    <p>${details.length > 600?details.slice(0,600
      ) +"...":details}</p>

    <div class="text-center">
        
          <label for="my-modal-3" class="btn modal-button">See More</label>

         
          <input type="checkbox" id="my-modal-3" class="modal-toggle" />
          <div class="modal">
          <div class="modal-box relative">
          <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          
        <div>
          <div class="card w-full bg-base-100 shadow-xl">
          <figure><img src="${thumbnail_url}" alt="Shoes" /></figure>
          <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${details}</p>
            <div class="card-actions justify-end">
              
            </div>
          </div>
        </div>
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
             <div>${newsData.author.published_date.length >10?newsData.author.published_date.slice(0,10):newsData.author.published_date}</div>
         </div>
     </div>
         <div><i class="fa-thin fa-eye"></i>${newsData.total_view
         }</div>
    </div>

  </div>
</div>
  `
  cardContainer.appendChild(div);
 }
//  spinning will stop after the function is exicuter by next line
 spinner.classList.add('hidden')

}
