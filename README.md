# Usage

To run the app you need node.js installed on your machine.

1. **Start the development api server**:

    ```bash
    cd server/functions
    npm i
    npm run serve
    ```

    This will start the development server for the Firebase functions.
    Keep your terminal open and check the logs for the URL of the server.

2. **Start the development app**:

    ```bash
    cd todo-app
    npm i
    npm run web
    ```

    This will start the web app in development mode.
    You may need to update the `todo-app/src/api/todos.ts` file with the URL of the server as `API_URL`.

    To run the app on your simulator for iOS or emulator Android, you can use the following commands:

    ```bash
    npm run ios
    ```

    or

    ```bash
    npm run android
    ```

## Missing Pieces

- **Tests**: I haven't written any tests for the app. I would use Jest and React Testing Library for writing tests.

- **State Management**: I haven't used any state management library for this simple app. I would use Zustand for managing states if needed. But for handling API states, I have used React Query.

- **Error Handling**: Errors are not handled much.

- **UI**: The UI is very plain and simple. I would use Tailwind CSS for styling the app or use a UI library.

- **More**: There are many more things that can be improved in the app. But I have kept it super simple for the demo purpose.
