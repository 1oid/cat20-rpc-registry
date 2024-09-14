
export default async function (options) {
    const {rpc, name} = options

    const resp = await fetch(
        `http://${rpc}:8332`,
        {
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
                    wallet_name: name,
                    disable_private_keys: true,
                    blank: true,
                    passphrase: '',
                    descriptors: true,
                    load_on_startup: true,
                },
            }),
        })
    try {
        const { error, result } = await resp.json()

        if(error !== null) {
            const { message } = error
            console.log(`[CREATE ERROR] ${message}`)
            return false
        } else {
            console.log(`[CREATE] create successfully.`)
            return true
        }

    }catch (e) {
        console.log('ERROR: ', e.message)
        return false
    }

}
