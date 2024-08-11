## MiniMiracle Frontend
Welcome to the frontend client of MiniMiracle! This project serves as the user interface for our e-commerce platform, enabling users to interact with various features such as product browsing, cart management, and checkout. The frontend is built using the Next.js app router and integrates the Midtrans Snap Pop Up for payment processing. Key user features include viewing product lists, filtering by category, managing the cart, checking out, viewing shipping costs, and making payments.

## Getting Started
Ensure you have the following installed on your machine:
Prerequisites
Node.js (version 14.x or higher)
npm (version 6.x or higher)

## Installation
1. Clone the repository:
git clone https://github.com/Init-Projectx/Web-client.git
cd web-client

2. Install dependencies:
npm install

3. Running the Development Server:
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Open your browser and navigate to http://localhost:3000 to view the application.

## Using Docker
If you prefer using Docker, follow these steps:

1. Build the Docker image:
docker build -t minimiracle-frontend .

2. Run the Docker container:
docker-compose up

## Technologies Used
- Next.js: A React framework for server-rendered applications
- Tailwind CSS: A utility-first CSS framework
- Axios: Promise-based HTTP client for the browser and Node.js
- Prisma ORM: Next-generation ORM for Node.js and TypeScript
- Midtrans: Payment gateway integration using Snap Pop Up

## Features
- Product Management: Allows admins to add, edit, delete, and activate products.
- User Authentication: Secure user authentication using JWT.
- Order Management: Users can view and manage their orders.
- Payment Integration: Integrated with Midtrans for payment processing.
- Shipping Costs: Uses RajaOngkir to fetch shipping cost information.
- Email Notifications: Sends email notifications using NodeMailer.
- Product Browsing: Users can view and filter products by category.
- Cart and Checkout: Users can manage their cart, proceed to checkout, and make payments.
- Shipping Costs: Users can view shipping costs during checkout.

## Project Structure Details
src/app/
This directory contains the main application pages and routing configuration. It includes subdirectories for various sections of the application such as authentication, carts, checkout, CMS, orders, payment, and product management.

components/
This directory contains reusable UI components and layout components used throughout the application.
- layout/: Contains components related to the layout of the application, such as the navbar, footer, and different page layouts.
- ui/: Contains various UI components like buttons, cards, input fields, and file uploads.

modules/fetch/
This directory contains modules for handling data fetching from the backend API. It includes separate modules for fetching data related to CMS, orders, users, and other entities.

## Configuration Files
- .eslintrc.json: Configuration for ESLint, used for linting the codebase.
- .gitignore: Specifies files and directories to be ignored by Git.
- jsconfig.json: Configuration for JavaScript projects.
- next.config.mjs: Configuration for the Next.js application.
- package-lock.json & package.json: Defines the project's dependencies and scripts.
- postcss.config.js: Configuration for PostCSS, used for processing CSS.
- tailwind.config.js: Configuration for Tailwind CSS.

## Contributing
If you wish to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Open a pull request to the main repository.
Please do not merge the pull request until it has been reviewed and approved.


Happy coding!
