import { expect } from "chai";
import { ethers } from "hardhat";
import { YourGnosticContract } from "../typechain-types";

describe("YourGnosticContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let YourGnosticContract: YourGnosticContract;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const YourGnosticContractFactory = await ethers.getContractFactory("YourGnosticContract");
    YourGnosticContract = (await YourGnosticContractFactory.deploy(owner.address)) as YourGnosticContract;
    await YourGnosticContract.deployed();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await YourGnosticContract.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await YourGnosticContract.setGreeting(newGreeting);
      expect(await YourGnosticContract.greeting()).to.equal(newGreeting);
    });
  });
});
