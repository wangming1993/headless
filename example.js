const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--start-maximized',
    ],
    headless: true,
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 660,
    height: 330,
  });

  const html =  `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <img src="https://images2018.cnblogs.com/news/66372/201804/66372-20180402201814545-853809727.jpg" />
    </body>
  </html>
`;

 // await page.goto('file:///Users/wangming/workspace/byzai/headless/test.html');
  await page.goto(`data:text/html,${html}`, {
    waitUntil: [
      'domcontentloaded',
      'load',
    ],
  })

  let result = await page.evaluate(
    () => {
      return window.innerWidth;
    }
  );

  await page.screenshot({path: 'example.png', fullPage: true});
  await browser.close();

  console.log(`Detected window.innerWidth to be ${result}.`);
})();
