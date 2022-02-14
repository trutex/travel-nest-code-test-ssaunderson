const { getListingInfo } = require('./info-parser');

const listingIds = [
  '33571268',
  '20669368',
  '50633275',
];

for (const listingId of listingIds) {
  getListingInfo(listingId)
    .then((info) => console.log(`got listing ID ${listingId} - ${JSON.stringify(info)}`))
    .catch(err => console.log(err.message));
}