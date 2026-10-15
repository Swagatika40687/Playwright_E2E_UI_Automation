export class LoginPage{
    constructor(page){
        this.page = page
        this.username  = page.locator("//input[@id='loginusername']")
        this.password = page.locator("//input[@id='loginpassword']")
        this.loginBtn = page.getByRole('Button', { name: 'Log in' })
    }

    // Enter Username
    async enterUserName(username){
        await this.username.fill(username)
    }

    // Enter Password
    async enterPassword(password){
        await this.password.fill(password)
    }

    // Click on 'Log in' button
    async clickOnLoginBtn(){
        await this.loginBtn.click()
    }


    // Login to Application Under Test
    async loginToApplication(username, password){
        await this.enterUserName(username)
        await this.enterPassword(password)
        await this.clickOnLoginBtn()
        await this.page.waitForTimeout(3000)
    }
}