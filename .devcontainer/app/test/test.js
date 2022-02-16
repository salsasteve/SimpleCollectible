const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe('MegansDolls', function () {
  beforeEach(async function () {
    this.MegansDolls = await ethers.getContractFactory('MegansDolls');
    this.baseTokenURI = "ipfs://QmTFLWHBq6jvs1LX7Zg1sS8GNtmHFnTE2DSxMs2giDqPCe/"
    this.megansdolls = await this.MegansDolls.deploy(this.baseTokenURI);
    await this.megansdolls.deployed();
  });

  context('with no minted tokens', async function () {
    it('has 0 totalSupply', async function () {
      const supply = await this.megansdolls.totalSupply();
      expect(supply).to.equal(0);
    });

    it('All Constant parameters are properly set', async function () {
      expect(await this.megansdolls.price()).to.be.equal(ethers.utils.parseEther("0.04"));
      expect(await this.megansdolls.collectionSize()).to.be.equal(8888);
      expect(await this.megansdolls.reserves()).to.be.equal(100);
      expect(await this.megansdolls.maxBatchSize()).to.be.equal(5);
    });
  });

  context('with minted tokens', async function () {
    beforeEach(async function () {
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();
      this.owner = owner;
      this.addr1 = addr1;
      this.addr2 = addr2;
      this.addr3 = addr3;
      await this.megansdolls['setSaleState(uint256)'](2);


      const amount1 = ethers.utils.parseEther("0.04")
      const amount2 = ethers.utils.parseEther("0.08")
      const amount3 = ethers.utils.parseEther("0.12")
      await this.megansdolls.connect(this.addr1).publicSaleMint(1, {value: amount1});
      await this.megansdolls.connect(this.addr2).publicSaleMint(2, {value: amount2});
      await this.megansdolls.connect(this.addr3).publicSaleMint(3, {value: amount3});
    });
    

  describe('Exists', async function () {
    it('verifies valid tokens', async function () {
      for (let tokenId = 0; tokenId < 6; tokenId++) {
        const exists = await this.megansdolls.exists(tokenId);
        expect(exists).to.be.true;
      }
    });

    it("verifies invalid tokens", async function () {
      const exists = await this.megansdolls.exists(6);
      expect(exists).to.be.false;
    });

    it("verifies tokens URI's", async function () {
      for (let tokenId = 0; tokenId < 6; tokenId++) {
        const tokenURI = await this.megansdolls.tokenURI(tokenId)
        expect(tokenURI).to.be.equal(this.baseTokenURI + tokenId.toString());
      }
    });

  });

  });
});