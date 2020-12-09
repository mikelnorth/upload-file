const { healthGet } = require('./health.controller');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('Health check', () => {
  beforeAll(() => {
    process.env.npm_package_description = 'test description';
    process.env.npm_package_name = 'test name';
    process.env.npm_package_version = 'test version';
  });

  test('Builds the correct object', () => {
    const res = mockResponse();
    healthGet({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toBeCalledWith(
      expect.objectContaining({
        name: expect.any(String),
        description: expect.any(String),
        pid: expect.any(Number),
        platform: expect.any(String),
        version: expect.any(String),
      }),
    );
  });
});
