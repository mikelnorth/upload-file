// Returns the object returned by the canary endpoint.
const buildHealthObject = () => {
  return {
    name: process.env.npm_package_name,
    description: process.env.npm_package_description,
    pid: process.pid,
    platform: process.platform,
    version: process.env.npm_package_version,
  };
};

exports.healthGet = async (req, res) => {
  res.status(200).send(buildHealthObject());
};
