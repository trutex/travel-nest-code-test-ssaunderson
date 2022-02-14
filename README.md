# Travel Nest code test submission - Stuart Saunderson

## Installing and running

To install the project dependencies run the following from the command line:

```
npm install
```

To run the project run the following from the command line:

```
npm start
```

## Extra 

Given more time, I would have done extra work:

* added unit tests around the 'info parser' functions - e.g. given a specified input JSON data object, test that the expected property name was extracted, etc.

* made the info parseer logic more fault tolerant (e.g. for when required JSON properties were missing or were in an unexpected format) - after establishing what the desired behaviour was for these cases

* written it in Typescript, with appropriate types defined (e.g. the 'info object' returned by `getListingInfo`)