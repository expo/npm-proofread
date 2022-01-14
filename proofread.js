#!/usr/bin/env node
'use strict';

const console = require('console');
const process = require('process');
const semver = require('semver');

function validateDistTag() {
  const packageVersion = process.env.npm_package_version;
  const isPrerelease = !!semver.prerelease(packageVersion);
  if (!isPrerelease) {
    return true;
  }

  const explicitDistTag = process.env.npm_config_tag;
  if (!explicitDistTag) {
    console.error(
      `You must specify --tag explicitly when publishing a prerelease version (${packageVersion}).`
    );
    return false;
  }

  return true;
}

function proofread() {
  const isValid = validateDistTag();
  process.exit(isValid ? 0 : 1);
}

exports._validateDistTag = validateDistTag;
exports._proofread = proofread;

if (require.main === module) {
  proofread();
}
