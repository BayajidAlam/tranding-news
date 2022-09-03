const loadCaregory = () =>{
  fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(res => res.json())
  // .then(data => console.log(data))
  .then(data =>DisplayCategory(data.data.news_category));

  
}
loadCaregory()

const DisplayCategory = data =>{
  const categoryConatiner = document.getElementById('category-container');
  for(category of data){
    console.log(category)
    const categoryItem = document.createElement('div');
    categoryItem.innerHTML=`
      <h2 >${category.category_name}</h2>
    `
    categoryConatiner.appendChild(categoryItem)
  }
}
