var path = require('path')

const { override, babelInclude } = require('customize-cra')

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve('src'),
        path.resolve('../packages/ui'),
        path.resolve('../packages/ui/src'),
        path.resolve('../packages/ui/dist'),
        path.resolve('node_modules/@solera/ui'),
        path.resolve('node_modules/@solera/ui/dist'),
      ])
    )(config, env)
  )
}
