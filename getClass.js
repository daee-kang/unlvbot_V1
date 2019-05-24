const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

module.exports = {
    run
}

const errorMessage = "The search returns no results that match the criteria specified.";

async function run(data) {
    var classObjectNames = Object.keys(data)
    let out = {}
    for(let i = 0; i < classObjectNames.length; i++){
        name = classObjectNames[i];
        console.log(data[name])
        className = data[name].className;
        classNumber = data[name].classNum;

        console.log("sent" + className);
        console.log("sent" + classNumber);
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        
        await page.goto('https://my.unlv.nevada.edu/psp/lvporprd/?cmd=login&languageCd=ENG');
        await page.waitFor(1000);
        const newTabtoSameTab = await page.evaluate(() => {
            document.querySelector("#login > div > div > div:nth-child(12) > a").setAttribute("target", "_self");
            return new Promise (resolve => {
                resolve('true');
            })
        });
        await page.click('#login > div > div > div:nth-child(12) > a');
        await page.waitFor(2000);
        //fill in classname
        await page.click("#SSR_CLSRCH_WRK_SUBJECT\\$0");
        await page.keyboard.type(className);
        await page.waitFor(500);
        //fill in classnumber
        await page.click("#SSR_CLSRCH_WRK_CATALOG_NBR\\$1");
        await page.keyboard.type(classNumber);
        await page.waitFor(500);
        //click check is open
        // await page.click("#SSR_CLSRCH_WRK_SSR_OPEN_ONLY\\$3");
        // await page.waitFor(500);
    
        await page.click("#CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH");
        await page.waitFor(2000);
    
        if (await page.$("#SSR_CLSRCH_WRK_CATALOG_NBR\\$1") !== null){
            browser.close()
            out[name] = "no class available"
        }
        else {
            browser.close()
            out[name] = "class is available"
        }
    }
    console.log(out);
    return out;
  }
//   function yes(msg) {
//       if(msg === "true"){
//           transporter.sendMail(mailOptions, function(error, info){
//               console.log('im in');
//               if (error) {
//               console.log(error);
//               } else {
//               console.log('Email sent: ' + info.response);
//               }
//           });
//       }
//   }