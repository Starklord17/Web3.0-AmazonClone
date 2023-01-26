// Automated test for smart contracts
const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

// Global constants for listing an item...
const ID = 1
const NAME = "Shoes"
const CATEGORY = "Clothing"
const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg"
const COST = tokens(1)
const RATING = 4
const STOCK = 5

describe("Dappazon", () => {
  let dappazon
  let deployer, buyer

  beforeEach(async () => {
    // Setup Accounts
    [deployer, buyer] = await ethers.getSigners()
    // console.log(deployer.address, buyer.address);

    // Deploy contract
    const Dappazon = await ethers.getContractFactory("Dappazon")
    dappazon = await Dappazon.deploy()
  })

  describe("Deployment", () => {
    it("Sets the owner", async () => {
      expect(await dappazon.owner()).to.equal(deployer.address)
    })
  })

    describe("Listing", () => {
    let transaction

    beforeEach(async () => {
      transaction = await dappazon.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )

      await transaction.wait()
    })

    it("Returns item attributes", async () => {
      const item = await dappazon.items(ID)
      
      expect(item.id).to.equal(ID)
      expect(item.name).to.equal(NAME)
      expect(item.category).to.equal(CATEGORY)
      expect(item.image).to.equal(IMAGE)
      expect(item.cost).to.equal(COST)
      expect(item.rating).to.equal(RATING)
      expect(item.stock).to.equal(STOCK)
    })

    it("Emits List event", () => {
      expect(transaction).to.emit(dappazon, "List")
    })

  })

    describe("Listing", () => {
      let transaction

      beforeEach(async () => {
        // List an item
        transaction = await dappazon.connect(deployer).list( ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
        await transaction.wait()

        // Buy an item
        transaction = await dappazon.connect(buyer).buy(ID, { value: COST })

      })

      it("Updates the contract balance", async () => {
        const result = await ethers.provider.getBalance(dappazon.address)
        // console.log(result);
        expect(result).to.equal(COST)
      })

      it("Updates buyer's order count", async () => {
        const result = await dappazon.orderCount(buyer.address)
        expect(result).to.equal(1)
      })
  
  })

})
