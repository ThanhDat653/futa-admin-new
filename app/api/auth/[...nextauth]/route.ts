import NextAuth, {NextAuthOptions} from 'next-auth';
import {cookies} from "next/headers";

const getProfileUrl = 'https://api.devsphere.id.vn/api/v1/profiles/info'
const authDomain = 'https://account.devsphere.id.vn'

const authOptions: NextAuthOptions = {
	providers: [
		{
			id: 'admin',
			name: 'admin',
			client: {
				client_id: 'admin-client',
				token_endpoint_auth_method: 'none',
			},
			type: 'oauth',
			version: '2',
			checks: ['pkce'],
			idToken: true,
			issuer: authDomain,
			wellKnown: authDomain, //ENDPOINT.SERVICE.
			userinfo: {
				url: getProfileUrl, // viết constant
				async request(context) {
					const res = await fetch(getProfileUrl,
						{
							headers: {
								Authorization: `Bearer ${context.tokens.access_token}`,
							},
						}
					);
					cookies().set('access_token', context.tokens.access_token as string);
					const data = await res.json();
					console.log(data)
					return { id: data.email, token: context.tokens.access_token, ...data };
				},
			},
			profile: (profile) => {
				return {
					id: profile.id,
					name: profile.fullname,
					email: profile.email,
					accessToken: profile.token
				};
			},
		},
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			if (token.user) {
				session.user = token.user;
			}
			return session;
		},
	}
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
