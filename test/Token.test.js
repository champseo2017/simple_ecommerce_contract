const { assert } = require("chai");

const Token = artifacts.require('./Token.sol');

contract('Token', (accounts) => {

  before(async () => {
    this.token = await Token.deployed();
  })

  it('deploy successfully', async () => {

    const address = await this.token.address;
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)

  })

  it('check balanceOf', async () => {

    const numberBalanceOf = 950000

    const balanceOf = await this.token.balanceOf('0xB8b05AFa1695C73fdDbF5e2e20525BeD91Ed56dd')
    assert.equal(balanceOf, numberBalanceOf);

    
  })

  it('Transfer token', async () => {

    const coinbase = accounts[0]
    const accountsTransfer = accounts[1]
    const value = 5000;
    const resTransfer = await this.token.transfer(coinbase, 
      accountsTransfer, value)

    const { receipt } = resTransfer

    assert.isNotNull(receipt.transactionHash, '0xba0d5c169edc17bb0cb784ab5a0d965e8f60cfe06271443a3bb411ff9976aa0a');

  })
  
})