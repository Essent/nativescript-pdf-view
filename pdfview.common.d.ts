import * as view from 'ui/core/view';
export declare abstract class PdfView extends view.View {
    private static srcProperty;
    src: string;
    abstract loadPDF(src: string): any;
}
