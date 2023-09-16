import { expect } from "chai";
import { ethers } from "hardhat";
import { GnosticMercury } from "../typechain-types";

describe("GnosticMercury", function () {
  // We define a fixture to reuse the same setup in every test.

  let gnosticMercury: GnosticMercury;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const gnosticMercuryFactory = await ethers.getContractFactory("GnosticMercury");
    gnosticMercury = (await gnosticMercuryFactory.deploy(owner.address)) as GnosticMercury;
    await gnosticMercury.deployed();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await gnosticMercury.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await gnosticMercury.setGreeting(newGreeting);
      expect(await gnosticMercury.greeting()).to.equal(newGreeting);
    });
  });
});
