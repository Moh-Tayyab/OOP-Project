
import inquirer from 'inquirer';
import chalk from "chalk";

// Define types
type Product = {
    id: number;
    name: string;
    price: number;
};

// Initialize product list
let products: Product[] = [];

// Function to display main menu
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action: ',
            choices:[
                { name: `➕  Add Product`, value: 'Add Product' },
                { name: `👀  View Products`, value: 'View Products' },
                { name: `❌  Remove Product`, value: 'Remove Product' },
                { name: `🚪  Exit`, value: 'Exit' }
    ]
        }
    ]).then(answer => {
        if (answer.action === 'Add Product') {
            addProduct();
        } else if (answer.action === 'View Products') {
            viewProducts();
        } else if (answer.action === 'Remove Product') {
            removeProduct();
        } else if (answer.action === 'Exit') {
            console.log(chalk.italic.bold.bgRedBright('\t\t\t\t ❌ Exiting... '));
            process.exit(0);
        }
    });
}

// Function to add a new product
function addProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: chalk.italic.greenBright('Enter product name:')
        },
        {
            type: 'number',
            name: 'price',
            message: chalk.italic.greenBright('Enter product price:')
        }
    ]).then(answers => {
        const newProduct: Product = {
            id: products.length + 1,
            name: answers.name,
            price: answers.price
        };
        products.push(newProduct);
        console.log(chalk.italic.blueBright('Product added successfully.'));
        mainMenu();
    });
}

// Function to view all products
function viewProducts() {
    if (products.length === 0) {
        console.log(chalk.italic.redBright('No products found.'));
    } else {
        console.log(chalk.italic.yellowBright('All Products:'));
        products.forEach(product => console.log(chalk.italic.magentaBright.bgYellowBright(`ID: ${product.id}, Name: ${product.name}, Price: $${product.price}`)));
    }
    mainMenu();
}

// Function to remove a product
function removeProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: chalk.italic.green('Enter product ID to remove:')
        }
    ]).then(answers => {
        const id = parseInt(answers.id);
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            console.log(chalk.italic.blue(`Product ${id} removed successfully.`));
        } else {
            console.log(chalk.italic.red('Product not found.'));
        }
        mainMenu();
    });
}

// Initial function call
console.log(chalk.bgGray("\t\t******************************************************************"))
console.log(chalk.italic.bold.magentaBright.cyanBright('\t\t\t\t 🛍️  Welcome to ShoppingBuddy!!!! 🛍️'));
console.log(chalk.bgGray("\t\t******************************************************************"))

mainMenu();
