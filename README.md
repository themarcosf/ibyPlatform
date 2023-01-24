# IBY PLATFORM

This section contains information about tasks required to operate the web3 API.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deployContracts.js
```

Use these commands to compile contracts:

```shell
npx hardhat compile
npx hardhat help compile
```

Set up and deploy to a local blockchain:

```shell
npx hardhat node
npx hardhat run --network localhost scripts/deployContracts.js
```

Interacting from the console

```shell
npx hardhat console --network localhost
```

This section contains data fields required for config.env file.

```shell

# default : development
# deploy config : production
NODE_ENV=development

# web3 tools
INFURA_API_KEY=<API_KEY>
GOERLI_PRIVATE_KEY=<PRIVATE_KEY>

# externally owned account
MNEMONIC=<MNEMONIC>
PRIVATE_KEY=<PRIVATE_KEY>
ADDRESS=<ADDRESS>
METAMASK_PASSWORD=<PASSWORD>

# server host and port
PORT=8000
HOST=127.0.0.1

# database config, remote and local
DATABASE_LOCAL=mongodb://127.0.0.1:27017/<PROJECT_NAME>
DATABASE_REMOTE=mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>.<RANDOM>.mongodb.net/<PROJECT_NAME>
DATABASE_PASSWORD=<PASSWORD>

# user authentication and authorization
JWT_SECRET=<SECRET>
JWT_EXPIRES=90d
JWT_COOKIE_EXPIRES=90

```
