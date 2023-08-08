import { expect } from "chai";
import { ethers } from "hardhat";
import { GnosticSvg } from "../typechain-types";

describe("GnosticSvg", function () {
  // We define a fixture to reuse the same setup in every test.

  let GnosticSvg: GnosticSvg;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const GnosticSvgFactory = await ethers.getContractFactory("GnosticSvg");
    GnosticSvg = (await GnosticSvgFactory.deploy(owner.address)) as GnosticSvg;
    await GnosticSvg.deployed();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await GnosticSvg.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await GnosticSvg.setGreeting(newGreeting);
      expect(await GnosticSvg.greeting()).to.equal(newGreeting);
    });
  });
});
