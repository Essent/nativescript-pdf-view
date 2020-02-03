import { PDFViewerCommon, srcProperty } from './pdfviewer.common';

export class PDFViewerDelegate extends NSObject implements WKNavigationDelegate  {
    public static ObjCProtocols = [WKNavigationDelegate];

    private owner: WeakRef<PDFViewer>;

    public static initWithOwner(owner: WeakRef<PDFViewer>): PDFViewerDelegate {
        const delegate = PDFViewerDelegate.new() as PDFViewerDelegate;
        delegate.owner = owner;
        return delegate;
    }

    public webViewDidFinishNavigation(webView: WKWebView) {
        PDFViewerCommon.notifyOfEvent(PDFViewerCommon.loadEvent, this.owner);
      }
}

export class PDFViewer extends PDFViewerCommon {
    private delegate: PDFViewerDelegate;

    public constructor() {
      super();
      this.init();
    }

    public get ios() {
      return this.nativeView as WKWebView;
    }

    public set ios(value: WKWebView) {
      this.nativeView = value;
    }

    public [srcProperty.setNative](value: string) {
      this.loadPDF(value);
    }

    public onLoaded() {
      super.onLoaded();
      this.ios.navigationDelegate = this.delegate;
    }

    public onUnloaded() {
      this.ios.navigationDelegate = void 0;
      super.onUnloaded();
    }

    public loadPDF(src: string) {
      if (!src) {
        return;
      }

      let url: NSURL;

      if (src.indexOf('://') === -1) {
        url = NSURL.fileURLWithPath(src);
        this.ios.loadFileURLAllowingReadAccessToURL(url, url);
      } else {
        url = NSURL.URLWithString(src);
        const urlRequest = NSURLRequest.requestWithURL(url);
        this.ios.loadRequest(urlRequest);
      }
    }

    private init() {
      this.delegate = PDFViewerDelegate.initWithOwner(new WeakRef(this));

      this.ios = new WKWebView({
        configuration: WKWebViewConfiguration.new(),
        frame: this.mainScreen.bounds,
      });

      this.ios.opaque = false;
      this.ios.autoresizingMask =
        // tslint:disable-next-line:no-bitwise
        UIViewAutoresizing.FlexibleWidth |
        UIViewAutoresizing.FlexibleHeight;
    }

    private get mainScreen(): UIScreen {
      return UIScreen.mainScreen;
    }

}
