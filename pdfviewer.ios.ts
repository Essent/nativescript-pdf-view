import * as common from './pdfviewer.common';

export class PDFViewer extends common.PDFViewer {
    private _ios: UIWebView;

    public constructor() {
        super();
        this.init();
        this.loadPDF(this.src);
    }

    public get ios() {
        return this._ios;
    }

    public set ios(value) {
        this._ios = value;
    }

    public loadPDF(src: string) {
        if (!src) {
            return;
        }

        if (src.indexOf('://') === -1) {
            const url = NSURL.fileURLWithPath(src);

            const urlRequest = new NSURLRequest({ URL: url });
            this.ios.loadRequest(urlRequest);
        }
    }

    private init() {
        this.ios = new UIWebView(this.mainScreen.bounds);

        this.ios.autoresizingMask =
            UIViewAutoresizing.FlexibleWidth |
            UIViewAutoresizing.FlexibleHeight;

        this.ios.scalesPageToFit = true;
        this.ios.scrollView.decelerationRate = UIScrollViewDecelerationRateNormal;
    }

    private get mainScreen() {
        return typeof UIScreen.mainScreen === 'function' ?
            UIScreen.mainScreen() :  // xCode 7 and below
            UIScreen.mainScreen;     // xCode 8+
    }
}
