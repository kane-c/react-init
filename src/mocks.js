import moxios from 'moxios';

moxios.install();

// Place your mocks here

// Default to 404 for all other requests. Should be the last mock.
moxios.stubRequest(/.*/, {
  status: 404,
});
