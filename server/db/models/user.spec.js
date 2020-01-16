/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody;

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'cody',
          lastName: 'cafe',
          email: 'cody@puppybook.com',
          phone: '1234567890',
          street1: '123 Street',
          city: 'This-City',
          state: 'This-State',
          zip: '54321',
          password: 'bones'
        });
      });

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('User model')
