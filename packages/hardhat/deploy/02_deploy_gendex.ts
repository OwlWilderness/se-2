import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "CryptoGenX" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("CryptoGenX", {
    from: deployer,
    // Contract constructor arguments
    //args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract
  const cryptoGenX = await hre.ethers.getContract("CryptoGenX", deployer);

  await deploy("CryptogsRebornGenesis", {
    from: deployer,
    // Contract constructor arguments
    args: [
      [
        "0x1A4c2B35c9B4CC9F9A833A43dBe3A78FDB80Bb54",
        "0x47cf52332a60d15CCd534B7C255dD8777d0B65FA",
        "0x8fa282757D6CC54812E56EE3E90561F6E373f17e",
      ],
    ],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const cryptogsRebornGenesis = await hre.ethers.getContract("CryptogsRebornGenesis", deployer);

  await deploy("CryptoGenDEX", {
    from: deployer,
    args: [cryptoGenX.address, cryptogsRebornGenesis.address],
    log: true,
  });

  const cryptoGenDex = await hre.ethers.getContract("CryptoGenDEX", deployer);

  await cryptoGenX.transferOwnership("0x47cf52332a60d15CCd534B7C255dD8777d0B65FA");

  await cryptogsRebornGenesis.transferOwnership("0x47cf52332a60d15CCd534B7C255dD8777d0B65FA");

  await cryptoGenDex.transferOwnership("0x47cf52332a60d15CCd534B7C255dD8777d0B65FA");
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags CryptoGenDEX
deployYourContract.tags = ["CryptoGenX", "CryptogsRebornGenesis", "CryptoGenDEX"];