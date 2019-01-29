const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    // delete line below, if you do not want to see it in the browser
    headless: false
  });
  const page = await browser.newPage();
  // Log in page form instagram
  await page.goto('https://www.google.de', {waitUntil: 'networkidle2'});
  check = await page.$('NOSELECTORFOUND');
  console.log(check);
  if (check == null){
    console.log("es ist null");
  }
  else {
    console.log("selector ist da");
  }
};

run();
