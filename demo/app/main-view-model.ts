import { Observable } from 'tns-core-modules/data/observable';
import { getFile } from 'tns-core-modules/http';
import { path } from 'tns-core-modules/file-system';
import { knownFolders } from 'tns-core-modules/file-system';
import { File } from 'tns-core-modules/file-system';


export class MainViewModel extends Observable {

  public url = 'https://www.princexml.com/samples/flyer/flyer.pdf';

  public constructor() {
    super();
    this.loadPdfFromUrl();
  }

  private loadPdfFromUrl(): void {
		this.getPdf(this.url)
			.then((r: any) => {
        this.set('pdfUrl', r.path);
			}, (e: string) => {
				alert('Error: ' + e);
			});
  }
  
  public getPdf(url: string): Promise<File> {
		const filePath = path.join(knownFolders.temp().path, 'test.pdf');
		return getFile(url, filePath);
	}
}
