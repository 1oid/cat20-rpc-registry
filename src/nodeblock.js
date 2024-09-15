import fetch from "node-fetch";
import {NodeBlockCommandParseOptions} from "./commanders/nodeblockCommander.js";
import fs from 'fs'

export async function verify(hostname) {
    if(hostname === '') {
        return
    }
    try{
        const resp = await fetch(
            `http://${hostname}:3000/api`
        )
        const { data } = await resp.json()
        if(data === null) {
            return
        }
        const { trackerBlockHeight, nodeBlockHeight, latestBlockHeight } = data

        const percent = (trackerBlockHeight / latestBlockHeight * 100).toFixed(2)
        if (trackerBlockHeight < latestBlockHeight) {
            console.warn(
                `${hostname} processing ${trackerBlockHeight}/${latestBlockHeight}: ${percent}%`,
            );
        } else {
            console.info(
                `${hostname} processing ${trackerBlockHeight}/${latestBlockHeight}: ${percent}%`,
            )
        }
    }catch(e) {
        return
    }
}

export async function readLines(options) {
    return new Promise(resolve => {
        const { file, rpc } = options

        if(file !== undefined && file !== null) {

            fs.readFile(file, 'utf8', (err, data) => {
                const readlines = data.split('\n')
                resolve(readlines.filter(v => v.trim() !== '').map(line => new URL(line.trim()).hostname))
            })
        } else {
            resolve([rpc])
        }
    })
}

export async function bootstrap() {
    const options = NodeBlockCommandParseOptions()
    if(options === null) {
        return
    }
    const lines = await readLines(options)

    lines.forEach(hostname => {
        try{
            verify(hostname)
        }catch (e) {
            // pass exceptions
        }
    })
}

bootstrap()
