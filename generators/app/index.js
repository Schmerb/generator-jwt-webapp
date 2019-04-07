"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option("babel"); // This method adds support for a `--babel` flag

    this.argument("appname", { type: String, required: false });
  }

  // 1)
  initializing() {
    this.log(`${chalk.red("initializing!")}`);
  }

  // 2)
  async prompting() {
    this.log(`${chalk.blue("prompting!")}`);
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the primo ${chalk.red("generator-jwt-webapp")} generator!`
      )
    );

    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.options.appname // Defaults to optional argument
      },
      {
        type: "input",
        name: "client",
        message: "Your React Client project name",
        default: "client"
      },
      {
        type: "input",
        name: "api",
        message: "Your Node API project name",
        default: "api"
      },
      {
        type: "input",
        name: "port",
        message: `Port server will run on`,
        default: "8080"
      },
      {
        type: "input",
        name: "databaseURI",
        message:
          "Your project's PRODUCTION MongoDB instance URI (If you have one)",
        default: "mongodb://localhost/CREATE-ME-db"
      },
      {
        type: "input",
        name: "testDatabaseURI",
        message: "Your project's TEST MongoDB instance URI (If you have one)",
        default: "mongodb://localhost/test-db"
      },
      {
        type: "input",
        name: "jwtSecret",
        message: 'Provide string to use as JWT "secret"',
        default: "secret"
      },
      {
        type: "input",
        name: "jwtExpiray",
        message: `Provide a valid JWT expiration duration`,
        default: "7d"
      },
      {
        type: "confirm",
        name: "srcAsRoot",
        message: "Would you like to use /src directory as project root?",
        default: true
      }
    ]);
    this.log("Project name: ", this.answers.name);
    this.log("API name: ", this.answers.api);
    this.log("Client name: ", this.answers.client);
    this.log("Using /src as project root!: ", this.answers.srcAsRoot);
  }

  // 3)
  configuring() {
    this.log(`${chalk.yellow("configuring!")}`);
  }

  // // // // // // // // // // // // // // //
  // Default -- custom methods run here
  // 4)
  method1() {
    this.log("method 1 just ran");
    // eslint-disable-next-line
    // TODO: make MongoDB table and create a user
  }

  method2() {
    this.log("method 2 just ran");
  }
  //
  // // // // // // // // // // // // // // //

  // 5)
  writing() {
    this.log(`${chalk.green("writing!")}`);

    const { srcAsRoot, api, client } = this.answers;

    if (srcAsRoot) {
      this.log(`${chalk.green("Using /src directory as project root!!")}`);
      this.fs.copy(this.templatePath("api"), this.destinationPath("api"));
      this.fs.copy(this.templatePath("client"), this.destinationPath("client"));
    }

    // Project Root files

    // API

    this.fs.copyTpl(
      this.templatePath("api/_package.json"),
      this.destinationPath("api/package.json"),
      {
        name: api
      }
    );

    this.fs.copy(
      this.templatePath("api/_.babelrc"),
      this.destinationPath("api/.babelrc")
    );
    this.fs.copy(
      this.templatePath("api/_.gitignore"),
      this.destinationPath("api/.gitignore")
    );
    this.fs.copy(
      this.templatePath("api/_README.md"),
      this.destinationPath("api/README.md")
    );
    this.fs.copy(
      this.templatePath("api/_.env"),
      this.destinationPath("api/.env")
    );

    // CLIENT

    this.fs.copyTpl(
      this.templatePath("client/_package.json"),
      this.destinationPath("client/package.json"),
      {
        name: client,
        nextPath: srcAsRoot ? "./src" : "./"
      }
    );

    this.fs.copy(
      this.templatePath("client/_.babelrc"),
      this.destinationPath("client/.babelrc")
    );
    this.fs.copy(
      this.templatePath("client/_.prettierrc"),
      this.destinationPath("client/.prettierrc")
    );
    this.fs.copy(
      this.templatePath("client/_.eslintrc"),
      this.destinationPath("client/.eslintrc")
    );
    this.fs.copy(
      this.templatePath("client/_.gitignore"),
      this.destinationPath("client/.gitignore")
    );
    this.fs.copy(
      this.templatePath("client/_README.md"),
      this.destinationPath("client/README.md")
    );
  }

  // 6)
  conflicts() {
    this.log(`${chalk.red("Checking for confilcts!")}`);
  }

  // 7)
  install() {
    this.log(`${chalk.green("process.cwd():", process.cwd())}`);

    this.log(`${chalk.green("installing API dependencies!")}`);
    // Dev Dependencies
    this.npmInstall(
      ["gulp", "nodemon", "@babel/core", "@babel/node", "@babel/preset-env"],
      {
        "save-dev": true
      },
      { cwd: "api" }
    );
    // Dependencies
    this.npmInstall(
      [
        "bcryptjs",
        "body-parser",
        "busboy-body-parser",
        "cors",
        "dotenv",
        "express",
        "express-jwt",
        "mongoose",
        "morgan",
        "passport",
        "passport-http",
        "passport-jwt"
      ],
      {
        "save-dev": false
      },
      { cwd: "api" }
    );

    this.log(`${chalk.green("installing Client dependencies!")}`);
    // Dependencies
    this.npmInstall(
      [
        "@zeit/next-css",
        "better-react-spinkit",
        "color",
        "dotenv",
        "dotenv-webpack",
        "es6-promise",
        "fetch-everywhere",
        "formik",
        "jwt-decode",
        "lodash.capitalize",
        "lodash.keyby",
        "lodash.map",
        "next",
        "next-images",
        "path",
        "prop-types",
        "react",
        "react-dom",
        "react-redux",
        "redux",
        "redux-logger",
        "redux-thunk",
        "styled-components",
        "universal-cookie",
        "uuid"
      ],
      {
        "save-dev": false
      },
      { cwd: "client" }
    );

    // Dev Dependencies
    this.npmInstall(
      [
        "babel-eslint",
        "babel-plugin-module-resolver",
        "eslint",
        "eslint-config-airbnb",
        "eslint-plugin-import",
        "eslint-plugin-jsx-a11y",
        "eslint-plugin-react"
      ],
      {
        "save-dev": true
      },
      { cwd: "client" }
    );
  }

  // 8)
  end() {
    this.log(yosay(`${chalk.green("ALL DONE SON!")}`));
    this.log(
      `${chalk.green(`Starting ${this.answers.name}..`)}${chalk.blue(
        ".."
      )}${chalk.red("..")}${chalk.yellow("..")}${chalk.green("..")}`
    );
    this.spawnCommand("osascript", [
      "-e",
      `'tell application "Terminal" to activate'`,
      "-e",
      `'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'`
    ]);
    this.spawnCommand("npm", ["start"], { cwd: "api" });
    // eslint-disable-next-line
    // this.spawnCommand("npm", ["run", "dev"], { cwd: "client" });
  }
};
