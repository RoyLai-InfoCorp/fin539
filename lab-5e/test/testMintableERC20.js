const { expect } = require("chai");
describe("Test MintableERC20", () => {
  let m20;
  let accounts;
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const factory = await ethers.getContractFactory("MintableERC20");
    m20 = await factory.deploy("m20", "m20");
  });

  it("Should mint 100 units of m20 with 10000 wei of ETH", async () => {
    const before = await m20.balanceOf(accounts[1].address);

    const response = await m20.mint(accounts[1].address, 100);
    await response.wait();

    // Assert
    const after = await m20.balanceOf(accounts[1].address);
    expect(before.add(100).toNumber()).equals(after.toNumber());
  });
});
