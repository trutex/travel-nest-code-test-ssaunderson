const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const baseUrl = 'https://www.airbnb.co.uk/rooms';
const requestOptions = {
  headers: { 'user-agent': 'node.js' },
};

const getListingData = async (listingId) => {
  const fullUrl = `${baseUrl}/${listingId}`;
  const source = await requestPromise.get(fullUrl, requestOptions);
  const $ = cheerio.load(source);
  const listingData = $('script[id="data-deferred-state"]').first().contents();

  return JSON.parse(listingData);
};

module.exports = {
  getListingData,
};