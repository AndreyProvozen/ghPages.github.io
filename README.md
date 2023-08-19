# Link shortener pet project

## Stack

1. Next.js
1. TailwindCSS
1. MongoDB
1. Jest
1. Redux Toolkit

## Local development

1. **Clone the Repository**: Begin by cloning this repository to your local machine and then navigate to the project's root directory. Run `yarn` to install the required dependencies.
1. **Set Up Environment Variables**: Create a `.env.local` file in the project's root directory. Add the following environment variables to this file:

   ```
   API_HOST=http://localhost:3000/api
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   MONGODB_URI=your_mongodb_uri
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_ID=your_github_id
   GITHUB_SECRET=your_github_secret
   JWT_SECRET=your_jwt_secret
   ```

   > Replace the placeholders (your_nextauth_secret, your_mongodb_uri, etc.) with your actual values.

1. **Start the Development Server**: Run the command `yarn dev` to start the development server. This command will launch the project locally, and you can access it by opening your web browser and navigating to http://localhost:3000.
