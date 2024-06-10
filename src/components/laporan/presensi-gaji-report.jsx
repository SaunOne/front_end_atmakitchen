import React, { useRef } from "react";
import { Typography } from "@material-tailwind/react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";

export function PresensiGajiReport({ data }) {
    console.log(data);
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
            "LAPORAN PRESENSI DAN GAJI PEGAWAI BULANAN",
            `Bulan: ${data.bulan}`,
            `Tahun: ${data.tahun}`,
            `Tanggal cetak: ${data.tanggal_cetak}`
        ];
    
        // Calculate the starting Y position for the text block
        const startY = 20; // Set the startY position manually
    
        // Set left margin
        const leftMargin = 10;
    
        // Loop through textLines array and add text to PDF
        textLines.forEach((text, index) => {
            const textY = startY + (index * 10); // Assuming font size of 10
            doc.text(text, leftMargin, textY);
        });
    
        // Add space between text and table
        const tableStartY = startY + (textLines.length * 10) + 10; // Add 10 for additional spacing
    
        const tableColumn = ["Nama", "Jumlah Hadir", "Jumlah Bolos", "Honor Harian", "Bonus Rajin", "Total"];
        const tableRows = [];
    
        data.data.forEach(({ nama, jumlah_hadir, jumlah_bolos, honor_harian, bonus_gaji, total }) => {
            const rowData = [nama, jumlah_hadir, jumlah_bolos, honor_harian.toLocaleString('id-ID'), bonus_gaji.toLocaleString('id-ID'), total.toLocaleString('id-ID')];
            tableRows.push(rowData);
        });
    
        tableRows.push(["Total", "","", "", "", ]);
    
        doc.autoTable(tableColumn, tableRows, { startY: tableStartY });
        doc.save("laporan_presensi_gaji_pegawai.pdf");
    };
    
    const tableColumn = ["Nama", "Jumlah Hadir", "Jumlah Bolos", "Honor Harian", "Bonus Rajin", "Total"];

    return (
        <div>
            <div className="mx-7" ref={componentRef}>
                <div className="mb-4 text-start text-[20px]">
                    <Typography variant="h6" className="font-bold">
                        Atma Kitchen
                    </Typography>
                    <Typography variant="body2">
                        Jl. Centralpark No. 10 Yogyakarta
                    </Typography>
                </div>
                <div className="mb-4 text-start text-[20px]">
                    <Typography variant="body2" className="font-bold">
                        LAPORAN PRESENSI DAN GAJI PEGAWAI BULANAN
                    </Typography>
                    <Typography variant="body2">
                        Bulan: {data.bulan}
                    </Typography>
                    <Typography variant="body2">
                        Tahun: {data.tahun}
                    </Typography>
                </div>

                <table className="w-full min-w-[640px] table-auto border-collapse">
                    <thead>
                        <tr>
                            {tableColumn.map((el) => (
                                <th
                                    key={el}
                                    className="border border-gray-400 py-2 px-4 text-left bg-gray-100"
                                >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-600 text-center"
                                    >
                                        {el}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-400 py-2 px-4">
                                    <Typography className="text-xs font-[400] text-blue-gray-600">
                                        {item.nama}
                                    </Typography>
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-center">
                                    <Typography className="text-xs font-[400] text-blue-gray-600">
                                        {item.jumlah_hadir}
                                    </Typography>
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-center">
                                    <Typography className="text-xs font-[400] text-blue-gray-600">
                                        {item.jumlah_bolos}
                                    </Typography>
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-center">
                                    <Typography className="text-xs font-[400] text-blue-gray-600">
                                        {item.honor_harian.toLocaleString('id-ID')}
                                    </Typography>
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-center">
                                    <Typography className="text-xs font-[400] text-blue-gray-600">
                                        {item.bonus_gaji.toLocaleString('id-ID')}
                                    </Typography>
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-center">
                                    <Typography className="text-xs font-[400] text-blue-gray-600">
                                        {item.total.toLocaleString('id-ID')}
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={5} className="border border-gray-400 py-2 px-4 text-right">
                                <Typography className="text-xs font-[400] text-blue-gray-600">
                                    Total
                                </Typography>
                            </td>
                            <td className="border border-gray-400 py-2 px-4 text-center">
                                <Typography className="text-xs font-[400] text-blue-gray-600">
                                    {data.total.toLocaleString('id-ID')}
                                </Typography>
                            </td>
                        </tr>
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
