const puppeteer = require('puppeteer');
const ejs = require("ejs");

(async () => {

  const browser = await puppeteer.launch({
    args: [
      '--start-maximized',
    ],
    headless: true,
  });
  const page = await browser.newPage();

  let width = 375;
  await page.setViewport({
    width: width,
    height: 0,
    isMobile: true,
  });

  let str=require("fs").readFileSync(__dirname+"/share.ejs","utf8")  //先读文件
  let content =ejs.render(str,{
      names:["cd","lw"],       //第一个参数是给ejs渲染的内容
      avatar: "https://avatars2.githubusercontent.com/u/5611286?s=400&u=f95f36b2db0990774b22d87f7eefcba2cb14082e&v=4",
      name: "痕无落",
      desc: "谁人与你立黄昏，谁人问你粥可温",
      qrcode: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522759741315&di=22c673f7a0870c2eb00380c554d9bdaa&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170503%2F3968d861dbfb453e9ac470573d50a43d_th.jpeg",
      feedType: "link",  // text / image / link
      feedText: "哈哈哈哈哈哈哈哈哈哈哈哈  好长啊 哈哈哈哈哈哈",
      feedImages: [
        "https://avatars2.githubusercontent.com/u/5611286?s=400&u=f95f36b2db0990774b22d87f7eefcba2cb14082e&v=4",
        "https://avatars2.githubusercontent.com/u/5611286?s=400&u=f95f36b2db0990774b22d87f7eefcba2cb14082e&v=4",
        "https://avatars2.githubusercontent.com/u/5611286?s=400&u=f95f36b2db0990774b22d87f7eefcba2cb14082e&v=4",
        "https://avatars2.githubusercontent.com/u/5611286?s=400&u=f95f36b2db0990774b22d87f7eefcba2cb14082e&v=4",
      ],
      feedTitle: "初次见面,余生请指教!!!"
  })

  await page.goto(`data:text/html,${content}`, {
    waitUntil: [
      'domcontentloaded',
      'load',
    ],
  })

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
