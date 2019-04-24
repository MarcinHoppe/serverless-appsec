const jwks = require('jwks-rsa');
const jwt = require('jsonwebtoken');

function authorize(event, context, cb) {
    console.log('authorize()', event);

    const accessToken = event.authorizationToken.substring('Bearer '.length);

    validate(accessToken, (err, decoded) => {
        if (err) { return cb(err); }

        if (validAccessToken(decoded)) {
            cb(null, policy(event.methodArn));
        } else {
            cb('Unauthorized');
        }
    });
}

function validate(token, cb) {
    console.log('validate', token);

    jwt.verify(token, key, (err, decoded) => {
        if (err) { return cb(err); }
        cb(null, decoded);
    });

    return true;
}

function key(header, cb) {
    console.log('key', header);

    const client = jwks({
        jwksUri: 'https://infoshare2019.eu.auth0.com/.well-known/jwks.json'
    });

    client.getSigningKey(header.kid, (err, key) => {
        if (err) { return cb(err); }
        cb(null, key.publicKey || key.rsaPublicKey);
    });
}

function validAccessToken(token) {
    console.log('validAccessToken', token);
    return true;
}

function policy(arn) {
    console.log('policy', arn);

    return {
        principalId: 'user',
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Action: [
                        'execute-api:Invoke'
                    ],
                    Resource: [
                        arn
                    ]
                }
            ]
        }
    };
}

module.exports.authorize = authorize;