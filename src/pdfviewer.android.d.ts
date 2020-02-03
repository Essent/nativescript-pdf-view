/// <reference path="AndroidPdfViewer.d.ts" />
import { PDFViewerCommon } from './pdfviewer.common';
import pdfviewer = com.github.barteksc.pdfviewer;
export declare class PDFViewer extends PDFViewerCommon {
    private promise;
    private tempFolder;
    private onLoadHandler;
    android: pdfviewer.PDFView;
    createNativeView(): pdfviewer.PDFView;
    loadPDF(src: string): void;
    private cacheThenLoad(url);
}
