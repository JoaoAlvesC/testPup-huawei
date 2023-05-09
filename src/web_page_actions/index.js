import constants from '../utils/constants.js';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname_firmwares = path.dirname(__filename).replace('web_page_actions',"") + 'firmwares';


console.log(path.join(__dirname_firmwares, 'EG8145.bin'));

export const handle_login = async (page) => {
    const {ONT_IP, ONT_USER, ONT_PASS} = constants;
    console.log('Logging...')
    await page.goto(`http:/${ONT_IP}`);
    await page.setViewport({ width: 1366, height: 768 });

    //login
    await page.type('#txt_Username', ONT_USER)
    await page.type('#txt_Password', ONT_PASS)
    await page.click(('[name="loginbuttonOnly"]'))

    await page.waitForNavigation();

    console.log('Logged successfully!')
    return {msg: 'Logged successfully!'}; 
}

export const handle_firmware_upgrade = async (page) => {
    const {ONT_IP} = constants;
    console.log('Uploading firmware...')
    
    //vai direto pra página de upgrade
    await page.goto(`http://${ONT_IP}/html/ssmp/fireware/firmware.asp`);

    //seta foco no input file e logo após remove o foco do elemento
    await page.focus('input[type=file]')
    await page.$eval('input[type=file]', e => e.blur());

    //aguarda o selector aparecer, recebe ele, upa o arquivo e clica no botao de download
    await page.waitForSelector("input[type=file]");
    const input = await page.$("input[type=file]");
    await input.uploadFile(path.join(__dirname_firmwares, 'EG8145.bin'));
    await page.click('#btnSubmit');

    await page.waitForSelector("#RebootDes", { timeout: 0 });
    page.on('dialog', async dialog => {//on event listener trigger
        await dialog.accept(); //accept alert
    })
    console.log('Rebooting ONT')
    await page.click("#RebootDes");

    return {msg: 'Upgrade do firmware realizado!'}
}