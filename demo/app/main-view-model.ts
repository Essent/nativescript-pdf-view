import { Observable } from 'tns-core-modules/data/observable';
import * as fs from 'tns-core-modules/file-system';
import * as http from 'tns-core-modules/http';

export class MainViewModel extends Observable {
  public pdfUrls = [
    'https://www.princexml.com/samples/flyer/flyer.pdf',
    'https://www.princexml.com/howcome/2016/samples/magic8/index.pdf',
    'https://www.princexml.com/samples/invoice/invoicesample.pdf',
  ];

  private tempFolder = fs.knownFolders.temp().getFolder('PDFViewer.temp/');

  public constructor() {
    super();
    this.changePDF();
  }

  public getPdfLocalPath(url: string) {
      http
      .getFile(url, `${this.tempFolder.path}/${Date.now()}.pdf`)
      .then(file => {
          console.log(file.path);
          return file.path;
      }).catch(error => {
        console.error(error);
      });
  }

  public changePDF() {
    this.current++;
    this.set('pdfUrl', this.pdfUrls[(this.current + 1) % this.pdfUrls.length]);
  }

  private current = 0;
}
