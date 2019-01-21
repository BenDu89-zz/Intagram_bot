const puppeteer = require('puppeteer');
const CREDS = require('./creds');

  // Enter the Hashtag that you are interessted in
  var hashtag = "surf";
  // Run varible
  var step;
  // Default waiting time is 5000 ms
  var wait_time = 3000
  // Enter how many people you like to follow and like a picture
  var runs = 80
  // Enter sting you like to comment with
  var comment = "<enter string>"
  // Array of added users
  var users = []

async function run() {
  const browser = await puppeteer.launch({
    // delete line below, if you do not want to see it in the browser
    headless: false
  });
  const page = await browser.newPage();
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

  await page.waitFor(60000);

  // Loop to follow, like and comment pictures
  for (step = 0; step < runs; step++) {

  // Going to the page of the Hashtage
  await page.goto(`https://www.instagram.com/explore/tags/${hashtag}/`, {waitUntil: 'networkidle2'});

  await page.waitForSelector('#react-root > section > main > article > div:nth-child(3) > div > div:nth-child(1) > div:nth-child(1) > a');

  // Click on the first photo from the new ones
  const PHOTO_SELECTOR = '#react-root > section > main > article > div:nth-child(3) > div > div:nth-child(1) > div:nth-child(1) > a';
  await page.click(PHOTO_SELECTOR);

  await page.waitForSelector('article header a');

  // Saveing the username of the person how is the owner of that photo
  const USER_NAME_SELECTOR = 'article header a';
  let username = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('href').replace('/', '');
      }, USER_NAME_SELECTOR);

  users[step] = username.replace('/','');

  console.log(users.length);

  // Random waiting time to load and not get kicked from instagram
  //wait_time = Math.floor(Math.random() * 10000) + 1000;
  //await page.waitFor(wait_time);
  // Follow
  const FOLLOW_SELECTOR = 'body > div:nth-child(15) > div > div.zZYga > div > article > header > div.o-MQd > div.PQo_0 > div.bY2yH > button';
  await page.click(FOLLOW_SELECTOR);
  //Random waiting time to load and not get kicked from instagram
  //wait_time = Math.floor(Math.random() * 500) + 1000;
  //await page.waitFor(wait_time);
  // Like
  const LIKE_SELECTOR = 'body > div:nth-child(13) > div > div.zZYga > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n';
  await page.click(LIKE_SELECTOR);
  // Random waiting time to load and not get kicked from instagram
  // Comment
  //const COMMENT_SELECTOR = 'body > div:nth-child(15) > div > div.zZYga > div > article > div.eo2As > section.sH9wk._JgwE > div > form > textarea';
  //await page.click(COMMENT_SELECTOR);
  //await page.keyboard.type(comment, {delay:10});
  //page.keyboard.press('Enter')
  }
  for (step = 0; step < users.length; step++) {
  await page.goto(`https://www.instagram.com/${users[step]}/`, {waitUntil: 'networkidle2'});
  const USER_NAME_SELECTOR_NOFOLLOW = '#react-root > section > main > div > header > section > div.nZSzR > span > span.vBF20._1OSdk > button';
  await page.click(USER_NAME_SELECTOR_NOFOLLOW);
  await page.waitFor(10000);
  const USER_NAME_SELECTOR_NOFOLLOW_POP = 'body > div:nth-child(15) > div > div > div > div.mt3GC > button.aOOlW.-Cab_';
  await page.click(USER_NAME_SELECTOR_NOFOLLOW_POP);
  console.log(users);
  };
browser.close();
}

run();
