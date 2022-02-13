const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {

  let MegansDolls;
  let megansDolls;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    MegansDolls = await ethers.getContractFactory("MegansDolls");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    megansDolls = await MegansDolls.deploy();
    await megansDolls.deployed();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      expect(await megansDolls.owner()).to.equal(owner.address);
    });

    it("Total initial supply should be 0", async function () {
      
      expect(await megansDolls.totalSupply()).to.equal(0);
  
    });
  });

  describe("Transactions", function () {

    it("Owner mints 5 NFTs for addr1", async function () {
      await megansDolls.mintForAddress(5, addr1.address)
      
      const finalOwnerBalance = await megansDolls.balanceOf(addr1.address);
      expect(finalOwnerBalance).to.equal(5);
    });

    it("addr1 should fail minting before pause", async function () {

      await expect(megansDolls.mint(5)).to.be.revertedWith("The contract is paused!");

    });
    
    it("addr1 should mint 5 after pause set to false", async function () {
      await megansDolls.setPaused(false)
      await megansDolls.connect(addr1.address).mint(5);
      
      const finalOwnerBalance = await megansDolls.balanceOf(addr1.address);
      expect(finalOwnerBalance).to.equal(5);

    });  
    
  });

});   
