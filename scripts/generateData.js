import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_PRODUCTS = 1500;
const DUMMYJSON_URL = 'https://dummyjson.com/products?limit=194';

const productVariations = [
  'Premium', 'Deluxe', 'Standard', 'Basic', 'Pro', 'Elite',
  'Classic', 'Modern', 'Vintage', 'Limited Edition',
  'Ultra', 'Mega', 'Super', 'Plus', 'Max', 'Extra'
];

const priceVariations = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.5];

async function fetchDummyJSONProducts() {
  console.log('Fetching products from DummyJSON...');

  try {
    const response = await fetch(DUMMYJSON_URL);
    const data = await response.json();
    console.log(`✅ Fetched ${data.products.length} products from DummyJSON`);
    return data.products;
  } catch (error) {
    console.error('❌ Error fetching from DummyJSON:', error);
    throw error;
  }
}

function expandProducts(baseProducts, targetCount) {
  console.log(`Expanding ${baseProducts.length} products to ${targetCount}...`);

  const expandedProducts = [];
  let idCounter = 1;

  while (expandedProducts.length < targetCount) {
    for (const product of baseProducts) {
      if (expandedProducts.length >= targetCount) break;

      const variationIndex = Math.floor(expandedProducts.length / baseProducts.length);
      const variation = productVariations[variationIndex % productVariations.length];
      const priceMultiplier = priceVariations[variationIndex % priceVariations.length];

      const newProduct = {
        ...product,
        id: idCounter++,
        title: variationIndex === 0
          ? product.title
          : `${variation} ${product.title}`,
        price: Math.round(product.price * priceMultiplier * 100) / 100,
        stock: Math.floor(Math.random() * 200) + 10,
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
      };

      expandedProducts.push(newProduct);
    }
  }

  console.log(`✅ Generated ${expandedProducts.length} products`);
  return expandedProducts;
}

function extractCategories(products) {
  console.log('Extracting categories...');

  const categoryMap = new Map();

  products.forEach(product => {
    if (!categoryMap.has(product.category)) {
      categoryMap.set(product.category, {
        id: categoryMap.size + 1,
        name: product.category,
        slug: product.category.toLowerCase().replace(/\s+/g, '-'),
      });
    }
  });

  const categories = Array.from(categoryMap.values());
  console.log(`✅ Extracted ${categories.length} categories`);

  return categories;
}

async function generateDatabase() {
  console.log('\n🚀 Starting database generation...\n');

  try {
    const baseProducts = await fetchDummyJSONProducts();

    const products = expandProducts(baseProducts, TARGET_PRODUCTS);
    const categories = extractCategories(products);

    const database = {
      products,
      categories,
      cart: [],
      orders: [],
    };

    const dbPath = path.join(__dirname, '..', 'server', 'db.json');
    fs.writeFileSync(dbPath, JSON.stringify(database, null, 2));

    console.log(`\n✅ Database generated successfully!`);
    console.log(`📄 File: ${dbPath}`);
    console.log(`📦 Products: ${products.length}`);
    console.log(`🏷️  Categories: ${categories.length}`);
    console.log(`\n🚀 You can now run: npm run server\n`);

  } catch (error) {
    console.error('\n❌ Error generating database:', error);
    process.exit(1);
  }
}

generateDatabase();
