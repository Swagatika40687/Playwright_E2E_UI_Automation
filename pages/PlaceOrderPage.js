export class PlaceOrderPage{
    constructor(page){
        this.page = page
        this.name = page.locator("//input[@id='name']")
        this.country = page.locator("//input[@id='country']")
        this.city = page.locator("//input[@id='city']")
        this.creditCard = page.locator("//input[@id='card']")
        this.month = page.locator("//input[@id='month']")
        this.year = page.locator("//input[@id='year']")
        this.purchaseBtn = page.locator("//button[normalize-space()='Purchase']")
        this.closeBtn = page.locator("//button[normalize-space()='Purchase']/preceding-sibling::button[1]")
        this.paymentConfirmation = page.locator("//div[contains(@class,'sweet-alert')]/descendant::h2")
        this.okBtn = page.locator("//div[contains(@class,'sweet-alert')]/descendant::button[text()='OK']")
    }


    async enterName(name){
        await this.name.fill(name)
    }

    async enterCountry(country){
        await this.country.fill(country)
    }

    async enterCity(city){
        await this.city.fill(city)
    }

    async enterCreditCard(cardNo){
        await this.creditCard.fill(cardNo)
    }

    async enterMonth(month){
        await this.month.fill(month)
    }

    async enterYear(year){
        await this.year.fill(year)
    }

    async clickOnPurchaseBtn(){
        await this.purchaseBtn.click()
    }

    async getPaymentConfirmationText(){
        return await this.paymentConfirmation.innerText()
    }

    async clickOnOKBtn(){
        await this.okBtn.click()
    }

    async clickOnCloseBtn(){
        await this.closeBtn.click()
    }

    async placeOrder(name, country, city, cardNo, month, year){
        await this.enterName(name)
        await this.enterCountry(country)
        await this.enterCity(city)
        await this.enterCreditCard(cardNo)
        await this.enterMonth(month)
        await this.enterYear(year)
        await this.purchaseBtn.click()
    }

}