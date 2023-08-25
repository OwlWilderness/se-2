import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "GnosticKey" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployGnosticKey: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
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
  
  const chainid = await hre.getChainId();

  if (chainid == "31337"){
    // Get the deployed contract
    const GnosticSvg = await hre.ethers.getContract("GnosticSvg", deployer);

    await deploy("GnosticKey", {
      from: deployer,
      // Contract constructor arguments
      args: [GnosticSvg.address],
      log: true,
      // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
      // automatically mining the contract deployment transaction. There is no effect on live networks.
      autoMine: true,
    });

  } else {

   await deploy("GnosticKey", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });
}
  // Get the deployed contract
  // const GnosticKey = await hre.ethers.getContract("GnosticKey", deployer);
};

export default deployGnosticKey;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags GnosticKey
deployGnosticKey.tags = ["GnosticKey"];
