export const defaults = {
    isLoggedIn: Boolean(localStorage.getItem("token")) || false
  };
  
  export const resolvers = {
    Mutation: {
      logUserIn: async(_, { token }, { cache }) => {
        await localStorage.setItem("token", token);
        await cache.writeData({
          data: {
            isLoggedIn: true
          }
        });

      return null;
      },
      logUserOut: (_, __, { cache }) => {
        localStorage.removeItem("token");
        window.location= "/";
        return null;
      }
    }
  };