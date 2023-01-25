// Automated test for smart contracts
const { expect } = require("chai");

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
      })
  
    // it('has a name', async() => {
    //   const name = await dappazon.name()
    //   expect(name).to.equal("Dappazon")
    // })
  })

})
