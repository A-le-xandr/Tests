const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const assert = require("assert");


  describe("добавление товара в корзину  ", () => {
    let driver;

    before(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().window().maximize();
      await driver.get("https://zdravcity.ru/");
      await driver.sleep(10_000);
    }); 
    it('1.  добавление товара в корзину через результаты поиска', async () => {
      await driver.sleep(3_000);
      const input = driver.findElement(By.id('desktopSearchInput'));
      await input.click();
      await driver.sleep(3_000);
      const searchInput = await driver.switchTo().activeElement();
      searchInput.sendKeys("Кагоцел 12мг 10шт");
      await driver.sleep(3_000);
      const button = driver.findElement(By.className('Button_button__4em_S Button_button--orange__lc846'));
      await button.click();
      await driver.sleep(3_000);
      const ans = await driver.findElement(By.className('ProductToast_product-toast__QIKM4')).getText();
      assert(ans.includes('Кагоцел таблетки 12мг 10шт'));
    });
    it('2.  добавление товара в корзину, на странице товара', async () => {
      await driver.get("https://zdravcity.ru/");
      await driver.sleep(3_000);
      const input = driver.findElement(By.id('desktopSearchInput'));
      await input.click();
      await driver.sleep(3_000);
      const searchInput = await driver.switchTo().activeElement();
      searchInput.sendKeys("Кагоцел 12мг 20шт");
      await driver.sleep(3_000);
      const button1 = driver.findElement(By.className('sc-be181b41-1 bvoFdW Button_button__4em_S Button_button--orange__lc846'));
      await button1.click();
      await driver.sleep(7_000);
      const button2 = driver.findElement(By.className('Button_button__4em_S Button_button--orange__lc846 Button_button--fluid__dRKdB'));
      await button2.click();
      await driver.sleep(2_000);
      const ans = await driver.findElement(By.className('ProductToast_product-toast__QIKM4')).getText();
      assert(ans.includes('Кагоцел таблетки 12мг 20шт'));
    });
    after(async () => {
     driver.quit();
    })
  });
