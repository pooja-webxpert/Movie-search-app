import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials,req) {
        const { email, password, localData } = credentials;
        const data = JSON.parse(localData); 
        const user = data.find(
          (item) => item.email === email && item.password === password
        );

        if (user) {
          return { email: user.email }; 
        } else {
          return null; 
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email; // Include email in token if user is found
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email; // Include email in session data
      return session;
    },
  },
});

export { handler as GET, handler as POST };
