const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const pages = [
  { url: 'http://localhost:5173/', name: 'home' },
  { url: 'http://localhost:5173/products', name: 'products' },
  { url: 'http://localhost:5173/product/1', name: 'product-detail' },
  { url: 'http://localhost:5173/cart', name: 'cart' },
  { url: 'http://localhost:5173/components', name: 'components' },
];

(async () => {
  console.log('🚀 Iniciando testes de todas as páginas...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];

  for (const page of pages) {
    console.log(`📍 Testando: ${page.name} (${page.url})`);

    const browserPage = await browser.newPage();
    await browserPage.setViewport({ width: 1920, height: 1080 });

    const errors = [];
    browserPage.on('pageerror', (error) => {
      errors.push(error.message);
    });

    try {
      await browserPage.goto(page.url, { waitUntil: 'networkidle0', timeout: 10000 });

      // Wait for React to render
      await browserPage.waitForSelector('#root', { timeout: 5000 });

      const pageData = await browserPage.evaluate(() => {
        const root = document.querySelector('#root');
        return {
          title: document.title,
          rootExists: !!root,
          rootChildren: root ? root.children.length : 0,
          bodyLength: document.body.innerText.length,
          hasContent: document.body.innerText.trim().length > 100,
        };
      });

      // Take screenshot
      const screenshotPath = path.join(__dirname, `screenshot-${page.name}.png`);
      await browserPage.screenshot({ path: screenshotPath, fullPage: true });

      results.push({
        name: page.name,
        url: page.url,
        success: pageData.hasContent && errors.length === 0,
        errors: errors,
        data: pageData,
      });

      if (errors.length === 0) {
        console.log(`   ✅ Sucesso! (${pageData.bodyLength} caracteres, ${pageData.rootChildren} filhos)\n`);
      } else {
        console.log(`   ❌ Erros encontrados: ${errors.length}\n`);
      }
    } catch (error) {
      console.log(`   ❌ Erro ao carregar: ${error.message}\n`);
      results.push({
        name: page.name,
        url: page.url,
        success: false,
        errors: [error.message],
        data: null,
      });
    }

    await browserPage.close();
  }

  await browser.close();

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DOS TESTES');
  console.log('='.repeat(60) + '\n');

  results.forEach((result) => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.name.toUpperCase().padEnd(20)} - ${result.url}`);
    if (result.errors.length > 0) {
      result.errors.forEach((err) => {
        console.log(`   ⚠️  ${err}`);
      });
    }
  });

  const successCount = results.filter((r) => r.success).length;
  console.log(`\n📈 Total: ${successCount}/${results.length} páginas funcionando corretamente`);

  if (successCount === results.length) {
    console.log('\n🎉 Todas as páginas estão funcionando perfeitamente!');
  }

  console.log('\n🏁 Testes concluídos!\n');
})();
