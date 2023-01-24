// Automated test for smart contracts
const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

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
  
    // it('has a name', async() => {
    //   const name = await dappazon.name()
    //   expect(name).to.equal("Dappazon")
    // })
  })

})
