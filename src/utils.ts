import pdfParse from 'pdf-parse';
import axios from 'axios';
import { Buffer } from 'buffer';
import fs from 'fs';

const parsePdf = async (path: string): Promise<string> => {
    const buffer = fs.readFileSync(path);
    return (await pdfParse(buffer)).text;
}

export const readPdfContent = async (path: string) => {
    if (!path) {
        return "Path is required";
    }
    try {
        if (!fs.existsSync(path)) {
            return `File not found: ${path}, please ensure that you use the absolute path`;
        }

        return await parsePdf(path);
    }
    catch (error) {
        return "Error reading file";
    }
}

const getPdfAsBuffer = async (url: string): Promise<Buffer> => {
    try {
        const response = await axios.get<ArrayBuffer>(url, {
            responseType: 'arraybuffer',
            headers: { 'Accept': 'application/pdf' }
        });

        // 此时 response.data 会被正确识别为 ArrayBuffer
        const buffer = Buffer.from(response.data);
        return buffer;

    } catch (error) {
        throw new Error(`Failed to fetch PDF: ${error instanceof Error ? error.message : error}`);
    }
}

const parsePdfWithUrl = async (url: string): Promise<string> => {
    if (!url) {
        return "URL is required";
    }
    try {
        const buffer = await getPdfAsBuffer(url);
        return (await pdfParse(buffer)).text;

    } catch (error) {
        return "Error reading file";
    }
}

export const readPdfContentWithUrl = async (url: string) => {
    if (!url) {
        return "URL is required";
    }
    try {
        return await parsePdfWithUrl(url);
    } catch (error) {
        return "Error reading file";
    }
}
