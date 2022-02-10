// TenFastFingersBot
// License : MIT 
// Author : Skwal
// Github : https://github.com/SkwalExe
// Discord : https://discord.skwal.net
// Twitter : https://twitter.com/SkwalExe

// SKIDS : please don't copy this code or at least credit me

// This program is only for educational purposes and doesn't incite you to cheat.

const puppeteer = require('puppeteer');

var cookieSelector = '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll';


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
// use stdout.write to remove the trailing newline
function log(...args) {
    process.stdout.write(...args);
}

(async() => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    // open 10fastfingers.com
    page.goto('https://10fastfingers.com/typing-test/english');


    await page.waitForSelector(cookieSelector);
    sleep(500)
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

            log(word[letter])

            await sleep(35)
            page.keyboard.type(word[letter])

        }
        page.keyboard.type(' ');
        log(" ")
        i++;
    }



})();