const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Handle image uploads (base64)
server.post('/blogs', (req, res) => {
  const { title, image, category, author, authorPic, published_date, reading_time, content, tags } = req.body;

  // Save the blog post with the image as base64
  const newBlogPost = {
    title,
    image,
    category,
    author,
    authorPic,
    published_date,
    reading_time,
    content,
    tags
  };

  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
  db.blogs.push(newBlogPost);

  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(db, null, 2));

  res.status(201).json(newBlogPost);
});

// Use default router for other routes
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
