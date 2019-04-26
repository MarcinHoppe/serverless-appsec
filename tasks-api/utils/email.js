const AWS = require('aws-sdk');
const mail = require('@sendgrid/mail');
const client = new AWS.SecretsManager({ region: 'eu-central-1' });

function send(from, to, subject, text) {
    console.log('send()', from, to, subject, text);

    return client.getSecretValue({SecretId: 'sendgrid-api-key'}).promise()
        .then((res) => {
            mail.setApiKey(res.SecretString);
            return mail.send({
                from, to, subject, text
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports.send = send;