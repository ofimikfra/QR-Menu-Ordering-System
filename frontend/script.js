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
    let menuhtml = "";
    const category = {};
    
    products.forEach(p => {
        if (!category[p.category]) {
            category[p.category] = [];
        }
        category[p.category].push(p);
    });

    for (const c in category) {
        menuhtml += `<h2>${c}</h2>`;

        category[c].forEach(p => {
            menuhtml += `<section class="item">
                <div class="itemimg" style="background-image: url(${p.imageURL});"></div>
                <div class="itemdesc">
                    <h3>${p.name}</h3>
                    <p>${p.description}</p>
                    <span>Options...</span>
                </div>
            </section>`;
        });
    }

    menu.innerHTML = menuhtml;
}

function displayCategories(categories) {
    const nav = document.getElementById("categories");
    let navhtml = `<a class="active" data-category="all">All items</a>`

    categories.forEach(c => {
        navhtml += `<a data-category="${c.category}">${c.category}</a>`
    });
    
    nav.innerHTML = navhtml;

    Array.from(nav.querySelectorAll("a")).forEach(tab => {
        tab.addEventListener("click", function () {
            nav.querySelectorAll("a").forEach(a => a.classList.remove("active"));
            tab.classList.add("active");

            const category = tab.getAttribute("data-category");
            displayProductsInCategory(category);
        });
    });
}

function displayProductsInCategory(category) {
    let url = "/api/products";
    if (category && category !== "all") {
        url += `?category=${encodeURIComponent(category)}`;
    }
    fetch(url)
        .then(res => res.json())
        .then(data => displayMenu(data))
        .catch(err => console.error("Failed to fetch products.", err));
}


document.addEventListener("DOMContentLoaded", function () {
    const productViewer = document.getElementById("productViewer");
    const menu = document.getElementById("menu");

    if (productViewer) {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => viewProducts(data))
            .catch(err => console.error("Failed to fetch products", err));
    }

    if (menu) {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => displayMenu(data))
            .catch(err => console.error("Failed to fetch products", err));

        fetch('/api/categories')
            .then(res => res.json())
            .then(data => displayCategories(data))
            .catch(err => console.error("Failed to fetch categories", err));
    }

});