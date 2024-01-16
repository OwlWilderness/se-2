//import { expect } from "chai";
import { ethers } from "hardhat";
import { ScribeCast } from "../typechain-types";

describe("ScribeCast", function () {
  // We define a fixture to reuse the same setup in every test.

  let scribecast: ScribeCast;
  before(async () => {
    const scribecastFactory = await ethers.getContractFactory("ScribeCast");
    scribecast = (await scribecastFactory.deploy()) as ScribeCast;
    await scribecast.deployed();
  });
});
