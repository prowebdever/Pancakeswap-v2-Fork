# Phantom Swap Exchange

[PancakeSwap](https://pancakeswap.finance/) is an automated market maker (“**AMM**”) that allows two tokens to be exchanged on the [Binance Smart Chain](https://www.binance.org/en/smartChain) (BSC). It is fast, cheap, and allows anyone to participate.

This repo is responsible for the **exchange** interface of the AMM: [exchange.pancakeswap.finance](https://exchange.pancakeswap.finance/)

If you want to contribute, please refer to the [contributing guidelines](./CONTRIBUTING.md) of this project.


## Step 1: Build `pancakeswap-sdk-v2`

```
❯ git clone https://github.com/pancakeswap/pancakeswap-sdk-v2
```

Build:
```
❯ yarn
❯ npm run build
```

## Step 2: Swap Interface

Clone the repository.
```
❯ yarn
❯ npm install ../pancakeswap-sdk-v2
❯ rm -rf ./node_modules/@pancakeswap-libs/sdk
❯ yarn start

Starting the development server...
Compiled successfully!
You can now view @pancakeswap/interface in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.10.10.9:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```


# Pancake Swap Exchange on BSC testnet

## V2 SDK for the BSC testnet

Since there isn't an official PancakeSwap on testnet and the v2 frontend swap interface code isn't published on the [PancakeSwap github](https://github.com/pancakeswap) I decided to adjust [`pancake-swap-interface-v1`](https://github.com/pancakeswap/pancake-swap-interface-v1) for v2 routers on the BSC testnet as per [this comment on issue #365](https://github.com/pancakeswap/pancake-swap-interface-v1/issues/365#issuecomment-845603976).

This fork requires a fork of [`@pancakeswap-libs/sdk-v2`](https://github.com/pancakeswap/pancakeswap-sdk-v2), instructions and code can at [https://github.com/ibhagwan/pancakeswap-sdk-v2](https://github.com/ibhagwan/pancakeswap-sdk-v2).


## Step 1: Build `pancakeswap-sdk-v2`

```
❯ git clone https://github.com/pancakeswap/pancakeswap-sdk-v2
```

- Modify `FACTORY_ADDRESS` & `INIT_CODE_HASH` in `src/constants.ts`
- Modify the testnet `WBNB` at the end of `entities/token.ts`:
    ```
    [ChainId.BSCTESTNET]: new Token(
        ChainId.BSCTESTNET,
        '0xae13d989dac2f0debff460ac112a837c89baa7cd',
        18,
        'WBNB',
        'Wrapped BNB'
    )
    ```
> **Note:** if you'd like to use the default testnet router `0xD99D1c33F9fC3444f8101754aBC46c52416550D1` you can skip the editing and `git clone https://github.com/ibhagwan/pancakeswap-sdk-v2.git` instead.

Build:
```
❯ yarn
❯ npm run build
```

## Step 2: 

Clone and branch to the commit before V2 changes:
```
❯ git clone https://github.com/pancakeswap/pancake-swap-interface-v1
❯ git branch pancake_v2 0257017
❯ git checkout pancake_v2
```

Create `.env` with the below contents:
```
REACT_APP_NETWORK_URL="https://data-seed-prebsc-1-s1.binance.org:8545"
REACT_APP_CHAIN_ID="97"
```

Modify `ROUTER_ADDRESS` in `src/constants/index.ts`

Edit the tokens you'd like to appear in the UI in `src/constants/token/pancakeswap.json` (change the token `address` and set `chainId` to 97)

Search the entire project for `'@pancakeswap-libs/sdk'` and replace with `'@pancakeswap-libs/sdk-v2'`
> I do this with vim, search the entire project with `fzf|rg` into a quickfix list and use
> `:cdo %s/'@pancakeswap-libs\/sdk'/'@pancakeswap-libs\/sdk-v2'/g`


```
❯ yarn
❯ npm install ../pancakeswap-sdk-v2
❯ rm -rf ./node_modules/@pancakeswap-libs/sdk
❯ yarn start

Starting the development server...
Compiled successfully!
You can now view @pancakeswap/interface in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.10.10.9:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

## <a id="testnet-routers"><a id="user-testnet-routers">Testnet routers</a></a>

### PancaeSwap V2, option #1 (default)

> This router was deployed by PancakeSwap and [published on their twitter](https://twitter.com/PancakeSwap/status/1369547285160370182?s=20)

Router: [`0xD99D1c33F9fC3444f8101754aBC46c52416550D1`](https://testnet.bscscan.com/address/0xD99D1c33F9fC3444f8101754aBC46c52416550D1)

Factory: [`0x6725f303b657a9451d8ba641348b6761a6cc7a17`](https://testnet.bscscan.com/address/0x6725f303b657a9451d8ba641348b6761a6cc7a17)

WETH: [`0xae13d989dac2f0debff460ac112a837c89baa7cd`](https://testnet.bscscan.com/address/0xae13d989dac2f0debff460ac112a837c89baa7cd)

INIT_CODE_PAIR_HASH: `0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66`


### PancaeSwap V2, option #2

> This router was published by [kiemtienonline360.com](https://bsc.kiemtienonline360.com/) and can be accessed through [https://pancake.kiemtienonline360.com](https://pancake.kiemtienonline360.com)

Router: [`0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3`](https://testnet.bscscan.com/address/0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3)

Factory: [`0xb7926c0430afb07aa7defde6da862ae0bde767bc`](https://testnet.bscscan.com/address/0xb7926c0430afb07aa7defde6da862ae0bde767bc)

WETH: [`0xae13d989dac2f0debff460ac112a837c89baa7cd`](https://testnet.bscscan.com/address/0xae13d989dac2f0debff460ac112a837c89baa7cd)

INIT_CODE_PAIR_HASH: `0xecba335299a6693cb2ebc4782e74669b84290b6378ea3a3873c7231a8d7d1074`
