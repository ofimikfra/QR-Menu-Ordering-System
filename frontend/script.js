function viewProducts(products) {
    const productViewer = document.getElementById("productViewer");
    let html = "";

    products.forEach(product => {
        html += `<div class="itemMinimized">
                    <div class="itemimg" style="background-image: url(${product.imageURL});"></div>
                    <h4>${product.name}</h4>
                </div>`;
    });

    productViewer.innerHTML = html;
}

function displayMenu(products) {
    const menu = document.getElementById("menu");
    let menuhtml = `<h2 id="allitems">All Items</h2>`;

    products.forEach(product => {
        menuhtml += `<section class="item">
                    <div class="itemimg" style="background-image: url(${product.imageURL});"></div>
                    <div class="itemdesc">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <span>Options...</span>
                    </div>
                </section>`;
    });

    menu.innerHTML = menuhtml;
}

function displayCategories(categories) {
    console.log(categories);
    const nav = document.getElementById("categories");
    let navhtml = `<a class="active">All items</a>`

    categories.forEach(c => {
        navhtml += `<a>${c.category}</a>`
    });
    
    nav.innerHTML = navhtml;
}

document.addEventListener("DOMContentLoaded", function () {
    const productViewer = document.getElementById("productViewer");
    const menu = document.getElementById("menu");
    const nav = document.getElementById("categories");

    if (productViewer) {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => viewProducts(data));
    }

    if (menu) {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => displayMenu(data));
    }

    if (nav) {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => displayCategories(data));
    }
});