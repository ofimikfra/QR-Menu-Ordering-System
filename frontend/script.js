let currency = "$"; // change in config

function viewProducts(products) {
    const productViewer = document.getElementById("productViewer");
    let html = "";

    if (products.length == 0) {
       html += `<h3>No matching products found.</h3>`; 
       productViewer.style.display = "flex";
       productViewer.style.justifyContent = "center";
    } else {
        products.forEach(product => {
        html += `<div class="itemMinimized">
                    <div class="itemimg" style="background-image: url(${product.imageURL});"></div>
                    <h4>${product.name}</h4>
                </div>`;
        productViewer.style.justifyContent = "left";
    });
    }

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

function searchProduct(term) {
    let url = "/api/products";
    if (term && term !== "" && term !== null) {
        url += `?term=${encodeURIComponent(term)}`;
    }
    fetch(url)
        .then(res => res.json())
        .then(data => viewProducts(data))
        .catch(err => console.error("Failed to search for products.", err));
}

function populateCategoryOptions(categories) {
    const categorySelect = document.getElementById("categorySelect");
    console.log(categories);
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.category;
        option.textContent = cat.category;
        categorySelect.appendChild(option);
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const productViewer = document.getElementById("productViewer");
    const menu = document.getElementById("menu");
    const categorySelect = document.getElementById("categorySelect");
    const addProducts = document.getElementById("addProducts");
    
    if (productViewer) {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => viewProducts(data))
            .catch(err => console.error("Failed to fetch products", err));

        const productSearch = document.getElementById("productSearch");
        const search = document.getElementById("search");
        
        // live search
        search.addEventListener("input", () => {
            const term = search.value.trim();
            searchProduct(term);
        });

        // clear search on reset
        productSearch.addEventListener("reset", () => {
            search.value = "";
            searchProduct(""); 
        });
    
        searchProduct(""); 
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

    if (categorySelect) {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => populateCategoryOptions(data))
            .catch(err => console.error("Failed to load categories:", err));
    }

    // add products 
    if (addProducts) {
        addProducts.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(addProducts);
            
            const product = { // convert to json to pass to backend
                name: formData.get("name"),
                desc: formData.get("desc"),
                price: parseFloat(formData.get("price")),
                category: formData.get("category")
            };

            fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            })
            .then(res => {
                if (!res.ok) throw new Error("Failed to add product");
                return res.json();
            })
            .then(data => {
                alert(data.message); // make small preview confirm pop up before adding product
                searchProduct(""); 
                addProducts.reset();
            })
            .catch(err => console.error("Error adding product:", err));
        });
    }
});