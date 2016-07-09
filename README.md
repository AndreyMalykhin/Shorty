1. Install [Node.js](https://nodejs.org/en/download/)
2. Copy file `.env.example` and name it `.env`, then set your back-end url `SHORTY_API_URL` in it and **don't forget to enable CORS at back-end!**
3. `npm run build`
4. Serve content of `build` folder by your favorite web server (e.g. `php -S localhost:8080 -t build`)

There is also `npm run dev`, which will launch dev server at http://localhost:8080 by default.
