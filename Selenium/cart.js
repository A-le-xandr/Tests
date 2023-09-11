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
    }); 
    it('1.  изменение количевства товара с помощью кнопки "+"    ', async () => {
      await driver.findElement(By.className('CircleIcon_circle__PSMCJ Cart_cart-icon__irZP5')).click();
      await driver.sleep(3_000);
      await driver.findElement(By.xpath('//button[@aria-label="Увеличить на один. Текущее количество 1"]')).click();
      await driver.sleep(3_000);
      const ans = await driver.findElement(By.className('Counter_counter-field__gEiFM Counter_counter-field--wide__5ZNfa')).getAttribute('value');
      assert(ans.includes('2'));
    });
    it('2.  изменение количевства товара с помощью кнопки "-"    ', async () => {
        await driver.findElement(By.xpath('//button[@aria-label="Уменьшить на один. Текущее количество 2"]')).click();
        await driver.sleep(3_000);
        const ans = await driver.findElement(By.className('Counter_counter-field__gEiFM Counter_counter-field--wide__5ZNfa')).getAttribute('value');
        assert(ans.includes('1'));
    });
    it('3.  изменение количевства товара на 200', async () => {
      await driver.findElement(By.className('Counter_counter-field__gEiFM Counter_counter-field--wide__5ZNfa')).clear();
      await driver.findElement(By.className('Counter_counter-field__gEiFM Counter_counter-field--wide__5ZNfa')).click();
      await driver.switchTo().activeElement().sendKeys('200');
      const hoverable = driver.findElement(By.className("Counter_counter-button__DtZom Counter_counter-button--limited__iAfAE"));
      const actions = driver.actions({async: true});
      await actions.move({origin: hoverable}).perform();
      const ans = await driver.findElement(By.className('Tooltip_tooltip-label__9P_mc')).getText();
      assert(ans.includes('Количество ограничено'));
  });
    it('4.  изменение количевства товара на 0', async () => {
        await driver.findElement(By.className('Counter_counter-field__gEiFM Counter_counter-field--wide__5ZNfa')).clear();
        await driver.findElement(By.className('Counter_counter-field__gEiFM Counter_counter-field--wide__5ZNfa')).click();
        await driver.switchTo().activeElement().sendKeys('0');
        const ans = await driver.findElement(By.className('Counter_counter-field__gEiFM Counter_counter-field--wide__5ZNfa')).getAttribute('value');
        assert(ans.includes('0'));
    });
    after(async () => {
     driver.quit();
    })
  });