const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = (event, context, callback) => {
    // event.body is the xml sent
    //
    console.log('event.body: ', event.body);

    let date = new Date();
    let day = date.getDate();

    // Javascript month starts at 0
    //
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    console.log("xml/"+ year + "/" + month + "/" + day + "/"
        + hour + ":" + minutes + ".xml");

    console.log("month: ", month);

    let filePath = "xml/"+ year + "/" + month + "/" + day + "/"
        + hour + ":" + minutes + ".xml";

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
