## Cloud life supermarket
Native app developed with React Native: react native + react-navigation + redux + native-base + axios
##### (In the project iteration scroll, if there is a little brother who likes this, send me a start, thank you! If you have any suggestions to modify, please pull the request or create issue.)

### Technology stack
React @16.0.0
2. react-navigation @1.5.2
Redux
Native-base
5. axios
7. es6 + babel

Created a project using create-react-native-app. The server side is built with springboot+mybatis, the warehouse address: [server-side code] (https://github.com/dekvos123/backend_cloud_commodity)

As the saying goes, there is a management system for the app. The cloud life supermarket is equipped with a background, which is also written with react. Interested friends can go and have a look, or cloen down and play, the app and the background system share a set of api interfaces. It is very convenient to run: [Cloud Life Background Management System] (https://github.com/dekvos123/cms_community_e_commerce)

### surroundings
* Due to the extensive use of new features such as ***es6/7***, it is recommended that you use ***node*** latest LTS version
* I use ubuntu16.04 myself, it is recommended to run under linux or mac os system

### Project begining
1. *** First you can install yarn and use taobao registry***
```bash
Npm install -g yarn
Yarn config set registry https://registry.npm.taobao.org --global
Yarn config set disturl https://npm.taobao.org/dist --global
```
2. *** Clone the project and install the environment***
```bash
Git clone https://github.com/dekvos123/community_e_commerce.git
Cd community_e_commerce
Yarn
```
3. *** Direct operation ***
```bash
Npm start
```
4. bash will appear with a QR code and use ***expo*** for a quick experience. ***NOTE***: The phone and computer must be on the same network segment to function properly.

### Introduction to directory structure
```
***├── src // Source directory ***
***│ ├── components // some reusable components ***
***│ ├── screens // page (container) ***
***│ ├── constants // Project global configuration ***
***│ ├── services // server-side interface data mapping ***
***│ ├── reducers // reducers ***
***│ ├── actions // actions ***
***│ ├── utils // Some common tools for packaging ***
***│ ├── Routes.js // react-navigation routing configuration ***
***├── App.js // program entry file, loading various public components ***
***├── .babelrc // babel configuration file ***
```
