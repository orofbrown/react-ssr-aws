const { execSync } = require('child_process');

function getCommitHash() {
  const hash = execSync('git rev-parse HEAD').toString().trim();
  return `"${hash}"`;
}

module.exports = {
  getCommitHash,
};
