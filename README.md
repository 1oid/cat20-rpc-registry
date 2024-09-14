# cat20-rpc-registry
> register wallet to RPC Node
> 

## Install
### Download
```shell
git clone https://github.com/1oid/cat20-rpc-registry
```

### install dependencies
```shell
cd cat20-rpc-registry
yarn install
```

## Commands
### Show usage
```shell
yarn cli -h
Usage: approve [options]

Fractal-Bitcoin wallet register

Options:
  -V, --version                          output the version number
  -n, --name [Wallet name 钱包名, 可以在config.json中找到]               --name
  -w, --wallet [Wallet address, 钱包地址, 通过 yarn cli wallet address获取]          --wallet
  -r, --rpc [RPC Node IP, rpc ip, 只需要IP部分]                --rpc
  -c, --config [Generate config Enable, 如果开启, 会输出config配置]  --config (default: false)
  -h, --help                             display help for command
```

### Register the wallet to RPC Node
```shell
yarn cli -n cat-a103ca57 -w bc1pkxvkymgm0wchrr5s4fqrd8vepghquctuwvj92gd8q7vs2pdrd2rst4q65r -r 127.0.0.1

[CREATE] create successfully.
[IMPORT] import successfully.
```
replace the RPC Node IP to your config.json

### Register the wallet to RPC Node and generate config.json
```shell
yarn cli -n cat-a103ca57 -w bc1pkxvkymgm0wchrr5s4fqrd8vepghquctuwvj92gd8q7vs2pdrd2rst4q65r -r 127.0.0.1 -c

[CREATE] create successfully.
[IMPORT] import successfully.

🌟===== write output to your cofig.json =====
{
  network: 'fractal-mainnet',
  tracker: 'http://127.0.0.1:3000',
  dataDir: '.',
  maxFeeRate: 0,
  rpc: {
    url: 'http://127.0.0.1:8332',
    username: 'bitcoin',
    password: 'opcatAwesome'
  }
}
```

