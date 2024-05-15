const path = require('path');
const express = require('express');
const {v4: uuidv4} = require('uuid');
const methodOverride = require('method-override');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        "id": uuidv4(),
        "name": "Alice Johnson",
        "comment": `This is a great post!`
    },
    {
        "id": uuidv4(),
        "name": "Bob Smith",
        "comment": `I found this very helpful, thank you.`
    },
    {
        "id": uuidv4(),
        "name": "Charlie Brown",
        "comment": `Interesting perspective, I hadn't considered that.`
    },
    {
        "id": uuidv4(),
        "name": "Dana White",
        "comment": `Can you provide more details on this topic?`
    },
    {
        "id": uuidv4(),
        "name": "Eve Adams",
        "comment": `I disagree with some points, but overall good.`
    },
    {
        "id": uuidv4(),
        "name": "Frank Miller",
        "comment": `This was exactly what I was looking for.`
    },
    {
        "id": uuidv4(),
        "name": "Grace Lee",
        "comment": `Thanks for sharing this information!`
    },
    {
        "id": uuidv4(),
        "name": "Hank Green",
        "comment": `Well written and informative.`
    },
    {
        "id": uuidv4(),
        "name": "Ivy Wilson",
        "comment": `I have a question about one part.`
    },
    {
        "id": uuidv4(),
        "name": "Jack Davis",
        "comment": `Great read, I learned something new today.`
    }
]

app.get('/comments', (req, res) => {
    res.render('comment/index', { comments });
})

app.get('/comments/create', (req, res) => {
    res.render('comment/create');
})

app.post('/comments', (req, res) => {
    const { name, comment } = req.body
    comments.push({ name, comment, id: uuidv4() })
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comment/show', {comment})
})


app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comment/edit', {comment})
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params
    const newComment = req.body.comment
    const oldComment = comments.find(c => c.id === id)
    oldComment.comment = newComment
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

app.listen(8080, () => {
    console.log(`Server is running on: http://localhost:8080`);
});