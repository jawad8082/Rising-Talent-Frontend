require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./backend/artifacts",
    sources: "./backend/contracts",
    cache: "./backend/cache",
    tests: "./backend/test",
  },
  networks: {
    localhost: {
      accounts: [
        "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
    },
    rinkeby: {
      // url: "https://rinkeby.infura.io/v3/20303cf8115746a5ab04f1ea4fdf267c", //Infura url with projectId
      url: "https://goerli.infura.io/v3/d576e8fe4c424ed288582c32fbf8106d",
      accounts: [
        "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
        // "d00695baea3de6b6f1a69ea6eb8d715c7fb15027c6a334d4b44aa917f6e6b843",
        // "91fc7eebbd3c8e1b78ca464be425dc197243ac5d68f9e324717e539259eba124",
      ], // add the account that will deploy the contract (private key)
    },
  },
};
