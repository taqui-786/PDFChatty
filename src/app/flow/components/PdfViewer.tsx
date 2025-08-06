'use client';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

const PdfViewer = ({ url }: { url: string }) => {
  const pageNavPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin();

  return (
    <div className="h-full w-full overflow-hidden border rounded shadow">
      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
      
          <div className="border rounded h-full overflow-y-auto">
            <Viewer
              fileUrl={url}
              plugins={[pageNavPluginInstance, zoomPluginInstance]}
            />
          </div>
       
      </Worker> */}
          <div className="w-full px-1 h-full">
      <iframe
        src={url}
        className="w-full h-full border rounded"
        title="PDF Viewer"
      ></iframe>
    </div>
    </div>
  );
};

export default PdfViewer;
