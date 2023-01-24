// Automated test for smart contracts
const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappazon", () => {

  it('has a name', async() => {
    const Dappazon = await ethers.getContractFactory("Dappazon")
    dappazon = await Dappazon.deploy()
    const name = await dappazon.name()
    expect(name).to.equal("Dappazon")
  })

})
