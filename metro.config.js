const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
    resolver: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json', 'd.ts'],
        unstable_enablePackageExports: true,
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
