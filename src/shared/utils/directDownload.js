import axios from 'axios';
import { END_POINT_DOWNLOAD } from './endPoints';
// import { JWT } from './constants';

const downloadPdf = async (reportId) => {
  if (!reportId) return;

  try {
    const response = await axios.get(
      `${END_POINT_DOWNLOAD}/${reportId}`, {
        // headers: {
        //   Authorization: `Bearer ${JWT}`,
        // },
        responseType: 'blob', // important for file downloads
      });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `report_${reportId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download error:', error);
    alert('Failed to download PDF');
  }
};
export default downloadPdf;
