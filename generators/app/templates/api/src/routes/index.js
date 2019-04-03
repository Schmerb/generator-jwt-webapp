import { router as authRouter } from "auth/router";
import { router as usersRouter } from "./usersRouter";

const authenticate = require("services/authenticate").authenticate();

export const routes = app => {
  app.use("/api/auth/", authRouter);
  app.use(["/api/users/", "/api/users/me"], usersRouter);
  app.get("/", (req, res) => {
    res.send("YOOO");
  });
  // A protected endpoint which needs a valid JWT to access it
  app.get("/api/protected", authenticate, (req, res) => {
    return res.json({
      data: "rosebud"
    });
  });
};

export default routes;
