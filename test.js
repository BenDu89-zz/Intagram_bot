const puppeteer = require('puppeteer');
const CREDS = require('./creds');

async function run() {
  const browser = await puppeteer.launch({
    // delete line below, if you do not want to see it in the browser
    headless: false
  });
  const page = await browser.newPage();
  // Log in page form instagram
  await page.goto('https://www.bbc.com/', {waitUntil: 'networkidle2'});

  await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');

}
run ();
