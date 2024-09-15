import { program } from "commander";

export function CommandParseOptions() {
    program
        .description('Fractal-Bitcoin wallet register')
        .version('0.0.1')
        .option('-n, --name [Wallet name]', 'wallet name')
        .option('-w, --wallet [Wallet address]', 'wallet address')
        .option('-r, --rpc [RPC Node IP]', 'rpc node ip only')
        .option('-c, --config [Generate config Enable]', 'config generate', false)
        .parse(process.argv);
    program.parse();

    const options = program.opts();

    try {
        validateRequireOptionsNotNull(options)

        return {
            name: options.name,
            wallet: options.wallet,
            rpc: options.rpc,
            config: options.config,
        }
    }catch (e) {
        console.log('Error', e.message)
        program.outputHelp()
    }
    return null
}

function validateRequireOptionsNotNull({ name, wallet, rpc }) {
    const notNulls = [name, wallet, rpc].filter(v => v === undefined)
    if(notNulls.length > 0) {
        throw new Error('options has null value')
    }

    // if(name.indexOf('cat') === -1) {
    //     throw new Error('name is not valid format. Example: cat-xxx')
    // }

    if(wallet.indexOf('bc1p') === -1) {
        throw new Error('wallet format is not support. Example: bc1p......')
    }
}