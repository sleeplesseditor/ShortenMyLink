import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp} from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  //Publication
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

//Redirect user to long URL
function onRoute(req, res, next) {
  const link = Links.findOne({ token: req.params.token });

  if (link) {
    Links.update(link, { $inc: { clicks: 1 }});
    res.writeHead(307, { 'Location': link.url });
    res.end();
  } else {
    //Send user to React app
    next();
  }
}

const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
});

//Middleware
WebApp.connectHandlers.use(middleware);