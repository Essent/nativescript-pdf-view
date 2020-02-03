import { Property, View } from 'tns-core-modules/ui/core/view';
export declare abstract class PDFViewerCommon extends View {
    static loadEvent: string;
    src: string;
    static notifyOfEvent(eventName: string, pdfViewRef: WeakRef<PDFViewerCommon>): void;
}
export declare const srcProperty: Property<PDFViewerCommon, string>;
