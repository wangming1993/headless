const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--start-maximized',
    ],
    headless: true,
  });
  const page = await browser.newPage();

  let width = 400
  await page.setViewport({
    width: width,
    height: 0,
    isMobile: true,
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

  await page.goto('file:///Users/wangming/workspace/byzai/headless/share.html', {
    waitUntil: [
      'networkidle2',
    ],
  });
  // await page.goto(`data:text/html,${html}`, {
  //   waitUntil: [
  //     'domcontentloaded',
  //     'load',
  //   ],
  // })

  // let result = await page.evaluate(
  //   () => {
  //     return window.innerWidth;
  //   }
  // );

  let result = await page.evaluate(
    () => {
      return window.document.body.clientHeight;
    }
  );

  await page.screenshot({path: 'example.png', fullPage: false,
    clip:{x:0, y:0, width:width, height: result}
  });
  await browser.close();

  console.log(`Detected window.innerWidth to be ${result}.`);
})();
