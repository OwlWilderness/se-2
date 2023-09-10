import { expect } from "chai";
import { ethers } from "hardhat";
import { HelloUniverse } from "../typechain-types";

describe("HelloUniverse", function () {
  // We define a fixture to reuse the same setup in every test.

  let helloUniverse: HelloUniverse;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const yourContractFactory = await ethers.getContractFactory("HelloUniverse");
    helloUniverse = (await yourContractFactory.deploy(owner.address)) as HelloUniverse;
    await helloUniverse.deployed();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await helloUniverse.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await helloUniverse.setGreeting(newGreeting);
      expect(await helloUniverse.greeting()).to.equal(newGreeting);
    });
  });
});
