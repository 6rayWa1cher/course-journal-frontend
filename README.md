# course-journal-frontend

The frontend-part of the Course Journal project

# Run

## Docker image

Clone the project on your computer:

```bash
git clone https://github.com/6rayWa1cher/course-journal-frontend && cd course-journal-frontend
```

Then build an image using the following command. Don't forget to replace the backend placeholder.

```bash
docker build --build-arg REACT_APP_BACKEND_URL=<YOUR_BACKEND_URL> -t cj_front .
```

Finally, start the image:

```bash
docker run -p 80:80 -it cj_front
```

## Yarn project

Alternatively, you can start this project as a Yarn application. Then you have to install node.js, like this:

```bash
sudo apt update
sudo apt install nodejs
```

Clone the project on your computer:

```bash
git clone https://github.com/6rayWa1cher/course-journal-frontend && cd course-journal-frontend
```

Create and fill `.env`. Don't forget to replace the backend placeholder.

```bash
echo 'REACT_APP_BACKEND_URL=<YOUR_BACKEND_URL>' > .env
```

Install yarn and download dependencies:

```bash
npm install --global yarn
yarn
```

Finally, start a dev server:

```bash
yarn start
```

Or build an optimized production build:

```bash
yarn run build
```
