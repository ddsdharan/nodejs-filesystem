import express from 'express';
import { readdir, writeFile } from 'fs';
import { extname, join } from 'path';

const app = express();
const port = 3000;

const folderPath = '/path/to/folder'; //enter your Folder Path

app.get('/getFiles', (req, res) => {
    readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading folder');
        } else {
            const textFiles = files.filter((file) => extname(file) === '.txt');
            res.status(200).json(textFiles);
        }
    });
});

app.get('/createFile', (req, res) => {
    const timestamp = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
    });

    const formattedTimestamp = timestamp
        .replace(',', '')
        .replace(/\//g, '-')
        .replace(/:/g, '.')
        .replace(' ', '_');

    const fileName = `${formattedTimestamp}.txt`;
    const filePath = join(folderPath, fileName);

    writeFile(filePath, timestamp, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating file');
        } else {
            console.log(`File ${fileName} created`);
            res.status(200).send('File created successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
