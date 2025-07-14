# QR Menu Ordering System (WIP)

## To-Do
> ~Done~
> *In progress*

### Priority

- Implement MySQL
    - ~~DB connection~~
    - ~~Initialize tables~~
    - *Add product*
    - Edit existing product
    - Delete product
    - *View all products on dashboard w/ search*
    - ~~View products in specific category via tabs~~
    - ~~Dynamically list menu items (and category tabs) based on products table~~
- Make order view page (or just make this a pop up window on `menu.html`?)
    - Fetch order items (orderItems table) when basket is clicked
    - Enter order details into DB when order button is clicked
- Decide on a color palette
- Implement qrcode.js for generating qr code for tables w/ table numbers

### Later

- Make registration & login page
    - Implement bcrypt for password hashing during registration & login
- Make `.env` template & instructions
- Implement QRCode.js (`https://github.com/davidshimjs/qrcodejs`)
- Make landing/default page (`index.html`)
- Make staff dashboard page
    - Orders page (view new orders, finished orders, preparing orders), dynamically updated based on orders table
- Make admin page as extension to dashboard
    - Menu management page
    - Statistics/report page
- Make login page