import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function generatePdf(previewElement: HTMLElement, fileName: string): Promise<void> {
  // Clone the element to avoid modifying the visible DOM
  const clone = previewElement.cloneNode(true) as HTMLElement

  // Remove highlight styling for clean PDF output
  clone.querySelectorAll('.highlight-var').forEach((el) => {
    ;(el as HTMLElement).style.backgroundColor = 'transparent'
    ;(el as HTMLElement).style.padding = '0'
    ;(el as HTMLElement).style.borderRadius = '0'
  })

  // Set up the clone for rendering
  clone.style.width = '794px' // A4 width in pixels at 96dpi
  clone.style.padding = '48px'
  clone.style.background = 'white'
  clone.style.position = 'absolute'
  clone.style.left = '-9999px'
  clone.style.top = '0'
  document.body.appendChild(clone)

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    })

    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    const pdf = new jsPDF('p', 'mm', 'a4')
    let position = 0
    let remainingHeight = imgHeight

    // First page
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      position,
      imgWidth,
      imgHeight
    )
    remainingHeight -= pageHeight

    // Additional pages if content overflows
    while (remainingHeight > 0) {
      position -= pageHeight
      pdf.addPage()
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight
      )
      remainingHeight -= pageHeight
    }

    pdf.save(fileName)
  } finally {
    document.body.removeChild(clone)
  }
}
