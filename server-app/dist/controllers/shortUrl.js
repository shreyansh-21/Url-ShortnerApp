"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const shortUrl_1 = require("../models/shortUrl");
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl } = req.body;
        console.log("The full URL is:", fullUrl);
        const urlFound = yield shortUrl_1.urlModel.findOne({ fullUrl });
        if (urlFound) { // Check if urlFound is not null
            res.status(409).send(urlFound); // 409 Conflict if the URL already exists
        }
        else {
            const shortUrl = yield shortUrl_1.urlModel.create({ fullUrl });
            res.status(201).send(shortUrl); // 201 Created for a new short URL
        }
    }
    catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
exports.createUrl = createUrl;
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUrls = yield shortUrl_1.urlModel.find();
        if (allUrls.length === 0) {
            res.status(404).send({ message: 'No urls found' });
        }
        else {
            res.status(200).send(allUrls);
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
exports.getAllUrl = getAllUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findOne({ shortUrl: req.params.id });
        if (shortUrl) {
            shortUrl.clicks++;
            shortUrl.save();
            res.status(301).redirect(`${shortUrl.fullUrl}`);
        }
        else {
            res.status(404).send({ message: 'URL not found' });
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
exports.getUrl = getUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send({ message: 'URL deleted successfully' });
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
exports.deleteUrl = deleteUrl;
