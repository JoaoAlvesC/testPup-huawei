import { browser } from "../config/puppeteer.js";
import { handle_login, handle_firmware_upgrade } from "../web_page_actions/index.js";

const page = await browser.newPage();

export const upgradeFirmware = async(req, res) => {
    await handle_login(page);
    const response = await handle_firmware_upgrade(page);
    res.status(200).json(response.msg)
}