import {program} from "commander";


export function NodeBlockCommandParseOptions() {
    program
        .description('Fractal-Bitcoin Tracker Node BlockHeight Check')
        .version('0.0.1')
        .option('-f, --file [RpcNode IPs]', 'RpcNodeIPs file, only IP')
        .option('-r, --rpc [RPC Node IP]', 'Rpc IP only')
        .parse(process.argv);
    program.parse();

    const options = program.opts();

    try {
        validateNodeBlockRequireOptionsNotNull(options)
        return {
            file: options.file,
            rpc: options.rpc
        }
    }catch (e) {
        console.log('Error', e.message)
        program.outputHelp()
    }
    return null
}

function validateNodeBlockRequireOptionsNotNull({ file, rpc }) {
    const notNulls = [file, rpc].filter(v => v === undefined)
    if(notNulls.length > 2) {
        throw new Error('options has null value')
    }
}
