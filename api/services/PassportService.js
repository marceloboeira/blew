var passport = require('passport'),
	path = require('path'),
	url = require('url');

/**
 * Passport Service
 *
 * A painless Passport.js service for your Sails app that is guaranteed to
 * Rock Your Socks™. It takes all the hassle out of setting up Passport.js by
 * encapsulating all the boring stuff in two functions:
 *
 *   passport.endpoint()
 *   passport.callback()
 *
 */

// Load authentication protocols
passport.protocols = require('./protocols');

/**
 * Connect a third-party profile to a local user
 *
 * This is where most of the magic happens when a user is authenticating with a
 * third-party provider.
 *
 * For more information on auth(entication|rization) in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 * http://passportjs.org/guide/authorize/
 *
 * @param {Object}   req
 * @param {Object}   query
 * @param {Object}   profile
 * @param {Function} next
 */
passport.connect = function (req, query, profile, next) {
  var strategies = sails.config.passport,
  config = strategies[profile.provider],
  user = {};

	// Set the authentication provider.
	query.provider = req.param('provider');

  // If the profile object contains a list of emails, grab the first one and
  // add it to the user.
	if (profile.hasOwnProperty('emails')) {
		user.email = profile.emails[0].value;
	}

  // If the profile object contains a username, add it to the user.
  if (profile.hasOwnProperty('username')) {
		user.username = profile.username;
  }

  if (profile.hasOwnProperty('displayName')) {
		user.first_name = profile.displayName;
	}

  if (!Object.keys(user).length) {
		return next(new Error('Neither a username or email was available', null));
  }

	Passport.findOne({
		provider: profile.provider,
		identifier: query.identifier
  }).populate('user').exec(function (err, passport) {
		if (err) return next(err);

		if (!req.user) {
			if (!passport) {
				User.create(user).exec(function (err, user) {
					if (err) return next(err);
					query.user = user.id;
					Passport.create(query).exec(function (err, passport) {
						if (err) return next(err);
						next(err, user);
          });
        });
      }
      else {
				next(null, passport.user);
      }
		}
    else {
			if (!passport) {
				query.user = req.user.id;
				Passport.create(query).exec(function (err, passport) {
					if (err) return next(err);
					next(err, req.user);
        });
      }
      else {
        next(null, req.user);
      }
    }
  });
};

/**
 * Create an authentication endpoint
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 *
 * @param  {Object} req
 * @param  {Object} res
 */
passport.endpoint = function (req, res) {
  var strategies = sails.config.passport,
  provider = req.param('provider'),
  options    = {};

  // If a provider doesn't exist for this endpoint, send the user back to the
  // login page
  if (!strategies.hasOwnProperty(provider)) {
    return res.redirect('/login');
  }

  // Attach scope if it has been set in the config
  if (strategies[provider].hasOwnProperty('scope')) {
    options.scope = strategies[provider].scope;
  }

  // Load authentication strategies
  this.loadStrategies(req);

  // Redirect the user to the provider for authentication. When complete,
  // the provider will redirect the user back to the application at
  //     /auth/:provider/callback
  this.authenticate(provider, options)(req, res, req.next);
};

/**
 * Create an authentication callback endpoint
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
passport.callback = function (req, res, next) {
  var provider = req.param('provider', 'local'),
	action   = req.param('action');

  // Passport.js wasn't really built for local user registration, but it's nice
  // having it tied into everything else.
  if (provider === 'local' && action !== undefined) {
    if (action === 'register' && !req.user) {
      this.protocols.local.register(req, res, next);
    }
    else if (action === 'connect' && req.user) {
      this.protocols.local.connect(req, res, next);
    }
    else {
      next(new Error('Invalid action'));
    }
  } else {
    this.loadStrategies(req);
    this.authenticate(provider, next)(req, res, req.next);
  }
};

passport.loadStrategies = function (req) {
  var self       = this,
  strategies = sails.config.passport;

  Object.keys(strategies).forEach(function (key) {
    var Strategy = require('passport-' + key).Strategy,
    options  = { passReqToCallback: true };

    if (key === 'local') {
      // Since we need to allow users to login using both usernames as well as
      // emails, we'll set the username field to something more generic.
      _.extend(options, { usernameField: 'identifier' });

      // Only load the local strategy if it's enabled in the config
      if (strategies[key]) {
        self.use(new Strategy(options, self.protocols.local.login));
      }
    } else {
      var protocol = strategies[key].protocol,
      callback = path.join('auth', key, 'callback');

      switch (protocol) {
        case 'oauth':
        case 'oauth2':
          options.callbackURL = url.resolve(req.baseUrl, callback);
          break;

        case 'openid':
          options.returnURL = url.resolve(req.baseUrl, callback);
          options.realm     = req.baseUrl;
          options.profile   = true;
          break;
      }

      // Merge the default options with any options defined in the config. All
      // defaults can be overriden, but I don't see a reason why you'd want to
      // do that.
      _.extend(options, strategies[key].options);

      self.use(new Strategy(options, self.protocols[protocol]));
    }
  });
};

passport.serializeUser(function (user, next) {
      next(null, user.id);
});

passport.deserializeUser(function (id, next) {
  User.findOne(id).exec(next);
});

module.exports = passport;
