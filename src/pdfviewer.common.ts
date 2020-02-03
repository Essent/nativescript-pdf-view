import { Property, View } from 'tns-core-modules/ui/core/view';

export abstract class PDFViewerCommon extends View {
    public static loadEvent = 'load';

   // the source url of the PDF to show

    public src: string;

    public static notifyOfEvent(
        eventName: string,
        pdfViewRef: WeakRef<PDFViewerCommon>,
      ) {
        const viewer = pdfViewRef.get();
        if (viewer) {
          viewer.notify({ eventName, object: viewer });
        }
    }
}

export const srcProperty = new Property<PDFViewerCommon, string>({
    name: 'src',
  });
srcProperty.register(PDFViewerCommon);