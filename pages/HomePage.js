export class HomePage{

    constructor(page){
        this.page=page;
        this.loginLink = page.getByRole('link', {name : 'Log in'})
        this.logoutLink = page.getByRole('link', {name : 'Log out'})
        this.categories = page.locator("//a[text()='CATEGORIES']/following-sibling::a")
        this.cartLink = page.locator("//a[normalize-space()='Cart']")
        this.products = page.locator("//div[@id='tbodyid']/descendant::h4[@class='card-title']/child::a")
    }

    async invokeApplicationUnderTest(){
        await this.page.goto('/')
        //await this.page.waitForLoadState('networkidle')
    }

    async clickOnLoginLink(){
        await this.loginLink.click();
    }

    async clickOnLogoutLink(){
        await this.logoutLink.click();
    }

    async getAllCategories(){
       return await this.categories.allInnerTexts()
    }

    async getProducts(){
        await this.products.first().waitFor()
        return await this.products.all()
    }

   async getProductCategories(){
        return await this.categories.all()
    }

    async clickOnCartLink(){
        await this.cartLink.click()
    }

    async selectAProduct(productName){
    for(let product of await this.getProducts()){
            if(await product.innerText() === productName){
                await product.click()
                break
            }
        }    
   }
}