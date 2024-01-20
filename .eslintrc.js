process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            plugins: [
                '@babel/plugin-syntax-jsx'
            ],
        },
    },
    // other options...
};