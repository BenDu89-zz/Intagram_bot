const puppeteer = require('puppeteer');
const CREDS = require('./creds');

// Enter the Hashtag that you are will to crawling with the bot!
var hashtag = "travel";
// Default waiting time is 0 ms - you can set hier the one you want!
var wait_time = 0
// Enter how many runs with the bot you would like to do!
var runs = 1000
// This is a given array of comments - change them if you want!
var comments = [
  "❤️❤️❤️",
  "✈️",
  "Traveling is the best!!!",
  "This is on my list as well",
  "Wonderful picture 🤘🏼",
  "Holy moly, so amazing! need to go there as well!!!",
  "👍",
  "This is so fucking dope 💪",
  "Omgggg goal😭",
  "Where is this wonderful place?",
  "Need to go there @bendaman",
  "This is beyond beautiful"
];

// Run varible
var step;
const date = Date()
// Array of added users an numbers of each action that was perfomed
var users = []
var count_likes = 0
var count_comments = 0
var count_follows = 0

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
  await page.keyboard.type(CREDS.username, {delay:15});
  // Machine will enter the password form creds.js
  const PASSWORD_SELECTOR = 'input[name="password"]';
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password, {delay:15});
  // Machine will click the LogIn button
  const BUTTON_SELECTOR = 'button[type="submit"]';
  await page.click(BUTTON_SELECTOR);

  await page.waitFor(3000);

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
  // Follow
  if (Math.random() >= 0.95) {
    const FOLLOW_SELECTOR = 'body > div:nth-child(12) > div > div.zZYga > div > article > header > div.o-MQd > div.PQo_0 > div.bY2yH > button';
    await page.click(FOLLOW_SELECTOR);
    count_follows += 1
    await page.waitFor(Math.floor(Math.random() * 4000)+ 1200)
  }
  // Like
  if (Math.random() >= 0.50) {
    const LIKE_SELECTOR = 'body > div:nth-child(12) > div > div.zZYga > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n';
    await page.click(LIKE_SELECTOR);
    count_likes += 1
    await page.waitFor(Math.floor(Math.random() * 3000)+ 500)
    if (Math.random() >= 0.8) {
    // Comment
      const COMMENT_SELECTOR = 'body > div:nth-child(12) > div > div.zZYga > div > article > div.eo2As > section.sH9wk._JgwE > div > form > textarea';
      await page.click(COMMENT_SELECTOR);
      var comment = comments[Math.floor(Math.random()*comments.length)];
      await page.keyboard.type(comment, {delay:10});
      page.keyboard.press('Enter')
      count_comments += 1
      await page.waitFor(Math.floor(Math.random() * 5000)+ 800)
    }
  }

  console.log("Profiles visited:"+users.length);
  console.log("Follows:"+count_follows)
  console.log("Likes:"+count_likes)
  console.log("Comments:"+count_comments)
  console.log(date)
  console.log("<--->")
}
  for (step = 0; step < users.length; step++) {
  await page.goto(`https://www.instagram.com/${users[step]}/`, {waitUntil: 'networkidle2'});
  await page.waitForSelector('#react-root > section > main > div > header > section > div.Y2E37 > span > span.vBF20._1OSdk > button');
  const USER_NAME_SELECTOR_NOFOLLOW = '#react-root > section > main > div > header > section > div.Y2E37 > span > span.vBF20._1OSdk > button';
  await page.click(USER_NAME_SELECTOR_NOFOLLOW);
  await page.waitForSelector('body > div:nth-child(15) > div > div > div > div.mt3GC > button.aOOlW.-Cab_');
  const USER_NAME_SELECTOR_NOFOLLOW_POP = 'body > div:nth-child(15) > div > div > div > div.mt3GC > button.aOOlW.-Cab_';
  await page.click(USER_NAME_SELECTOR_NOFOLLOW_POP);
  console.log(users);
  };
browser.close();
}

run();
