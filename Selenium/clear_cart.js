const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const assert = require("assert");


  describe("Корзина ", () => {
    let driver;

    before(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().window().maximize();
      await driver.get("https://zdravcity.ru/");
      await driver.sleep(10_000);
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
      await driver.findElement(By.className('CircleIcon_circle__PSMCJ Cart_cart-icon__irZP5')).click();
      await driver.sleep(3_000);
    }); 
    it('1.  удаление всего товара из корзины', async () => {
      await driver.findElement(By.className('Upper_upper-actions-right__Y6x_X')).click();
      await driver.sleep(2_000);
      await driver.findElement(By.className('Button_button__4em_S Button_button--orange__lc846 Button_button--orange--outlined__o_Kl3 Button_button--fluid__dRKdB')).click();
      await driver.sleep(3_000);
      const ans = await driver.findElement(By.className('Placeholder_placeholder-info-title__ehpV2')).getText();
      assert(ans.includes('Корзина пока пуста'));
    });
    after(async () => {
     driver.quit();
    })
  });
