const actualProcess = jest.requireActual('process');

module.exports = {
  env: { ...actualProcess.env },
  exit: jest.fn(),
};
