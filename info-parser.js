const { getListingData } = require('./scraper');

const amenitiesSectionId = 'AMENITIES_DEFAULT';
const overviewSectionId = 'OVERVIEW_DEFAULT';

const getListingTitle = (metadata) => {
  return metadata.sharingConfig.title;
};

const getPropertyType = (metadata) => {
  return metadata.sharingConfig.propertyType;
};

// Extract number from string eg '2 bedrooms' => 2
const extractNumberOfRooms = (items, roomName) => {
  const { title } = items.find(item => item.title.includes(roomName));
  return parseInt(title);
};

const getAmenities = (sections) => {
  const amenitiesSection = sections.find(section => section.sectionId === amenitiesSectionId);
  const amenityGroups = amenitiesSection.section.seeAllAmenitiesGroups;
  const amenityObjects = amenityGroups.filter(group => group.title !== 'Not included').map(group => group.amenities);
  const flattenedAmenityObjects = [].concat(...amenityObjects);
  return flattenedAmenityObjects.map(amenity => amenity.title);
};

const getRoomCounts = (sections) => {
  const overviewSection = sections.find(section => section.sectionId === overviewSectionId);
  const detailItems = overviewSection.section.detailItems;
  const numberOfBedrooms = extractNumberOfRooms(detailItems, 'bedroom');
  const numberOfBathrooms = extractNumberOfRooms(detailItems, 'bathroom');
  return { numberOfBedrooms, numberOfBathrooms };
};

const getListingInfo = async (listingId) => {
  const data = await getListingData(listingId);
  const root = data.niobeMinimalClientData[0][1];
  if (root.error) {
    return { error: `could not get details for listing ID ${listingId}` };
  }
  const sections = root.data.presentation.stayProductDetailPage.sections.sections;
  const metadata = root.data.presentation.stayProductDetailPage.sections.metadata;
  const name = getListingTitle(metadata);
  const type = getPropertyType(metadata);
  const amenities = getAmenities(sections);
  const roomCounts = getRoomCounts(sections);
  return { name, type, amenities, ...roomCounts };
};

module.exports = {
  getListingInfo,
};