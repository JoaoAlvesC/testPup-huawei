import { browser } from "../config/puppeteer.js";
import { server_instance } from "../index.js";
import { handle_login, handle_firmware_upgrade, check_ont_version } from "../web_page_actions/index.js";
import sleep from "../utils/sleep.js";

const page = await browser.newPage();

export const upgradeFirmware = async(req, res) => {
    await handle_login(page);
    const response = await handle_firmware_upgrade(page);
    await sleep(50000);
    const isUpdated = await check_ont_version(page);

    if(isUpdated){
        console.log(response.msg)
        sleep(5000);
        browser.close();
        var handler = function() {
            server_instance.close();
          };
    }else {
        console.log('Erro ao atualizar a ONT. Tente novamente')
        res.status(400).json({msg: 'Erro ao atualizar a ONT. Tente novamente'});
        browser.close();
        server_instance.closeAllConnections();
    }
}
