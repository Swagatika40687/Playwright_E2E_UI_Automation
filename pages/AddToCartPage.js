import { expect } from "@playwright/test"

export class AddToCartPage{
    constructor(page){
        this.page=page
        this.addToCartBtn = page.locator("//a[normalize-space()='Add to cart']")
        this.productsAdded = page.locator("//*[@id='tbodyid']/child::tr/child::td[2]")
        this.placeOrderBtn = page.locator("//button[normalize-space()='Place Order']")
    }

    async clickOnAddToCartBtn(){

        this.page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('alert')
            expect(dialog.message()).toBe('Product added.')

            dialog.accept()
        })

        await this.addToCartBtn.click()
    }

    async verifyProductIsAddedToCart(productName){
        await this.productsAdded.first().waitFor()
        let productAdded = false
        for(const product of await this.productsAdded.all()){
            if(await product.innerText() === productName){
                productAdded = true
                break
            }
        }

        expect(productAdded).toBeTruthy()
    }

    async clickOnPlaceOrderBtn(){
        await this.placeOrderBtn.click()
    }


}