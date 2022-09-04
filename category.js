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
    toggleSpinner(true);
    const url = ` https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayThumbnails(data.data))
        .catch(error => console.log(error))
}
const displayThumbnails = thumbnails => {



    const thumbnailCount = document.getElementById('thumbnail-count');
    thumbnailCount.innerText = thumbnails.length ? `${thumbnails.length} data found` : `No data found`;

    const thumbnailContainer = document.getElementById('thumbnail-container');
    //console.log(thumbnailContainer);
    thumbnailContainer.innerHTML = ``;
    thumbnails.forEach(thumbnail => {
        //console.log(thumbnail.total_view);
        const thumbnailDiv = document.createElement('div');
        if (typeof (thumbnail.total_view) == 'object') {
            thumbnailDiv.setAttribute('id', `dv_0`);
        }
        else {
            thumbnailDiv.setAttribute('id', `dv_${thumbnail.total_view}`);
        }
        thumbnailDiv.classList.add('sorted-divs');
        thumbnailDiv.innerHTML = `
        <div class="row g-0 p-5">
                    <div class="col-md-4">
                        <img src="${thumbnail.thumbnail_url}" class="img-fluid rounded" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${thumbnail.title}</h5>
                            <p class="card-text">${thumbnail.details.slice(0, 300)}...</p>
                            
                            <div class="d-flex justify-content-between align-items-center">
                            <div><img style="height: 30px" class="rounded-circle" src="${thumbnail.author.img}"> <span class="fw-semibold"> ${thumbnail.author.name ? `${thumbnail.author.name}` : `No Author`}</span></div>
                            <div><i class="fa-solid fa-eye"></i> ${thumbnail.total_view ? `${thumbnail.total_view}` : `No Views`}</div>
                            <button onclick="loadThumbnailDetails('${thumbnail._id}')"href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#thumbnailDetailModal">Show details</button>
            
                        </div>
                    </div>
                </div>
        `
        //console.log(typeof(thumbnail.total_view));
        thumbnailContainer.appendChild(thumbnailDiv);
    })
    toggleSpinner(false);
    sortChildrenDivsById();
}

// sorting start
const sortChildrenDivsById = () => {
    var parent = document.getElementById('thumbnail-container');
    //console.log(parent);
    // get child divs
    var children = document.getElementsByClassName('sorted-divs');
    //console.log(children);
    //console.log(parent);
    var ids = [], obj, i, len;
    // build an array of objects that has both the element 
    // and a parsed div number in it so we can sort
    for (i = 0, len = children.length; i < len; i++) {
        obj = {};
        obj.element = children[i];
        obj.idNum = parseInt(children[i].id.replace(/[^\d]/g, ""), 10);
        ids.push(obj);
    }
    // sort the array
    ids.sort(function (a, b) { return (b.idNum - a.idNum); });
    // append in sorted order
    for (i = 0; i < ids.length; i++) {
        parent.appendChild(ids[i].element);
    }
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

const displaythumbnailDetail = data => {
    console.log(data.image_url);
    const modalTitle = document.getElementById('thumbnailDetailModalLabel');
    modalTitle.innerText = data.title;

    const authorImage = document.getElementById('author-img');
    authorImage.innerHTML = `<img class="img-fluid" src="${data.image_url}" alt="">`

    const authorName = document.getElementById('author-name');
    authorName.innerText = data.author.name ? data.author.name : 'Author name do not found';

    const thumbnailDetail = document.getElementById('details');
    thumbnailDetail.innerText = data.details;

    const totalView = document.getElementById('total-view');
    totalView.innerText = data.total_view ? data.total_view : 'No views found';
}




loadCategories();
