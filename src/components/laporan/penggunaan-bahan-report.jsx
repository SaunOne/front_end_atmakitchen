import React, { useRef } from "react";
import { Typography } from "@material-tailwind/react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";

export function PenggunaanBahanReport({ data }) {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleDownloadPdf = () => {
        const doc = new jsPDF();

        // Get page dimensions
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // Set font size and text alignment
        doc.setFontSize(15);
        doc.setTextColor(0);

        // Text to be left-aligned
        const textLines = [
            "Atma Kitchen",
            "Jl. Centralpark No. 10 Yogyakarta",
            "",
            "LAPORAN PENGGUNAAN BAHAN BAKU",
            `Periode: ${data.periode}`,
            `Tanggal cetak: ${data.tanggal_cetak}`
        ];

        // Set the left margin for the text
        const leftMargin = 20; // Adjust as needed

        // Calculate the starting Y position for the text block
        const startY = 20; // Set the startY position manually

        // Loop through textLines array and add text to PDF
        textLines.forEach((text, index) => {
            const textY = startY + (index * 10); // Assuming font size of 10
            doc.text(text, leftMargin, textY);
        });

        // Add space between text and table
        const tableStartY = startY + (textLines.length * 10) + 10; // Add 10 for additional spacing

        const tableColumn = ["Nama Bahan", "Satuan", "Digunakan"];
        const tableRows = [];

        data.data.forEach(({ nama_bahan, satuan, digunakan }) => {
            const rowData = [nama_bahan, satuan, digunakan.toLocaleString('id-ID')];
            tableRows.push(rowData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: tableStartY });
        doc.save("laporan_penggunaan_bahan.pdf");
    };


    return (
        <div>
            <div className="mx-7" ref={componentRef}>
                <div className="mb-4 text-start text-[20px] ">
                    <Typography variant="h2" className="font-bold">
                        Atma Kitchen
                    </Typography>
                    <Typography variant="body2">
                        Jl. Centralpark No. 10 Yogyakarta
                    </Typography>
                </div>
                <div className="mb-4 text-start text-[20px]">
                    <Typography variant="body2" className="font-bold">
                        LAPORAN PENGGUNAAN BAHAN BAKU
                    </Typography>
                    <Typography variant="body2">
                        Periode: {data.periode}
                    </Typography>
                    <Typography variant="body2">
                        Tanggal cetak: {data.tanggal_cetak}
                    </Typography>
                </div>

                <table className="w-full min-w-[640px] table-auto border-collapse">
                    <thead>
                        <tr>
                            {["Nama Bahan", "Satuan", "Digunakan"].map((el) => (
                                <th
                                    key={el}
                                    className="border border-gray-400 py-2 px-4 text-left bg-gray-100"
                                >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-600"
                                    >
                                        {el}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map(({ nama_bahan, satuan, digunakan }, index) => (
                            <tr key={index}>
                                <td className="border border-gray-400 py-2 px-4">
                                    <Typography className="text-xs font-[400] text-blue-gray-600">
                                        {nama_bahan}
                                    </Typography>
                                </td>
                                <td className="border border-gray-400 py-2 px-4">
                                    <Typography className="text-xs font-[400] text-blue-gray-600">
                                        {satuan}
                                    </Typography>
                                </td>
                                <td className="border border-gray-400 py-2 px-4">
                                    <Typography className="text-xs font-[400] text-blue-gray-600">
                                        {digunakan.toLocaleString('id-ID')}
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Print</button>
                <button onClick={handleDownloadPdf} className="bg-green-500 text-white py-2 px-4 rounded">Download PDF</button>
            </div>
        </div>
    );
}
