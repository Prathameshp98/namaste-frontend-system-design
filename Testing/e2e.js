const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');   
require('dotenv').config();

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        args: ["--window-size=1920,1080"]
    });

    const page = await browser.newPage();

    await page.goto('https://www.naukri.com/');
    console.log("Page loaded.");

    await page.setViewport({ width: 1500, height: 1080 });

    // Open login sidebar
    const userLoginButton = ".nI-gNb-lg-rg__login";
    await page.waitForSelector(userLoginButton);
    await page.click(userLoginButton);

    // Enter login credentails
    const NAUKRI_EMAIL = process.env.NAUKRI_EMAIL;
    const NAUKRI_PASSWORD = process.env.NAUKRI_PASSWORD;
    if (NAUKRI_EMAIL) {
        await page.type('.login-layer > .form > .form-row > input[type="text"]', NAUKRI_EMAIL); 
    } else {
        throw new Error("❌ EMAIL is not defined");
    }
    
    if(NAUKRI_PASSWORD){
        await page.type('.login-layer > .form > .form-row > input[type="password"', NAUKRI_PASSWORD);   
    } else {
        throw new Error("❌ PASSWORD is not defined");
    }
    // Click on login button
    await page.click('.loginButton'); 
    console.log("User logged in.");

    // Open user sidebar
    const userSidebar = ".nI-gNb-drawer__icon";
    await page.waitForSelector(userSidebar);
    await page.click(userSidebar);

    // Click on view and update profile
    const viewAndUpdateProfileLink = ".nI-gNb-info__sub-link";
    await page.waitForSelector(viewAndUpdateProfileLink);
    await page.click(viewAndUpdateProfileLink);
    console.log("User profile opened.")

    const updateResumeButton = "input[type='button'].dummyUpload";
    await page.waitForSelector(updateResumeButton);
    await page.click(updateResumeButton);

    // Upload resume
    const filePath = path.join(os.homedir(), 'Downloads/prathamesh_patil_resume.pdf');

    // Select the input and upload the file
    const fileInputHandle = await page.$("input[type='file']#attachCV");

    if (fileInputHandle) {
    await fileInputHandle.uploadFile(filePath);
        console.log("✅ Resume uploaded.");

        // Press the ESC key to close the uploader
        await page.focus('body');
        await page.keyboard.press('Escape');  // Simulates pressing the ESC key
        console.log("🧹 ESC pressed to close uploader.");
    } else {
        console.error("❌ File input not found.");
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
    await browser.close();

})();


// Homework
// 1. Automate whole website flow.
// 2. Test should run at specific time interval - CRON job
// 3. Send the success or fail log to email - Amazon SES