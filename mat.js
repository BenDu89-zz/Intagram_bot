const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

  // Enter the Hashtag that you are interessted in
  var hashtag = "travel";
  var company = "berguejewelry"
  // Run varible
  var step = 0;
  // Default waiting time is 5000 ms
  var wait_time = 3000
  // Array of added users
  var users = []
  // number of follower
  var followers = 10

async function run() {
  const browser = await puppeteer.launch({
    // delete line below, if you do not want to see it in the browser
    headless: false
  });
  let page = await browser.newPage();
  await page.emulate(iPhone);
  // Log in page form instagram
  await page.goto('https://www.instagram.com/accounts/login/', {waitUntil: 'networkidle2'});

  await page.waitForSelector('input[name="username"]');
  // Machine will enter the username form creds.js
  const USERNAME_SELECTOR = 'input[name="username"]';
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username, {delay:10});
  // Machine will enter the password form creds.js
  const PASSWORD_SELECTOR = 'input[name="password"]';
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password, {delay:10});
  // Machine will click the LogIn button
  const BUTTON_SELECTOR = 'button[type="submit"]';
  await page.click(BUTTON_SELECTOR);

  await page.waitFor(Math.floor(Math.random() * 10000) + 1000);

  // Going to the page of the Hashtage
  await page.goto(`https://www.instagram.com/${company}/`, {waitUntil: 'networkidle2'});

  await page.waitForSelector('#react-root > section > main > div > ul > li:nth-child(2)');

  const FOLLOWER_NUMBER_SELECTOR = '#react-root > section > main > div > ul > li:nth-child(2) > a > span';

  await page.waitFor(5000);

  let followers = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('title').replace('/', '');
      }, FOLLOWER_NUMBER_SELECTOR);

  console.log(followers);

  // Click on the first photo from the new ones
  const FOLLOWER_SELECTOR = '#react-root > section > main > div > ul > li:nth-child(2)';
  await page.click(FOLLOWER_SELECTOR);

  await page.waitFor(60000);

  for (step = 0; step < followers; step++) {

  const USER_NAME_SELECTOR = `#react-root > section > main > div:nth-child(2) > ul > div > li:nth-child(${step + 1}) > div > div.t2ksc > div.enpQJ > div.d7ByH > a`;

  let username = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('href').replace('/', '');
      }, USER_NAME_SELECTOR);



  users[step] = username.replace('/','');


}
 console.log(users);
 console.log(users.length);
}

run();
