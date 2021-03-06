test(`ensures dist-tag is specified for prerelease versions`, () => {
  jest.mock('console');
  jest.mock('process');

  const console = require('console');
  const process = require('process');
  const proofread = require('../proofread');

  process.env.npm_package_version = '1.0.0-beta.0';
  process.env.npm_config_tag = 'next';
  expect(proofread._validateDistTag()).toBe(true);
  expect(console.error).not.toHaveBeenCalled();
});

test(`allows the "latest" dist-tag if it's explicitly specified`, () => {
  jest.mock('console');
  jest.mock('process');

  const console = require('console');
  const process = require('process');
  const proofread = require('../proofread');

  process.env.npm_package_version = '1.0.0-beta.0';
  process.env.npm_config_tag = 'latest';
  expect(proofread._validateDistTag()).toBe(true);
  expect(console.error).not.toHaveBeenCalled();
});

test(`warns if dist-tag isn't specified for prerelease versions`, () => {
  jest.mock('console');
  jest.mock('process');

  const console = require('console');
  const process = require('process');
  const proofread = require('../proofread');

  process.env.npm_package_version = '1.0.0-beta.0';
  process.env.npm_config_tag = '';
  expect(proofread._validateDistTag()).toBe(false);
  expect(console.error).toHaveBeenCalled();
});

test(`does not require tag for non-prerelease versions`, () => {
  jest.mock('console');
  jest.mock('process');

  const console = require('console');
  const process = require('process');
  const proofread = require('../proofread');

  process.env.npm_package_version = '1.0.0';
  process.env.npm_config_tag = '';
  expect(proofread._validateDistTag()).toBe(true);
  expect(console.error).not.toHaveBeenCalled();
});

test(`exits with code 0 when there is no error`, () => {
  jest.mock('console');
  jest.mock('process');

  const process = require('process');
  const proofread = require('../proofread');

  process.env.npm_package_version = '1.0.0-beta.0';
  process.env.npm_config_tag = 'next';
  proofread._proofread();
  expect(process.exit).toHaveBeenCalledWith(0);
});

test(`exits with code 1 on validation error`, () => {
  jest.mock('console');
  jest.mock('process');

  const process = require('process');
  const proofread = require('../proofread');

  process.env.npm_package_version = '1.0.0-beta.0';
  process.env.npm_config_tag = '';
  proofread._proofread();
  expect(process.exit).toHaveBeenCalledWith(1);
});
