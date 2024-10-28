
# Next.js Movie Search Application:

This project is a movie search application built with Next.js. It includes user authentication using NextAuth.js and movie data display functionality with a search filter. The app fetches movie data from an external API and provides a user-friendly interface for browsing through the available movies.



## Features

- Signin and Signup Functionality: Users can sign in using their registered email/username and password.
- Search Functionality: Users can search for movies by their titles using a search bar in the navbar.
- Movie Data Display: Movie details, including images, titles, and ratings, are displayed in a grid format.
- Responsive Design: Optimized for various screen sizes with an intuitive UI built using Material UI components.


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## Technologies Used

- **Next.js**: Server-side rendering and React framework.
- **NextAuth.js**: Authentication management with credentials provider.
- **React Hook Form & Yup**: Form handling and validation.
- **Material UI (MUI)**: For UI components and responsive design.
- **React Query**: Data fetching and caching.
- **Axios**: For making HTTP requests to fetch movie data from the API.

## Environment Variables

- NEXT_PUBLIC_API_URL: The base URL of the external API to fetch movie data.
- NEXTAUTH_URL: URL for NextAuth configuration (usually http://localhost:3000).

## Project Structure
The main structure of the app includes:

- pages/: Contains the different pages such as the sign-in page and the homepage.
- components/: Reusable React components for various parts of the app like Navbar, MovieList, and SignInForm.
- styles/: Contains the global styles.

## Key Components
1. SignIn Page (pages/auth/signin.js):

- Allows users to sign in using credentials.
- Integrated with react-hook-form for form handling and next-auth for authentication.

2. Navbar Component (components/Navbar.js):

- Contains the search bar for real-time filtering of movies.
- Links for navigation are available here.

3. MovieList Component (components/MovieList.js):

- Fetches and displays a list of movies from an external API.
- Uses Axios for HTTP requests and React Query for caching the fetched data.

4. Search Functionality:

- Filters the list of movies dynamically as users type in the search bar.
## Example Code Snippets
 #### Authentication with NextAuth
 This is how the app handles sign-in via credentials:
 
 ```javascript
 const handleSignIn = async (data) => {
  const res = await signIn("credentials", {
    redirect: false,
    ...data
  });

  if (res?.error) {
    console.error("Login failed:", res.error);
  } else {
    router.push('/');
  }
};
```
#### Movie Fetching Example
Fetching movies from an external API:

```javascript
useEffect(() => {
  const fetchMovies = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
    setMovies(res.data);
  };
  fetchMovies();
}, []);
```

#### Search Functionality Example
Filtering movie data based on search input:

```javascript
const filteredMovies = movies.filter(movie =>
  movie.title.toLowerCase().includes(searchQuery.toLowerCase())
);
```
## Usage
- After starting the server, go to http://localhost:3000 to view the app.
- To log in, navigate to /auth/signin and enter the credentials.
- After logging in, you will be redirected to the homepage where you can view the movie list.
- Use the search bar in the navbar to filter movies.
## API Integration
The app fetches movie data from an external API. Ensure the API URL is correctly set in your .env.local file.

Sample API URL in the .env.local file:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
```