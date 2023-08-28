import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "ConditionalTokens" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployGnosticTekh: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
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

  await deploy("ConditionalTokens", {
    from: deployer,
    // Contract constructor arguments
    //args: ["Gnostic Tekh", "GTEKH"],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

   const a = await deploy("GnosticToken0", {
    from: deployer,
    // Contract constructor arguments
    args: ["Gnostic Token 0", "GT0"],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  await deploy("GnosticToken1", {
    from: deployer,
    
    // Contract constructor arguments
    args: ["Gnostic Token 1", "GT1"],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
    
  });

};

export default deployGnosticTekh;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags ConditionalTokens
deployGnosticTekh.tags = ["ConditionalTokens","GnosticToken0","GnosticToken1"];
