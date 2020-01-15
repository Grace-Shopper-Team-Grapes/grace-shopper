'use strict';

const db = require('../server/db');
const {User, Category} = require('../server/db/models');
const userArray = require('./User-seed');
const categoryArray = require('./Category-seed');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await Promise.all([
    User.create(userArray[0]),
    User.create(userArray[1])
  ]);
  //below is currently breaking code
  // const categories = await Promise.all([
  //   Category.create(categoryArray[0]),
  //   User.create(categoryArray[1])
  // ])

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully \n`)
  // console.log(`seeded ${categories.length} categories`)
  // console.log(`seeded successfully \n`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
