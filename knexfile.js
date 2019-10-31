const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  development: {
    connection: {
      database: "nc_news",
      host: "docker-mysql",
      port: "",
      user: "admin",
      password: "admin"
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      user: "admin",
      password: "admin"
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
