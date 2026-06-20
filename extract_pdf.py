import sys
from pathlib import Path

def extract_pdf_text(pdf_path, out_path='pdf_text.txt'):
    pdf_path = Path(pdf_path)
    out_path = Path(out_path)
    text = []
    # Try pypdf (newer name)
    try:
        import pypdf
        reader = pypdf.PdfReader(str(pdf_path))
        for p in reader.pages:
            t = p.extract_text()
            if t:
                text.append(t)
        out_path.write_text('\n'.join(text), encoding='utf-8')
        print('Extracted using pypdf')
        return 0
    except Exception as e:
        # fallback to PyPDF2
        try:
            import PyPDF2
            reader = PyPDF2.PdfFileReader(str(pdf_path))
            for i in range(reader.numPages):
                t = reader.getPage(i).extractText()
                if t:
                    text.append(t)
            out_path.write_text('\n'.join(text), encoding='utf-8')
            print('Extracted using PyPDF2')
            return 0
        except Exception as e2:
            print('PDF extraction failed:', e)
            return 2

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python extract_pdf.py <path-to-pdf> [out_text_file]')
        sys.exit(1)
    pdf = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else 'pdf_text.txt'
    rc = extract_pdf_text(pdf, out)
    sys.exit(rc)
