function viewProducts(products) {
    const productViewer = document.getElementById("productViewer");
    let html = "";

    products.forEach(product => {
        html += `<div class="itemMinimized">
                    <div class="itemimg" style="background-image: url(${product.imageURL});"></div>
                    <h3>${product.name}</h3>
                </div>`;
    });

    productViewer.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
    const productViewer = document.getElementById("productViewer");
    if (productViewer) {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => viewProducts(data)); //add test data & test this
    }
});