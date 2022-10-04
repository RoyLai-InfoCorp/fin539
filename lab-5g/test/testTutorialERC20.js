const { expect } = require("chai");
describe("Test TutorialERC20", () => {
  let tut;
  let accounts;
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const factory = await ethers.getContractFactory("TutorialERC20_2");
    tut = await factory.deploy(
      "TUT",
      "Tutorial ERC20 Token",
      accounts[0].address
    );
  });

  it("Should call name() and get TUT", async () => {
    let name = await tut.name();
    expect(name).to.equals("TUT");
  });

  it("Account 0 can mint token", async () => {
    const before = await tut.balanceOf(accounts[1].address);
    const response = await tut.mint(accounts[1].address, 100);
    await response.wait();

    // Assert
    const after = await tut.balanceOf(accounts[1].address);
    expect(before.add(100).toNumber()).equals(after.toNumber());
  });

  it("Should mint and transfer 1 TUT from accounts[0] to accounts[1]", async () => {
    const before = await tut.balanceOf(accounts[1].address);
    let response = await tut.mint(accounts[0].address, 100);
    await response.wait();

    // Transfer
    response = await tut.transfer(accounts[1].address, 1);
    const receipt = await response.wait();
    console.log("transfer: gasUsed=", receipt.gasUsed);

    // Assert
    const after = await tut.balanceOf(accounts[1].address);
    console.log("AFTER:", after);

    // ASSERT: transferred amount is correct
    expect(before.add(1).toNumber()).equals(after.toNumber());

    // ASSERT: Transfer event is received
    const transfer = receipt.events.find((x) => x.event === "Transfer");
    expect(transfer.args.from).to.equals(accounts[0].address);
    expect(transfer.args.to).to.equals(accounts[1].address);
    expect(transfer.args.value.toNumber()).to.equals(1);
  });

  it("Should mint, approve and transferFrom 1 TUT from accounts[0] to accounts[1]", async () => {
    const before = await tut.balanceOf(accounts[1].address);
    let response = await tut.mint(accounts[0].address, 100);
    await response.wait();

    // Approve and TransferFrom
    response = await tut.approve(accounts[1].address, 1);
    let receipt = await response.wait();
    console.log("approve: gasUsed=", receipt.gasUsed);

    response = await tut
      .connect(accounts[1])
      .transferFrom(accounts[0].address, accounts[1].address, 1);

    receipt = await response.wait();
    console.log("transferFrom: gasUsed=", receipt.gasUsed);

    // Assert
    const after = await tut.balanceOf(accounts[1].address);
    expect(before.add(1).toNumber()).equals(after.toNumber());

    // ASSERT: Transfer event is received
    const transfer = receipt.events.find((x) => x.event === "Transfer");
    expect(transfer.args.from).to.equals(accounts[0].address);
    expect(transfer.args.to).to.equals(accounts[1].address);
    expect(transfer.args.value.toNumber()).to.equals(1);
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
