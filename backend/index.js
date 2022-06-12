const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());


const appPort = 8080;

const packages = [
    {
        id: 1,
        date: "2022.06.10 - 11:50",
        packagepoint: "1. számú posta - Pécs Légszeszgyár u 12./B",
        weight: 300,
    },
];

app.get('/api/v1/packageapp/port', (req, res) => {
    res.send(`This app is running on this port: ${appPort}!`);
});

app.get('/api/v1/packageapp/packages', (req, res) => {
    const sortedArray = packages.sort((first, second) => first.name < second.name ? 1 : -1);
    res.status(200).send(sortedArray);
});

app.post('/api/v1/packageapp/packages', (req, res) => {
    checkDetailsOfRequest({ req, res });

    const showDate = new Date();
    const displayCurrentDate = 
    showDate.getFullYear()+'.'+((showDate.getMonth()+1)<10?'0':'')+showDate.getMonth()+'.'+showDate.getDate()+' - '+showDate.getHours()+':'+(showDate.getMinutes()<10?'0':'')+showDate.getMinutes();

    packages.push({
        ...req.body,
        id: packages.length + 1,
        date: displayCurrentDate,
    });

    res.status(200).send('The package creation was successfully!');
});

app.delete('/api/v1/packageapp/packages/:id', (req, res) => {
    checkDetailsOfRequest({ req, res });

    const index = getPackage({ id: req.params.id });

    packages.splice(index, 1);

    res.status(200).send("The deletion was successfully!");

});

app.put('/api/v1/packageapp/packages/:id', (req, res) => {
    checkDetailsOfRequest({ req, res });

    const index = getPackage({ id: req.params.id });

    packages[index] = {
        ...packages[index],
        ...req.body,
    };

    res.status(200).send('The update was successfully!');
});

function checkDetailsOfRequest({ req, res }) {
    if (req.params?.id) {
        const idNotFoundError = isElementWithGivenIdExist({ id: req.params.id });
        !idNotFoundError && res.status(404).send("Package with the given id was not found");
    }
}

function isElementWithGivenIdExist({ id }) {
    return packages.find((package) => package.id === parseInt(id));
}

function getPackage({ id }) {
    const package = packages.find((package) => package.id === parseInt(id));
    return packages.indexOf(package);
}

app.listen(appPort, () => console.log("app is listening on port 8080!"));