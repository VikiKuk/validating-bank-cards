import puppeteer from 'puppeteer';

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: 'new' });
  page = await browser.newPage();
  await page.goto('http://localhost:8080');
});

afterAll(async () => {
  await browser.close();
});

describe('Card Validator UI', () => {
  test('valid Visa card shows success', async () => {
    await page.type('.card-input', '4111 1111 1111 1111');
    await page.click('.validate-button');
    await page.waitForSelector('.card-input.valid');
    const message = await page.$eval('.message', el => el.textContent);
    expect(message).toMatch(/Карта валидна/);
  });

  test('invalid card shows error', async () => {
    await page.evaluate(() => (document.querySelector('.card-input').value = ''));
    await page.type('.card-input', '1234 5678');
    await page.click('.validate-button');
    await page.waitForSelector('.card-input.invalid');
    const message = await page.$eval('.message', el => el.textContent);
    expect(message).toMatch(/невалидна|неизвестная/i);
  });

  test('invalid characters show tooltip error', async () => {
    await page.evaluate(() => (document.querySelector('.card-input').value = ''));
    await page.type('.card-input', '4111-1111-ABCD');
    await page.click('.validate-button');
    const message = await page.$eval('.message', el => el.textContent);
    expect(message).toMatch(/Недопустимые символы/i);
  });

  test('card icon is highlighted', async () => {
    await page.evaluate(() => (document.querySelector('.card-input').value = ''));
    await page.type('.card-input', '5105 1051 0510 5100');
    await page.click('.validate-button');
    const highlighted = await page.$eval('.card.mastercard', el => el.classList.contains('active'));
    expect(highlighted).toBe(true);
  });
});