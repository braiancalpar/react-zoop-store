import puppeteer from 'puppeteer';

(async () => {
  console.log('🚀 Iniciando análise com Puppeteer...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Captura mensagens do console
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({
      type: msg.type(),
      text: msg.text()
    });
  });

  // Captura erros
  const errors = [];
  page.on('pageerror', error => {
    errors.push({
      message: error.message,
      stack: error.stack
    });
  });

  // Captura falhas de requisição
  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure().errorText
    });
  });

  try {
    console.log('📍 Navegando para http://localhost:5173/...');
    await page.goto('http://localhost:5173/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log('✅ Página carregada!\n');

    // Captura título
    const title = await page.title();
    console.log(`📄 Título: ${title}`);

    // Captura conteúdo do body
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    console.log(`📝 Body tem ${bodyHTML.length} caracteres\n`);

    // Verifica se o root está renderizado
    const rootContent = await page.evaluate(() => {
      const root = document.getElementById('root');
      return {
        exists: !!root,
        hasChildren: root?.children.length || 0,
        innerHTML: root?.innerHTML.substring(0, 500) || ''
      };
    });

    console.log('🎯 Elemento #root:');
    console.log(`   Existe: ${rootContent.exists}`);
    console.log(`   Filhos: ${rootContent.hasChildren}`);
    console.log(`   Conteúdo (500 chars): ${rootContent.innerHTML}\n`);

    // Tira screenshot
    await page.screenshot({
      path: 'screenshot.png',
      fullPage: true
    });
    console.log('📸 Screenshot salvo em screenshot.png\n');

    // Mostra logs do console
    if (consoleLogs.length > 0) {
      console.log('📋 Console logs:');
      consoleLogs.forEach(log => {
        console.log(`   [${log.type}] ${log.text}`);
      });
      console.log();
    }

    // Mostra erros
    if (errors.length > 0) {
      console.log('❌ Erros JavaScript encontrados:');
      errors.forEach(err => {
        console.log(`   ${err.message}`);
        if (err.stack) {
          console.log(`   Stack: ${err.stack}`);
        }
      });
      console.log();
    } else {
      console.log('✅ Nenhum erro JavaScript encontrado\n');
    }

    // Mostra requisições falhas
    if (failedRequests.length > 0) {
      console.log('🚫 Requisições que falharam:');
      failedRequests.forEach(req => {
        console.log(`   ${req.url}: ${req.failure}`);
      });
      console.log();
    } else {
      console.log('✅ Todas as requisições foram bem-sucedidas\n');
    }

    // Verifica CSS carregado
    const cssLoaded = await page.evaluate(() => {
      const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
      return Array.from(styles).map(s => ({
        tag: s.tagName,
        href: s.href || 'inline',
        length: s.textContent?.length || 0
      }));
    });

    console.log('🎨 CSS carregado:');
    cssLoaded.forEach(css => {
      console.log(`   ${css.tag}: ${css.href} (${css.length} chars)`);
    });
    console.log();

  } catch (error) {
    console.error('❌ Erro ao carregar página:');
    console.error(error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
    console.log('🏁 Análise concluída!');
  }
})();
