const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = (event, context, callback) => {
    // event.body is the xml sent
    //
    console.log('event.body: ', event.body);

    // Get the current date so we can place the file into a bucket related to that day
    // bucketName -> year -> month -> day -> fileName.xml
    //
    let date = new Date();
    let day = date.getDate();

    // Javascript month starts at 0
    //
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // Check to see if we can parse the fileName from the xml (inside event.body)
    //
    let re = new RegExp(/<IntegrationObjectID>([^<]+)<\/IntegrationObjectID>/);
    let fileName;

    if (re.test(event.body)) {
        fileName = event.body.match(/<IntegrationObjectID>([^<]+)<\/IntegrationObjectID>/)[1];
    } else {
        // Use the date to create a fileName
        //
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ms = date.getMilliseconds();

        fileName = `${hour}${minutes}${seconds}${ms}`
    }

    let filePath = `xml/${year}/${month}/${day}/${fileName}.xml`;

    console.log("fileName: ", fileName);
    console.log(`filePath ${filePath}`);


    let params = {
        "Body": event.body,
        "Bucket": "xml-storage",
        "Key": filePath
    };

    // upload to S3
    //
    s3.upload(params, function(error, data) {
        if(error) {
            console.log("error: ", error);
            callback(error, null);
        } else {
            let response = {
                "statusCode": 200,
                "headers": {
                    "my_header": "my_value"
                },
                "body": JSON.stringify(data),
                "isBase64Encoded": false
            };
            console.log('error: ', error);
            console.log('data: ', data);
            callback(null, response);
        }
    });
};
