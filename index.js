require('dotenv').config();
const puppeteer = require('puppeteer');

async function run(page) {
  //console.log(page)

  const acceptCookiesSelector = 'button[class="CancleButtonCss filebuttonwidth_100px"]';
  await page.waitForSelector(acceptCookiesSelector);
  await page.click(acceptCookiesSelector);



  // const acceptCookiesSelector = 'button[class="CancleButtonCss filebuttonwidth_100px"]'

  // const [fileChooser] = await Promise.all([
  //   page.waitForFileChooser(),
  //   page.click(acceptCookiesSelector),
  // ])

  // await fileChooser.accept(['/EG8145.bin']);

}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto('http://192.168.18.1');

  // - Acessa a página de login
  // await page.click('[href="/login"]');

  // Troque os valores de process.env.UNSPLASH_EMAIL e process.env.UNSPLASH_PASS pelo seu login e senha :)
  await page.type('#txt_Username', 'Epadmin')
  await page.type('#txt_Password', 'adminEp')
  // await page.type('#user_password', process.env.UNSPLASH_PASS)
  await page.click(('[name="loginbuttonOnly"]'))
  await page.waitForNavigation();
  await page.click(('#addconfig'))
  await page.click(('#name_maintaininfo'))

  // get the selector input type=file (for upload file)
  await page.waitForSelector('input[type=file]');
  await page.waitFor(1000);

  // get the ElementHandle of the selector above
  const inputUploadHandle = await page.$('input[type=file]');
  console.log(inputUploadHandle)
  let fileToUpload = './EG8145.bin';

  // Sets the value of the file input to fileToUpload
  inputUploadHandle.uploadFile(fileToUpload);

  await page.waitForSelector('#btnSubmit');
  await page.evaluate(() => document.getElementById('btnSubmit').click());

  // await page.evaluate(() => document.getElementById('upload').click());

  //await run(page)

  //await page.waitForSelector('input[type=file]');
  // await page.waitFor(1000);

  // // get the ElementHandle of the selector above
  //const inputUploadHandle = await page.$('input[type=file]');

  // // prepare file to upload, I'm using test_to_upload.jpg file on same directory as this script
  // // Photo by Ave Calvar Martinez from Pexels https://www.pexels.com/photo/lighthouse-3361704/
  // let fileToUpload = 'test_to_upload.jpg';

  // // Sets the value of the file input to fileToUpload
  //inputUploadHandle.uploadFile('./EG8145.bin');

  // var up = await page.
  // $('#t_file');
  // console.log(up)
  // await up.uploadFile(['./EG8145.bin'])

  //const elementHandle = await page.$("input[type=file]");
  //await elementHandle.uploadFile('./EG8145.bin');
  //await page.click(('#btnSubmit'))

  //await page.click('selector-of-submit-button');

  //await page.click('#addconfig]')
  //await page.click('#btncfgnext')

  //await page.click('[type="submit"]')


  // // ACESSAR essa pagina
  // await page.goto('https://unsplash.com/photos/LzWXPcJg7lk');

  // // Like nessa coisa
  // await page.click('[title="Like photo"]')


  // await browser.close();
})();