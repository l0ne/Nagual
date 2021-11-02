import Airtable from 'airtable';
import { AIRTABLE_API_KEY, AIRTABLE_API_URL, AIRTABLE_DB } from '../../env';
import {DICTIONARY} from '../../dict';

Airtable.configure({
  endpointUrl: AIRTABLE_API_URL,
  apiKey: AIRTABLE_API_KEY,
});

export const database = Airtable.base(AIRTABLE_DB);

export const countQuotes = () => {
  return new Promise((resolve, reject) => {
    database('Quotes')
      .select({
        fields: ['Id'],
        maxRecords: 1,
        sort: [{field: 'Id', direction: 'desc'}],
      })
      .eachPage(
        records => {
          console.log(records);
          resolve(records[0].fields.Id);
        },
        err => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
        },
      );
  });
};

export const getQuoteById = id => {
  return new Promise((resolve, reject) => {
    database('Quotes')
      .select({
        maxRecords: 1,
        filterByFormula: 'Id = ' + id,
      })
      .eachPage(
        records => {
          if (records.length == 0) {
            resolve({
              Quote: DICTIONARY.Nagual,
            });
          }

          resolve(records[0].fields);
        },
        err => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
        },
      );
  });
};

export const getQuotesList = filter => {
  return new Promise((resolve, reject) => {
    database('Quotes')
      .select({
        // Selecting the first 3 records in Grid view:
        view: 'Grid view',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          resolve(records);
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
          }
        },
      );
  });
};

export const getAuthorList = filter => {
  return new Promise((resolve, reject) => {
    database('Authors')
      .select({
        maxRecords: 10,
        filterByFormula: `SEARCH("${filter}", {Name})`,
      })
      .eachPage(
        records => {
          console.log(records);
          resolve(records);
        },
        err => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
        },
      );
  });
};

export const getBookList = filter => {
  return new Promise((resolve, reject) => {
    database('Books')
      .select({
        maxRecords: 10,
        filterByFormula: `SEARCH("${filter}", {Name})`,
      })
      .eachPage(
        records => {
          console.log(records);
          resolve(records);
        },
        err => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
        },
      );
  });
};

export const createAuthor = text => {
  return new Promise((resolve, reject) => {
    database('Authors').create(
      [
        {
          fields: {
            Name: text,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        console.log(records[0]);
        resolve(records[0]);
      },
    );
  });
};

export const createBook = text => {
  return new Promise((resolve, reject) => {
    database('Books').create(
      [
        {
          fields: {
            Name: text,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        console.log(records[0]);
        resolve(records[0]);
      },
    );
  });
};

export const getDevice = deviceId => {
  return new Promise((resolve, reject) => {
    database('Devices')
      .select({
        maxRecords: 1,
        filterByFormula: `DeviceId = '${deviceId}'`,
      })
      .eachPage(
        records => {
          console.log(records);

          if (records.length == 0) {
            resolve(undefined);
          }

          resolve(records[0].fields);
        },
        err => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
        },
      );
  });
};

export const registerDevice = (deviceId, deviceName, userId) => {
  return new Promise((resolve, reject) => {
    database('Devices').create(
      [
        {
          fields: {
            DeviceId: deviceId,
            DeviceName: deviceName,
            Users: [userId],
          },
        },
      ],
      (err, records) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log(records);
        resolve(records[0].fields);
      },
    );
  });
};

export const getUser = userId => {
  return new Promise((resolve, reject) => {
    database('Users').find(userId, (err, record) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      console.log('Retrieved', record.id);
      resolve(record.id);
    });
  });
};

export const createUser = () => {
  return new Promise((resolve, reject) => {
    database('Users').create(
      [
        {
          fields: {
            Name: 'I am a robot',
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(records[0]);
      },
    );
  });
};

export const createQuote = (quote, authorId, bookId, userId) => {
  return new Promise((resolve, reject) => {
    const data = {
      Quote: quote,
      User: [userId],
    };

    if (authorId) {
      data.Author = [authorId];
    }

    if (bookId) {
      data.Book = [bookId];
    }

    database('Quotes').create([{fields: data}], (err, records) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      records.forEach(function (record) {
        console.log(record.getId());
        resolve(record);
      });
    });
  });
};
