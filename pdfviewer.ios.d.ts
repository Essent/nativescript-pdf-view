import * as common from './pdfviewer.common';
export declare class PDFViewer extends common.PDFViewer {
    private _ios;
    constructor();
    ios: UIWebView;
    loadPDF(src: string): void;
    private init();
    private readonly mainScreen;
}
