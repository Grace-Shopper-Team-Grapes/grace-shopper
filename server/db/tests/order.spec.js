/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../index');
const Order = db.model('order');

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('isPurchased', () => {
    let order1;
    let order2;

    beforeEach(async () => {
      order1 = await Order.create({
        grandTotal: 5000
      });
      order2 = await Order.create({
        grandTotal: 7999,
        isPurchased: true,
        isShipped: true
      });
    });

    it('returns false if isPurchased is not specified', () => {
      expect(order1.isPurchased).to.be.equal(false);
    });

    it('returns the boolean value of isPurchased if it is specified', () => {
      expect(order2.isPurchased).to.be.equal(true);
    });
  });

  describe('isShipped', () => {
    let order1;
    let order2;

    beforeEach(async () => {
      order1 = await Order.create({
        grandTotal: 5000
      });
      order2 = await Order.create({
        grandTotal: 7999,
        isPurchased: true,
        isShipped: false
      });
    });

    it('returns false if isShipped is not specified', () => {
      expect(order1.isShipped).to.be.equal(false);
    });

    it('returns the boolean value of isShipped if it is specified', () => {
      expect(order2.isShipped).to.be.equal(false);
    });
  });
});
