const books = require('./data/books.json');
const express = require("express"); // Importamos el paquete express
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor

app.use(express.json()); // Middleware para parsear el body de las peticiones

// GET http://localhost:3000/ --> Ruta /. La principal
app.get("/", (req, res) => {
    // req: request, res: response
    res.send("Funcionando");
});


// HTTP GET http://localhost:3000/all
app.get("/all", (req, res) => {
    res.send(
        books
    );
});

app.get("/first", (req, res) => {
    res.send(
        books[0]
    );
});

app.get("/last", (req, res) => {
    res.send(
        books[books.length - 1]
    );
});
app.get("/middle", (req, res) => {
    res.send(
        books[(books.length - 1) / 2]
    );
});

app.get("/author/dante-alighieri", (req, res) => {
    books.forEach(book => {
        if (book.author.includes("Dante Alighieri")) {
            res.send(
                book.title
            );
        }
    });

});
app.get("/country/charles-dickens", (req, res) => {
    books.forEach(book => {
        if (book.author.includes("Charles Dickens")) {
            res.send(
                book.country
            );
        }
    });
});

app.get("/year&pages/cervantes", (req, res) => {
    books.forEach(book => {
        if (book.author.includes("Miguel de Cervantes")) {
            let libro = { pages: book.pages, year: book.year };
            res.send(
                libro
            );
        }
    });
});
app.get("/country/count/spain", (req, res) => {
    books.forEach(book => {
        let i = 0;
        if (book.country.includes("Spain")) {
            i += 1
            res.send(
                `Número de libros de España: ${i}`
            );
        }
    });
});

//Crea una ruta /country/at-least/germany para obtener VERDADERO O FALSO dependiendo de si hay o no un libro de Alemania
app.get("/country/at-least/germany", (req, res) => {
    books.forEach(book => {
        let i = 0;
        if (book.country.includes("Germany")) {
            i += 1;
            if (i != 0) {
                res.send(
                    true
                )
            } else {
                res.send(
                    false
                )
            }
        }
    })
});

//Crea una ruta /pages/all-greater/200 para obtener VERDADERO O FALSO dependiendo de si todos los libros tienen 
//más de 200 páginas
app.get("/pages/all-greater/200", (req, res) => {
    books.forEach(book => {
        if (book.pages < 200) {
            res.send(
                false //logica negativa para no iterar todo el array. desde que uno no cumpla, ya no son TODOS
            );
        }

    })
})


// Para ruta no existente
app.use("*", (req, res) => {
    res.status(404).send("Ruta no encontrada");
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});