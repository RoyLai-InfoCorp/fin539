const { expect } = require("chai");
describe("Test ERC20", () => {
  let erc20;
  let accounts;
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const factory = await ethers.getContractFactory("ERC20");
    erc20 = await factory.deploy(
      "ERC20",
      "ERC20",
      ethers.utils.parseUnits("1000", "ether"),
      accounts[0].address
    );
  });

  it("Should call name() and get ERC20", async () => {
    let name = await erc20.name();
    expect(name).to.equals("ERC20");
  });
});
