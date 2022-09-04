const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        database_user: "kheem",
        database_password: "kheem",
        database_cluster: "cluster0",
        database_name: "my-site-test-dev",
      },
    };
  }

  return {
    env: {
      database_user: "kheem",
      database_password: "kheem",
      database_cluster: "cluster0",
      database_name: "my-site-test",
    },
  };
};
