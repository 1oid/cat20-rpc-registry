import * as descriptors from '@bitcoinerlab/descriptors';

export default async function (options) {
    const { rpc, name, wallet } = options
    const desc = `addr(${wallet})`
    const checksum = descriptors.checksum(desc);
    const timestamp = Math.ceil(new Date().getTime() / 1000);

    const resp = await fetch(
        `http://${rpc}:8332/wallet/${name}`,
        {
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
    })
    const { result } = await resp.json()

    if( result !== null ) {
        for(let i = 0; i < result.length;i++) {
            const { success, error } = result[i]

            if( success ) {
                console.log('[IMPORT] import successfully.')
                return true
            } else {
                console.log('[IMPORT ERROR]', error)
                return false
            }
        }
    }
    console.log(await resp.text())
    return false
}
