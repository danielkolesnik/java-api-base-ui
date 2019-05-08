
# React with Bootstrap 4

## dummy for admin application with connected packages
- [React](https://reactjs.org)
- [Axios](https://www.npmjs.com/package/axios)
- [Lodash](https://lodash.com/docs/4.17.4)
- [Moment](https://momentjs.com)
- [bootstrap](https://getbootstrap.com)
- [reactstrap](https://reactstrap.github.io)
- [react-redux](https://github.com/reactjs/react-redux)
- [react-router](https://reacttraining.com/react-router/web/example/basic)
- [redux-form](https://redux-form.com/7.2.0/)
- [react-redux-toastr](https://www.npmjs.com/package/react-redux-toastr)
- [redux-saga](https://redux-saga.js.org)
- [fortawesome](https://fontawesome.com/start)
- [animate.css](https://daneden.github.io/animate.css/)

#### Fork and run

Fork this repo.

```
> git clone git@bitbucket.org:SPerekhrest/rad-bootstrap-4.git
```
install dependencies.
```
> npm install
```
Then start the development process.
```
> npm run start
```

#### Build

Without environment configuration used the **develpment** config.

```
> npm install
> npm run build
```

#### Setup custom configuration

Flow of **react-create-app** [GUIDE](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) fully supported. To setup client side configuration simplify flow using non standard ```env``` **REACT_APP_ENV**.

#### To setup configuration without depending on build type.

##### example PRODUCTION
Defined as a production and setup in package.js
Source of configuration file in ./src/constant/production.js

```
> npm run build-prod
// the same as
> set REACT_APP_ENV=production && npm run build
```

Run locally
```
> set REACT_APP_ENV=production && npm run start
```

##### example STAGING
Source of configuration file in ./src/constant/staging.js 

```
> set REACT_APP_ENV=staging && npm run build
```

Run locally
```
> set REACT_APP_ENV=staging && npm run start
```

##### example DEVELOPMENT
Default value for configuration is development. 
Source of configuration file in ./src/constant/development.js 

```
> npm run build
// the same as
> set REACT_APP_ENV=development && npm run build
```

Run locally
```
> npm run start
```
