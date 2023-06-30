const { expect } = require("chai");
describe("Test TutorialERC20", () => {
  let tut;
  let accounts;
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const factory = await ethers.getContractFactory("TutorialERC20");
    tut = await factory.deploy(
      "TUT",
      "Tutorial ERC20 Token",
      accounts[0].address
    );
  });

  it("Account 0 can mint token", async () => {
    const before = await tut.balanceOf(accounts[1].address);
    const response = await tut.mint(accounts[1].address, 100);
    await response.wait();

    // Assert
    const after = await tut.balanceOf(accounts[1].address);
    expect(before.add(100).toNumber()).equals(after.toNumber());
  });

  it("Account 1 cannot mint token", async () => {
    // Alternatively, use chai-as-promised instead of try..catch
    try {
      await tut.connect(accounts[1]).mint(accounts[1].address, 100);
    } catch (err) {
      expect(err.toString().includes("Ownable: caller is not the owner"));
    }
  });

  it("can mint after transferOwnership", async () => {
    const before = await tut.balanceOf(accounts[1].address);
    await tut.transferOwnership(accounts[1].address);
    const response = await tut
      .connect(accounts[1])
      .mint(accounts[1].address, 100);
    await response.wait();

    //Assert
    const after = await tut.balanceOf(accounts[1].address);
    expect(before.add(100).toNumber()).equals(after.toNumber());
  });
});
