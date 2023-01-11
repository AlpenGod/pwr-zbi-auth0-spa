const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./src/auth_config.json");
const jwtAuthz = require("express-jwt-authz");

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `https://localhost:${appPort}`;

if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

const checkZespol = jwtAuthz(["read:zespol"], {
  customScopeKey: "permissions"
});

const checkZadania = jwtAuthz(["read:zadania"], {
  customScopeKey: "permissions"
});

const checkAdmin = jwtAuthz(["read:zadania", "read:zespol"], {
  customScopeKey: "permissions",
  checkAllScopes: true
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Jestes zalogowanym uzytkownikiem.",
  });
});

app.get("/api/zespol", checkJwt, checkZespol, (req, res) => {
  res.send({
    msg: "Wiola Jaworska, Dominik Blaszczyk"
  });
});

app.get("/api/zadania", checkJwt, checkZadania, (req, res) => {
  res.send({
    msg: "Projekt z zarządzania bezpieczeństwem informacji"
  });
});

app.get("/api/admin", checkJwt, checkAdmin, (req, res) => {
  res.send({
    msg: "Hello root!"
  });
});

app.get("/api/public", (req, res) => {
  res.send({
    msg: "To jest publiczny endpoint."
  });
});

app.listen(port, () => console.log(`API nasluchuje na porcie: ${port}`));
