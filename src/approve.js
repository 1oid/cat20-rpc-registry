import { program } from "commander";
import fetch from "node-fetch";
import {CommandParseOptions} from "./commanders/index.js";
import Create from "./service/create.js";
import create from "./service/create.js";
import importdescriptors from "./service/importdescriptors.js";

async function bootstrap() {
    const options = CommandParseOptions()
    if(options === null) {
        return
    }

    const { config, rpc } = options

    // call rpc `createwallet` method
    const createSuccessfully = await create(options)
    if(createSuccessfully) {
        // call rpc `importdescriptors` method
        const importSuccessfully = await importdescriptors(options)
        if(importSuccessfully && config) {
            console.log('\n🌟===== write output to your cofig.json =====')
            console.log({
                "network": "fractal-mainnet",
                "tracker": `http://${rpc}:3000`,
                "dataDir": ".",
                "maxFeeRate": 0,
                "rpc": {
                    "url": `http://${rpc}:8332`,
                    "username": "bitcoin",
                    "password": "opcatAwesome"
                }
            })
        }
    }

}

bootstrap()
