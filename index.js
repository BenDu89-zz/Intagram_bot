const puppeteer = require('puppeteer');
const CREDS = require('./creds');
  var hashtag = "<";

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto('https://www.instagram.com/accounts/login/', {waitUntil: 'networkidle2'});

  //console.log(USERNAME_SELECTOR)
  const USERNAME_SELECTOR = 'input[name="username"]';
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username, {delay:25});

  const PASSWORD_SELECTOR = 'input[name="password"]';
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password, {delay:25});

  const BUTTON_SELECTOR = 'button[type="submit"]';
  await page.click(BUTTON_SELECTOR);

  await page.waitFor(15000);

  //await page.goto('https://www.instagram.com/jonnymarshall3/');
  await page.goto(`https://www.instagram.com/explore/tags/${hashtag}/`);

  await page.waitFor(3000);

  const PHOTO_SELECTOR = '#react-root > section > main > div > div._2z6nI > article > div > div > div:nth-child(1) > div:nth-child(1) > a';
  await page.click(PHOTO_SELECTOR);

  //await page.waitFor(10000);

  //const LIKE_PHOTO_1 ='body > div:nth-child(15) > div > div.zZYga > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button';
  //await page.click(LIKE_PHOTO_1);

  //const SEARCH_SELECTOR = 'input[placeholder="Search"]';
  //await page.click(SEARCH_SELECTOR, {waitUntil: 'networkidle2'});
  //await page.keyboard.type("Baseball", {delay:100});

  //await page.screenshot({ path: 'screenshots/instagram.png' });

  //browser.close();
}

run();
