import * as descriptors from '@bitcoinerlab/descriptors';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const timestamp = Math.ceil(new Date().getTime() / 1000);
const config = {
    wallet: {
        name: 'cat-8098813d',
        address: 'bc1p9xqxam7qads7ak37yvg5la3smkxlvg8pg4c9pflasylhwkjjtfws704r6p',
        ip: '154.38.167.23'
    }
}

console.log(JSON.stringify({
    jsonrpc: '2.0',
    id: 'cat-cli',
    method: 'createwallet',
    params: {
        wallet_name: config.wallet.name,
        disable_private_keys: true,
        blank: true,
        passphrase: '',
        descriptors: true,
        load_on_startup: true,
    },
}))

console.log(`http://${config.wallet.ip}:8332`)
fetch(`http://${config.wallet.ip}:8332`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic Yml0Y29pbjpvcGNhdEF3ZXNvbWU='
    },
    body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'cat-cli',
        method: 'createwallet',
        params: {
            wallet_name: config.wallet.name,
            disable_private_keys: true,
            blank: true,
            passphrase: '',
            descriptors: true,
            load_on_startup: true,
        },
    }),
}).then(console.log).catch(console.log)
console.log('====')
const desc = `addr(${config.wallet.address})`
const checksum = descriptors.checksum(config.wallet.address);
fetch(`http://${config.wallet.ip}:8332/wallet/` + config.wallet.name, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic Yml0Y29pbjpvcGNhdEF3ZXNvbWU='
    },
    body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'cat-cli',
        method: 'importdescriptors',
        params: [
            [
                {
                    desc: `${desc}#${checksum}`,
                    active: false,
                    index: 0,
                    internal: false,
                    timestamp,
                    label: '',
                },
            ],
        ],
    })
}).then(console.log).catch(console.log)