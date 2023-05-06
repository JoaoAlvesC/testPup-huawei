require('dotenv').config();
const puppeteer = require('puppeteer');
var child_process = require('child_process');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--start-maximized'
    ]
  });

  //instancia browser
  const page = await browser.newPage();
  await page.setUserAgent(process.env.HTTP_USER_AGENT);
  await page.goto('http://192.168.18.1');
  await page.setViewport({ width: 1366, height: 768 });

  //login
  await page.type('#txt_Username', process.env.ONT_USER)
  await page.type('#txt_Password', process.env.ONT_PASS)
  await page.click(('[name="loginbuttonOnly"]'))

  await page.waitForNavigation();

  //vai direto pra página de upgrade
  await page.goto('http://192.168.18.1/html/ssmp/fireware/firmware.asp');

  //seta foco no input file e logo após remove o foco do elemento
  await page.focus('input[type=file]')
  await page.$eval('input[type=file]', e => e.blur());

  //aguarda o selector aparecer, recebe ele, upa o arquivo e clica no botao de download
  await page.waitForSelector("input[type=file]");
  const input = await page.$("input[type=file]");
  await input.uploadFile('./firmwares/EG8145.bin')
  await page.click('#btnSubmit')

  await page.waitForSelector("#RebootDes", { timeout: 0 });
  page.on('dialog', async dialog => {//on event listener trigger

    console.log(dialog.message()); //get alert message
    await dialog.accept(); //accept alert
  })
  await page.click("#RebootDes");

  browser.close();
  child_process.execSync("start cmd.exe /K ping -t 192.168.18.1");

})();