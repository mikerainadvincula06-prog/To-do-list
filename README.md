# TaskFlow - Laboratory 4 (DCIT 26)

A beginner-friendly React To-Do List website that follows the Laboratory 4 requirements.

## Included features

- Dashboard with total, completed, and pending task counts
- Add tasks, mark tasks Done / Not Done, and delete tasks
- Create task groups and open each group's own task list
- React Router routes: `/`, `/groups`, `/groups/:groupId`, `/guide`, `/users`, `/developers`
- Zustand for shared task and group data
- Axios request to DummyJSON for sample user information
- Loading message and API error message
- Responsive Tailwind CSS layout

## Run on your computer

1. Install Node.js.
2. Open this project folder in VS Code.
3. Open Terminal in VS Code.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local address shown in the terminal (usually `http://localhost:5173`).

## Before presenting

1. Open `src/App.jsx`.
2. Find the `DevelopersPage` section.
3. Replace the four sample member names with your group's complete names.
4. Test adding, completing, undoing, and deleting tasks.
5. Create at least two groups and add a task to each.
6. Open User Information and show the sample user returned by DummyJSON.

## Deploy using Vercel

1. Upload the project folder to a GitHub repository.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import your GitHub repository.
4. Vercel normally detects Vite automatically.
5. Use `npm run build` as the build command and `dist` as the output directory if asked.
6. Click Deploy. The included `vercel.json` supports refreshing the website on its different routes.

## Technologies used

React, Tailwind CSS, Zustand, Axios, React Router DOM, and DummyJSON API.

## Important note

Task data and task groups are managed locally using Zustand. DummyJSON is used only to retrieve sample user information, as required by the laboratory instructions. This simple version keeps task data while the website is running; it does not save tasks permanently after a full browser refresh.
