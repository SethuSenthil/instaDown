const express = require("express"),
      app = express(),
      puppeteer = require('puppeteer'),
      userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36',
      bodyParser = require('body-parser'),
      fs = require('fs'),
      util = require('util'),
      aes256 = require("aes256"),
      readFile = util.promisify(fs.readFile),
      const port = process.env.PORT || 3221;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/", function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    (async () => {
      let browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
       })

        //sets userAgent so instagram doesn't know we are a bot
        await browser.userAgent(userAgent)

        const page = await browser.newPage();
        let page2;
        let posturl = req.body.url
        let password = req.body.password
        let key = req.body.key
        let decryptedPassword = aes256.decrypt(key, password);
        let username = req.body.username
        let cookiePath = __dirname + `/auth/${username}.${key}.txt`

        //checks if the user already has a valid auth cookie to quick sign in, if not is manually types their password
        if (fs.existsSync(cookiePath)) {
          page2 = page
          let cookies;
          let data = await readFile(cookiePath)
          let decryptedData = aes256.decrypt(key, password);
           cookies =  JSON.parse(decryptedData, null, 2)
         await page.setCookie(...cookies);
        }else{
          await page.goto('https://www.instagram.com/accounts/login/');
          await page.waitForSelector('input[name="username"]');
          await page.type('input[name="username"]', `${username}`);
          await page.type('input[name="password"]',`${decryptedPassword}`);
          await page.click('button[type="submit"]');
          await page.waitForSelector('div[role="presentation"]');

          //gets and saves auth cookies
          const authcookie = await page.cookies();
          await fs.writeFile(cookiePath, JSON.stringify(authcookie, null, 2),function(err, result) {
            if(err) console.log('error', err);
          }
          );
           page2 = await browser.newPage();
        }

          let imgStore = []
          page2.on('request', request => {
            //intercepts instagram post image requests
            if(request.url().includes('jpg') && !request.url().includes('150x150') && request.url().includes('-15')){
              imgStore.push(request.url())
          }

          request.continue();

           });
          await page2.setRequestInterception(true);

          await page2.goto(posturl);
          res.send(imgStore.join())
          await browser.close()

    })();
});

const listener = app.listen(port, function() {
  console.log("Your app is listening on port " + port);
});