import express from 'express';
import { urlModel } from '../models/shortUrl';
export const createUrl = async (req: express.Request, res: express.Response) => {
    try {
        const { fullUrl } = req.body;
        console.log("The full URL is:", fullUrl);
    
        const urlFound = await urlModel.findOne({ fullUrl });
    
        if (urlFound) {  // Check if urlFound is not null
            res.status(409).send(urlFound);  // 409 Conflict if the URL already exists
        } else {
            const shortUrl = await urlModel.create({ fullUrl });
            res.status(201).send(shortUrl);  // 201 Created for a new short URL
        }
    } catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
    
}


export const getAllUrl = async (req: express.Request, res: express.Response) => {
    try {
        const allUrls = await urlModel.find();
        if (allUrls.length === 0) {
            res.status(404).send({ message: 'No urls found' });
        }
        else{
        res.status(200).send(allUrls);}
    } 
    catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}


export const getUrl = async (req: express.Request, res: express.Response) => {

    try {
        const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
        if (shortUrl) {
            shortUrl.clicks++;
            shortUrl.save();
            res.status(301).redirect(`${shortUrl.fullUrl}`); }
        else {
            res.status(404).send({ message: 'URL not found' });
        }
    } 
    catch (error) {
        res.status(500).send({ message: 'Internal Server Error' }); 
    }

}


export const deleteUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send({ message: 'URL deleted successfully' });
        }
    } 
    catch (error) {
        res.status(500).send({ message: 'Internal Server Error' }); 
    }
}