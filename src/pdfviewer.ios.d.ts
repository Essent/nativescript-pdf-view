import { PDFViewerCommon } from './pdfviewer.common';
export declare class PDFViewerDelegate extends NSObject implements WKNavigationDelegate {
    static ObjCProtocols: {
        prototype: WKNavigationDelegate;
    }[];
    private owner;
    static initWithOwner(owner: WeakRef<PDFViewer>): PDFViewerDelegate;
    webViewDidFinishNavigation(webView: WKWebView): void;
}
export declare class PDFViewer extends PDFViewerCommon {
    private delegate;
    constructor();
    ios: WKWebView;
    onLoaded(): void;
    onUnloaded(): void;
    loadPDF(src: string): void;
    private init();
    private readonly mainScreen;
}
