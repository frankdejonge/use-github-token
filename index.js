const core = require('@actions/core');

try {
    const token = core.getInput('token');
    console.log(`Token: ${token}!`);
} catch (error) {
    core.setFailed(error.message);
}
