class FirstWebpackPlugin {
    apply(compiler) {
        compiler.hooks.done.tapAsync("FirstWebpackPlugin", (stats, cb) => {
            const assetNames = [];
            for (let assetName in stats.compilation.assets) {
                assetNames.push(assetName);
            }
            console.log(assetNames.join("\n"));
            cb();
        })        
    }
}

module.exports = FirstWebpackPlugin;