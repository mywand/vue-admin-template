// https://www.storyblok.com/tp/how-to-auth0-vuejs-authentication
// https://www.jerriepelser.com/blog/using-auth0-with-vue-oidc-client-js/
import { UserManager, WebStorageStateStore, User } from "oidc-client";

export default class AuthService {
    private userManager: UserManager;

    constructor() {
        const AUTH0_DOMAIN: string = "YOUR_AUTH0_DOMAIN"; // e.g. https://jerrie.auth0.com

        const settings: any = {
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            authority: AUTH0_DOMAIN,
            client_id: "YOUR_AUTH0_CLIENT_ID",
            redirect_uri: "http://localhost:8080/callback.html",
            response_type: "id_token token",
            scope: "openid profile",
            post_logout_redirect_uri: "http://localhost:8080/",
            filterProtocolClaims: true,
            metadata: {
                issuer: AUTH0_DOMAIN + "/",
                authorization_endpoint: AUTH0_DOMAIN + "/authorize",
                userinfo_endpoint: AUTH0_DOMAIN + "/userinfo",
                end_session_endpoint: AUTH0_DOMAIN + "/v2/logout",
                jwks_uri: AUTH0_DOMAIN + "/.well-known/jwks.json",
            }
        };

        this.userManager = new UserManager(settings);
    }

    public getUser(): Promise<User> {
        return this.userManager.getUser();
    }

    public login(): Promise<void> {
        return this.userManager.signinRedirect();
    }

    public logout(): Promise<void> {
        return this.userManager.signinRedirect();
    }
}