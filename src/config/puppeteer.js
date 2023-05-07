import puppeteer from 'puppeteer';

  export const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--start-maximized'
    ]
  });
