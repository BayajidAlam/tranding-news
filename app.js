const loadCaregory = () =>{
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
  .then(res =>res.json())
  .then(data => displayCategory(data.data.news_category[0].category_name));
}


const displayCategory= data =>{
  const categoryContainer = document.getElementById('category-container');
  for(const category of data){
    console.log(category)
  }

}
displayCategory()