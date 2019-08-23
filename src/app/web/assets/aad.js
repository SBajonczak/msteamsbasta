(function(hello) {

	hello.init({
		aad: {
			name: 'Azure Active Directory',
			base: ikbSettings.baseFunctionUri,
			oauth: {
				version: 2,
				auth: 'https://login.microsoftonline.com/99c7da52-56fc-49ca-aa95-8f7fb09c995e/oauth2/authorize?resource=https://graph.microsoft.com/.default',
                grant: 'https://login.microsoftonline.com/99c7da52-56fc-49ca-aa95-8f7fb09c995e/oauth2/token?resource=https://graph.microsoft.com/.default'
			},

			// Authorization scopes
			scope: {
				// you can add as many scopes to the mapping as you want here
				profile: '',
				offline_access: ''
			},

			scope_delim: ' ',

			login: function(p) {
				if (p.qs.response_type === 'code') {
					// Let's set this to an offline access to return a refresh_token
					p.qs.access_type = 'offline_access';
				}
			},

        
			xhr: function(p) {
				if (p.method === 'post' || p.method === 'put') {
					toJSON(p);
				}
				else if (p.method === 'patch') {
					hello.utils.extend(p.query, p.data);
					p.data = null;
				}

				return true;
			},


			get: {
				'default': function(p, callback) {
					switch(p.path.toLowerCase()){
						case "views":
							callback(p.path);
						break;
					}
				}
			},


			// Don't even try submitting via form.
			// This means no POST operations in <=IE9
			form: false
		}
	});
})(hello);