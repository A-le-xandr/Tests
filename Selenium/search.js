const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const assert = require("assert");
const { ADDRGETNETWORKPARAMS } = require('dns');

describe(" Поисковая строка  ", () => {
    let driver;

    before(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().window().maximize();
      await driver.get("https://zdravcity.ru/");
      await driver.sleep(10_000);
    }); 
    it('1.  Поиск товара на кириллице', async () => {
      await driver.sleep(3_000);
      const input = driver.findElement(By.id('desktopSearchInput'));
      await input.click();
      await driver.sleep(3_000);
      const searchInput = await driver.switchTo().activeElement();
      searchInput.sendKeys("Кагоцел 12мг");
      await driver.sleep(3_000);
      await driver.findElement(By.className('sc-be181b41-1 bvoFdW Button_button__4em_S Button_button--orange__lc846')).click();
      await driver.sleep(3_000);
      const ans = await driver.findElement(By.className('Horizontal_horizontal-title__hvBAm')).getText();
      assert(ans.includes('Кагоцел таблетки 12мг'));
    });
    it('2.  Поиск товара на латинице', async () => {
      await driver.get("https://zdravcity.ru/");
      await driver.sleep(3_000);
      const input = driver.findElement(By.id('desktopSearchInput'));
      await input.click();
      await driver.sleep(3_000);
      const searchInput = await driver.switchTo().activeElement();
      searchInput.sendKeys("Kagocel");
      await driver.sleep(3_000);
      await driver.findElement(By.className('sc-be181b41-1 bvoFdW Button_button__4em_S Button_button--orange__lc846')).click();
      await driver.sleep(3_000);
      const ans = await driver.findElement(By.className('Horizontal_horizontal-title__hvBAm')).getText();
      assert(ans.includes('Кагоцел'));
    });
    it('3.  Поиск товара только c использованием нижнего регистра', async () => {
        await driver.get("https://zdravcity.ru/");
        await driver.sleep(3_000);
        const input = driver.findElement(By.id('desktopSearchInput'));
        await input.click();
        await driver.sleep(3_000);
        const searchInput = await driver.switchTo().activeElement();
        searchInput.sendKeys("кагоцел 12мг");
        await driver.sleep(3_000);
        await driver.findElement(By.className('sc-be181b41-1 bvoFdW Button_button__4em_S Button_button--orange__lc846')).click();
        await driver.sleep(3_000);
        const ans = await driver.findElement(By.className('Horizontal_horizontal-title__hvBAm')).getText();
        assert(ans.includes('Кагоцел'));
      });
      it('4.  Поиск товара только с использованием верхнего регистра', async () => {
        await driver.get("https://zdravcity.ru/");
        await driver.sleep(3_000);
        const input = driver.findElement(By.id('desktopSearchInput'));
        await input.click();
        await driver.sleep(3_000);
        const searchInput = await driver.switchTo().activeElement();
        searchInput.sendKeys("КАГОЦЕЛ 12МГ");
        await driver.sleep(3_000);
        await driver.findElement(By.className('sc-be181b41-1 bvoFdW Button_button__4em_S Button_button--orange__lc846')).click();
        await driver.sleep(3_000);
        const ans = await driver.findElement(By.className('Horizontal_horizontal-title__hvBAm')).getText();
        assert(ans.includes('Кагоцел'));
      });
      it('5.  Поиск товара с использованием знака', async () => {
        await driver.get("https://zdravcity.ru/");
        await driver.sleep(3_000);
        const input = driver.findElement(By.id('desktopSearchInput'));
        await input.click();
        await driver.sleep(3_000);
        const searchInput = await driver.switchTo().activeElement();
        searchInput.sendKeys("Кагоцел!");
        await driver.sleep(3_000);
        await driver.findElement(By.className('sc-be181b41-1 bvoFdW Button_button__4em_S Button_button--orange__lc846')).click();
        await driver.sleep(3_000);
        const ans = await driver.findElement(By.className('Horizontal_horizontal-title__hvBAm')).getText();
        assert(ans.includes('Кагоцел'));
      });
      it('6.  Поиск товара с использованием символа', async () => {
        await driver.get("https://zdravcity.ru/");
        await driver.sleep(3_000);
        const input = driver.findElement(By.id('desktopSearchInput'));
        await input.click();
        await driver.sleep(3_000);
        const searchInput = await driver.switchTo().activeElement();
        searchInput.sendKeys("Кагоцел@");
        await driver.sleep(3_000);
        await driver.findElement(By.className('sc-be181b41-1 bvoFdW Button_button__4em_S Button_button--orange__lc846')).click();
        await driver.sleep(3_000);
        const ans = await driver.findElement(By.className('Horizontal_horizontal-title__hvBAm')).getText();
        assert(ans.includes('Кагоцел'));
      });
    after(async () => {
     driver.quit();
    })
  });