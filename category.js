const loadCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}



const displayCategories = categories => {
    const categoriesContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryName = category.category_name;
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <button onclick="loadThumbnails('${category.category_id}')">${categoryName}</button>
        `
        categoriesContainer.appendChild(categoryDiv);
    })
}
const loadThumbnails = (id) => {
    fetch(` https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayThumbnails(data.data))
}
const displayThumbnails = thumbnails => {
    const thumbnailContainer = document.getElementById('thumbnail-container');
    thumbnailContainer.innerHTML = ``;
    thumbnails.forEach(thumbnail => {
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.innerHTML = `
        <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${thumbnail.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${thumbnail.title}</h5>
                            <p class="card-text">${thumbnail.details.slice(0, 300)}</p>
                            <button onclick="loadThumbnailDetails('${thumbnail.news_id}')"href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#thumbnailDetailModal">show details</button>
                        <div class="d-flex justify-content-between">
                        <div></div>
                        <div></div>
                        <div></div>
                        </div>
                        </div>
                    </div>
                </div>
        `
        thumbnailContainer.appendChild(thumbnailDiv);

    })
}
const loadThumbnailDetails = async id => {
    const url = ` https://openapi.programming-hero.com/api/news/news_id`;
    const res = await fetch(url);
    const data = await res.json();
    displaythumbnailDetail(data.data);
}

const displaythumbnailDetail = thumbnail => {
    console.log(thumbnail);
    const modalTitle = document.getElementById('thumbnailDetailModalLabel');
    modalTitle.innerText = thumbnail.name;
    const thumbnailDetails = document.getElementById('thumbnail-detail');
    thumbnailDetails.innerHTML = `
    <p>Release Date:${thumbnail.releaseDate ? thumbnail.releaseDate : 'No date found'}
    `;

}




loadCategories();
loadThumbnailDetails();