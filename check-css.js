import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:5173/components', { waitUntil: 'networkidle0' });

  // Check if color classes are present in the generated CSS
  const hasColorClasses = await page.evaluate(() => {
    const testClasses = [
      'bg-magenta-500',
      'bg-azul-500',
      'bg-verde-500',
      'bg-cinza-500',
      'bg-grafite-600'
    ];

    const results = {};

    testClasses.forEach(className => {
      const testEl = document.createElement('div');
      testEl.className = className;
      document.body.appendChild(testEl);

      const computedStyle = window.getComputedStyle(testEl);
      const bgColor = computedStyle.backgroundColor;

      results[className] = {
        exists: bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent',
        color: bgColor
      };

      document.body.removeChild(testEl);
    });

    return results;
  });

  console.log('\n🎨 Verificação de classes de cores:\n');
  Object.entries(hasColorClasses).forEach(([className, data]) => {
    const status = data.exists ? '✅' : '❌';
    console.log(`${status} ${className}: ${data.color}`);
  });

  await browser.close();
})();
