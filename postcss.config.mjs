const config = {
  plugins: {
    "@tailwindcss/postcss": {
      theme: {
        container: {
          center: true,
        },
        extend: {
          colors: {
            customgreen: "#49e659",
          },
        },
      },
    },
  },
};

export default config;
