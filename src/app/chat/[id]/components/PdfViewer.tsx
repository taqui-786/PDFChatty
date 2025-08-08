'use client';



const PdfViewer = ({ url }: { url: string }) => {


  return (
    <div className="h-full w-full overflow-hidden border rounded shadow">

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
