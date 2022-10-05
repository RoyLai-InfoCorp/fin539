const { expect } = require("chai");
describe("Test Crowdsale", () => {
  let accounts;
  let crowdsale;
  let tut;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    let factory = await ethers.getContractFactory("TutorialERC20");
    tut = await factory.deploy("TUT", "TUT", accounts[0].address);
    factory = await ethers.getContractFactory("Crowdsale");
    crowdsale = await factory.deploy(tut.address, 100);
    tut.transferOwnership(crowdsale.address);
  });

  it("Should sell 100 unit of TUT", async () => {
    const before = await tut.balanceOf(accounts[1].address);
    const response = await crowdsale
      .connect(accounts[1])
      .buy(100, { value: 10000 });
    await response.wait();
    // Assert
    const after = await tut.balanceOf(accounts[1].address);
    expect(before.add(100).toNumber()).equals(after.toNumber());
  });
});
