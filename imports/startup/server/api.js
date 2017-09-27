import '../../api/Documents/methods';
import '../../api/Documents/server/publications';
import '../../api/Youtube/methods';
import '../../api/Youtube/server/publications';

import '../../api/OAuth/server/methods';

import '../../api/Users/server/methods';
import '../../api/Users/server/publications';

import '../../api/Utility/server/methods';

import { WebApp } from 'meteor/webapp';


WebApp.rawConnectHandlers.use("/", function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});
