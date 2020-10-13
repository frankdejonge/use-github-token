import * as core from '@actions/core';
import { exec } from '@actions/exec';
import { promises as fs } from 'fs';
import * as process from 'process';
import * as os from 'os';

(async () => {
    const token = core.getInput('token', { required: true });
    const credentials = `https://${token}@github.com/`;
    const userName = core.getInput('user_name', { required: false }) || '';
    const userEmail = core.getInput('user_email', { required: false }) || '';

    let configDir = process.env['XDG_CONFIG_HOME'] || `${os.homedir()}/.config`;
    let gitConfigDir = `${configDir}/git`;
    let gitCredentialsFile = `${configDir}/git/credentials`;

    await fs.mkdir(gitConfigDir, { recursive: true });
    await fs.writeFile(gitCredentialsFile, credentials, { flag: 'a', mode: 0o600 });

    if (userName.length > 0) {
        await exec('git', ['config', '--global', 'user.name', userName]);
    }

    if (userEmail.length > 0) {
        await exec('git', ['config', '--global', 'user.email', userEmail]);
    }

    await exec('git', ['config', '--global', 'credential.helper', 'store']);
    await exec('git', ['config', '--global', '--replace-all', 'url.https://github.com/.insteadOf', 'ssh://git@github.com/']);
    await exec('git', ['config', '--global', '--add', 'url.https://github.com/.insteadOf', 'git@github.com:']);
})().catch(error => {
    core.setFailed(error.message);
});
