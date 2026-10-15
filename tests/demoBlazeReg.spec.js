import {test, expect} from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import {LoginPage} from '../pages/LoginPage'
import {AddToCartPage} from '../pages/AddToCartPage'

import fs from 'fs'
import { faker } from '@faker-js/faker'
import { PlaceOrderPage } from '../pages/PlaceOrderPage'

test.beforeEach('Login To Application Under Test', async ({ page }) => {

    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    // Invoke Applicaton Under Test
    await homePage.invokeApplicationUnderTest()
    // Login To Application Under Test
    await homePage.clickOnLoginLink()

    const loginDataInfo = JSON.parse(fs.readFileSync('./testData/loginData.json','utf-8'))
    await loginPage.loginToApplication(loginDataInfo.username, loginDataInfo.password)

})

test('To verify that 3 categories are displayed - Phones, Laptops, Monitors', {tag: ['@smoke', '@regression']}, async ({ page }) => {
    const homePage = new HomePage(page)
    const productsInfo = JSON.parse(fs.readFileSync('./testData/products.json','utf-8'))
    const expCategories = productsInfo.categories
    const actCategories = await homePage.getAllCategories()
    expect(actCategories).toEqual(expCategories)    
})

test('To verify that 9 products are displayed by default', {tag: ['@smoke', '@regression']}, async ({ page }) => {
    const homePage = new HomePage(page)
    expect(await homePage.getProducts()).toHaveLength(9)
})

test('To verify that filter functionality is working as expected', {tag: ['@smoke', '@regression']}, async ({ page }) => {

    const productsInfo = JSON.parse(fs.readFileSync('./testData/products.json','utf-8'))

    const expProducts = [productsInfo.products.phones, productsInfo.products.laptops, productsInfo.products.monitors]
    const actProducts = []

    const homePage = new HomePage(page)
  
    for(let category of await homePage.getProductCategories()){
        await category.click()
        await page.waitForTimeout(3000)
        const productList = await homePage.getProducts()
        const productTexts = []
        for(let product of productList){
            productTexts.push(await product.innerText())
        }

        actProducts.push(productTexts)
    }

    expect(actProducts).toEqual(expProducts)
})

test('To verify that end user is able to add a product to cart and checkout successfully', {tag: ['@smoke', '@regression', '@e2e']}, async ({ page }) => {
    const homePage = new HomePage(page)
    const addToCartPage = new AddToCartPage(page)
    const placeOrderPage = new PlaceOrderPage(page)
    await homePage.selectAProduct('Samsung galaxy s7')
    
    await addToCartPage.clickOnAddToCartBtn()
    await homePage.clickOnCartLink()

    await addToCartPage.verifyProductIsAddedToCart('Samsung galaxy s7')

    await addToCartPage.clickOnPlaceOrderBtn()
    const name = faker.person.fullName()
    const country = faker.location.country()
    const city = faker.location.city()
    const cardNo = faker.finance.creditCardNumber()
    const month = faker.date.month({length: '2'})
    const year = faker.date.future().getFullYear().toString()

    await placeOrderPage.placeOrder(name,country,city,cardNo,month,year)
    expect(await placeOrderPage.getPaymentConfirmationText()).toBe('Thank you for your purchase!')
    await placeOrderPage.clickOnOKBtn()
    await placeOrderPage.clickOnCloseBtn()
})

test.afterEach('Logout of the Application Under Test', async ({ page }) => {
    // Logout of the Application Under Test
    const homePage = new HomePage(page)
    await homePage.clickOnLogoutLink()
    await page.close()

})