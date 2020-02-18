module.exports = {
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("autoprefixer")({}),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("postcss-px2rem")({
      remUnit: 75
    })
  ]
};
