const { assert } = require("chai");

const Shop = artifacts.require("Shop");

contract("Shop", (accounts) => {
  before(async () => {
    this.shop = await Shop.deployed();
  });

  it("deploy successfully", async () => {
    const shop = await this.shop;
    assert.notEqual(shop, 0x0);
    assert.notEqual(shop, "");
    assert.notEqual(shop, null);
    assert.notEqual(shop, undefined);
  });

  it("add products", async () => {
    
    const idProduct = accounts[0];

    // add product
    const addProduct = await this.shop.addProduct(
      "product1",
      "_imgPath",
      100,
      10,
      idProduct,
      1369944360000
    );

    assert.isNotNull(
      addProduct.transactionHash,
      true
    );

  });

  it("get product", async () => {
    const idProduct = accounts[0];
    const product = await this.shop.getProduct(idProduct);
    assert.isNotNull(product, true);
  });

  it("buy product", async () => {

    const idProduct = accounts[0];
    const product = await this.shop.buyProduct(idProduct, 1369944360000);
    const getProduct = await this.shop.getProduct(idProduct);

    const { receipt: productReceipt } = product;

    assert.isNotNull(productReceipt.transactionHash, true);

    const arr = [];

    for (const key in getProduct) {
      arr.push(getProduct[key]);
    }

    assert.strictEqual(arr[2].toNumber(), 9);

  });

});
