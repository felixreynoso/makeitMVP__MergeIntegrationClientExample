# Client Template Project for Communiti

The template has three main components, the (ToDos, UserProfile, and EventsList). Where the last two make requests to the API, and the first bypasses the API completely by using the firestore utilities and writing and reading directly from the database.

The UserProfile has a good example using axios to make requests on Protected endpoints, it uses the Authorization header with the userContext.accessToken JWT to make auhenticated requests with the API.

At the moment the API is not yet deployed, we're planning to deploy V1 by the end of next week.
