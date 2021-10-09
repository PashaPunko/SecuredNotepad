export function getRequest(route, parameters) {
    return fetch(`http://localhost:64185/api/${route}?${parameters}`)
        .then(data => {
            return data.json();
        })
}

export function trimRsaPublicKey(publicKey) {
    return publicKey
        .replace('-----BEGIN RSA PUBLIC KEY-----\n', '')
        .replace('\n-----END RSA PUBLIC KEY-----', '')
}

export function trimRsaPrivateKey(publicKey) {
    return publicKey
        .replace('-----BEGIN RSA PRIVATE KEY-----\n', '')
        .replace('\n-----END RSA PRIVATE KEY-----', '')
}
