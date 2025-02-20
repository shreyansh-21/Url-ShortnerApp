"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlModel = void 0;
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const shortUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        default: () => nanoid().substring(0, 5)
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
exports.urlModel = mongoose.model('ShortUrl', shortUrlSchema);
