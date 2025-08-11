# Shopping Cart Backend

This is a Node.js + Express backend for a Shopping Cart application, using MySQL and Sequelize ORM.

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tosin-dotcom/shopping-cart.git
   cd shopping-cart
   ```

2. **Install dependencies**
    ```
   npm install
   ```

3. **Set up environment variables**

    Create a `.env` file in the project root with the following content:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=shopping_cart
    DB_DIALECT=mysql
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```
   
4. **Start the server**

    ```
    npm start
   ```

---

## Design Decisions

*   **Layered Architecture**: Routes → Controllers → Services → Repositories for clean separation of concerns.

*   **Validation Middleware**: Used a validate middleware with Joi schemas for request body validation.

*   **Authentication**: JWT-based authentication for securing routes.

*   **Sequelize ORM**: For database operations, providing cleaner queries and model definitions.

*   **Modular Structure**: Each module (User, Cart, Product) has its own routes, controllers, services, and repositories.

---

## Assumptions & Tradeoffs

*   **User Authentication Required**: All cart operations require a logged-in user.

*   **Product Availability**: No real-time stock tracking, assumed products are always available unless otherwise specified.

*   **Simplified Pricing**: No discounts, taxes, or promotions applied in this version.


---

## Bonus Features Added


*   **Request Validation**: Prevents invalid payloads before hitting business logic.

*   **Increment & Decrement Cart Items**: Users can adjust quantities without re-adding products.

*   **Remove Specific Items**: Users can delete individual cart items.

*   **Get Product Details with Cart**: Each cart item includes product details (sku, name, price, description).

*   **Repository Method for Quantity Check**: Checks if a product already exists in the user’s cart and retrieves quantity.

*   **Inventory Control**: Prevents adding items to the cart if the requested quantity exceeds the available stock.
