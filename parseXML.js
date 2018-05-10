const fs = require('fs');

let xmlString = fs.readFileSync('./sample.xml', {encoding: 'utf-8'});
let title = xmlString.match(/<IntegrationObjectID>([^<]+)<\/IntegrationObjectID>/)[1];

let re = new RegExp(/<IntegrationObjectID>([^<]+)<\/IntegrationObjectID>/);
if (re.test(xmlString)) {
    console.log("matched");
} else {
    console.log("not match");
}



console.log("title: ", title);

