const loadCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))

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
    const url = ` https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayThumbnails(data.data))
        .catch(error => console.log(error))
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
                            <p class="card-text">${thumbnail.details.slice(0, 300)}...</p>
                            
                            <div class="d-flex justify-content-between">
                            <div><img style="height: 30px" class="rounded-circle" src="${thumbnail.author.img}"> <span class="fw-semibold"> ${thumbnail.author.name}</span></div>
                            <div>${thumbnail.total_view}</div>
                            <button onclick="loadThumbnailDetails('${thumbnail.category_id}')"href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#thumbnailDetailModal">show details</button>
            
                        </div>
                    </div>
                </div>
        `
        thumbnailContainer.appendChild(thumbnailDiv);

    })
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}





const loadThumbnailDetails = id => {
    const url = ` https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaythumbnailDetail(data.data[0]))
}

const displaythumbnailDetail = thumbnail => {
    console.log(data.image_url);
    const modalTitle = document.getElementById('thumbnailDetailModalLabel');
    modalTitle.innerText = data.title;

    const authorImage = document.getElementById('author-img');
    authorImage.innerHTML = `<img class="img-fluid" src="${data.image_url}" alt="">`

    const authorName = document.getElementById('author-name');
    authorName.innerText = data.author.name ? data.author.name : 'Author name do not found';

    const thumbnailDetail = document.getElementById('thumbnail-details');
    thumbnailDetail.innerText = data.details;

    const totalView = document.getElementById('total-view');
    totalView.innerText = data.total_view ? tdata.total_view : 'No views found';
}




loadCategories();
loadThumbnailDetails();