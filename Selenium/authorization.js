const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const assert = require("assert");


  describe("Авторизация", () => {
    let driver;

    before(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().window().maximize();
      await driver.get("https://zdravcity.ru/");
      await driver.sleep(10_000);
    }); 
    it('1.  Ввод существующего номера', async () => {
      await driver.sleep(3_000);
      await driver.findElement(By.className('CircleIcon_circle__PSMCJ')).click();
      await driver.sleep(3_000);
      const searchInput = await driver.switchTo().activeElement();
      searchInput.sendKeys("9991949403");
      await driver.sleep(3_000);
      await driver.findElement(By.className('Button_button__4em_S Button_button--orange__lc846 Button_button--fluid__dRKdB Step1_button__7Rmya')).click();
      await driver.sleep(10_000);
      const ans = await driver.findElement(By.className('ResponsiveNewLine_responsive-new-line-mobile__y_S3K')).getText();
      assert(ans.includes('+7 (999) 194 94 03'));
    });
    it('2.  добавление товара в корзину, на странице товара', async () => {
      await driver.get("https://zdravcity.ru/");
      await driver.sleep(3_000);
      await driver.sleep(3_000);
      await driver.findElement(By.className('CircleIcon_circle__PSMCJ')).click();
      await driver.sleep(3_000);
      const searchInput = await driver.switchTo().activeElement();
      searchInput.sendKeys("0000000000");
      await driver.sleep(3_000);
      await driver.findElement(By.className('Button_button__4em_S Button_button--orange__lc846 Button_button--fluid__dRKdB Step1_button__7Rmya')).click();
      await driver.sleep(10_000);
      const ans = await driver.findElement(By.className('TextField_text-field-error__T0pTS')).getText();
      assert(ans.includes('Произошла ошибка'));
    });
    after(async () => {
     driver.quit();
    })
  });
