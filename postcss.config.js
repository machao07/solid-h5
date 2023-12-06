module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 39.5,
            propList: ['*'],
            mediaQuery: true,
            selectorBlackList: ['.norem'] 
        }
    }
}