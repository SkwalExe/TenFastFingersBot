// TenFastFingersBot
// License : MIT 
// Author : Skwal
// Github : https://github.com/SkwalExe
// Discord : https://discord.skwal.net
// Twitter : https://twitter.com/SkwalExe

// SKIDS : please don't copy this code or at least credit me

// This program is only for educational purposes and doesn't incite you to cheat.

const puppeteer = require('puppeteer');

// button to click to accept cookies
var cookieSelector = '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll';

// function to sleep in milliseconds
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
// use stdout.write to remove the trailing newline
function log(...args) {
    process.stdout.write(...args);
}

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    // open 10fastfingers.com
    page.goto('https://10fastfingers.com/typing-test/english');

    // wait for cookie popup
    await page.waitForSelector(cookieSelector);
    sleep(500)
    // accept cookies
    page.click(cookieSelector);

    // focus on the textarea
    page.focus('input[class="form-control"]')

    // set finished to true when the minute is passed
    var finished = false;
    setTimeout(() => {
        finished = true
    }, 60000);

    var i = 0;

    // type while the test is not finished

    while (!finished) {

        await page.waitForSelector(`span[wordnr="${i}"`);
        var word = await page.$eval(`span[wordnr = "${i}"]`, e => e.textContent)

        for (var letter = 0; letter < word.length; letter++) {
            // for each letter

            // log it in the console
            log(word[letter])

            await sleep(35) // delay between each letter

            // type the letter
            page.keyboard.type(word[letter])

        }

        // type a space to move to the next word
        page.keyboard.type(' ');

        log(" ")
        i++;
    }



})();