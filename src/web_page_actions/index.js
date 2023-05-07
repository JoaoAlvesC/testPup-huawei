export const handle_login = async (page) => {
    const {HTTP_USER_AGENT, ONT_IP, ONT_USER, ONT_PASS} = process.env;
    
    console.log('Logging...')

    await page.setUserAgent(HTTP_USER_AGENT);
    await page.goto(`http://${ONT_IP}`);
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
    const {ONT_IP} = process.env;
    console.log('Uploading firmware...')
    //vai direto pra página de upgrade
    await page.goto(`http://${ONT_IP}/html/ssmp/fireware/firmware.asp`);

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
        await dialog.accept(); //accept alert
    })
    console.log('Rebooting ONT')
    await page.click("#RebootDes");

    return {msg: 'Upgrade do firmware realizado!'}
}