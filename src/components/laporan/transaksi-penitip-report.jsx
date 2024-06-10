import React, { useRef } from "react";
import { Typography } from "@material-tailwind/react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";

export function TransaksiPenitipReport({ data }) {
    console.log(data);
    const componentRef = useRef();  

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleDownloadPdf = () => {
        const doc = new jsPDF();

        data.data.forEach((penitip, i) => {
            if (i !== 0) {
                doc.addPage();
            }

            // Set font size and text alignment
            doc.setFontSize(15);
            doc.setTextColor(0);

            // Text to be left-aligned
            const textLines = [
                "Atma Kitchen",
                "Jl. Centralpark No. 10 Yogyakarta",
                "",
                "LAPORAN TRANSAKSI PENITIP",
                `ID Penitip : ${penitip.id_penitip}`,
                `Nama Penitip : ${penitip.nama_penitip}`,
                `Bulan : ${penitip.bulan}`,
                `Tahun : ${penitip.tahun}`,
                `Tanggal cetak : ${penitip.tanggal_cetak}`
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

            const tableColumn = ["Nama Produk", "Qty", "Harga Jual", "Total", "20% Komisi", "Yang Diterima"];
            const tableRows = [];

            penitip.data.forEach(({ nama_produk, qty, harga_jual, total, komisi, yang_diterima }) => {
                const rowData = [
                    nama_produk,
                    qty,
                    harga_jual !== undefined ? harga_jual.toLocaleString('id-ID') : '',
                    total !== undefined ? total.toLocaleString('id-ID') : '',
                    komisi !== undefined ? komisi.toLocaleString('id-ID') : '',
                    yang_diterima !== undefined ? yang_diterima.toLocaleString('id-ID') : ''
                ];
                tableRows.push(rowData);
            });

            doc.autoTable(tableColumn, tableRows, { startY: tableStartY });
        });

        doc.save("laporan_transaksi_penitip.pdf");
    };

    const tableColumn = ["Nama Produk", "Qty", "Harga Jual", "Total", "20% Komisi", "Yang Diterima"];

    return (
        <div className="p-2">
            <div ref={componentRef}>
                {data.data.map((penitip) => (
                    <div key={penitip.id_penitip} className="my-8 border border-black rounded-md p-2">
                        <div className="mx-7">
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
                                    LAPORAN TRANSAKSI PENITIP
                                </Typography>
                                <Typography variant="body2">
                                    ID Penitip : {penitip.id_penitip}
                                </Typography>
                                <Typography variant="body2">
                                    Nama Penitip : {penitip.nama_penitip}
                                </Typography>
                                <Typography variant="body2">
                                    Bulan : {penitip.bulan}
                                </Typography>
                                <Typography variant="body2">
                                    Tahun : {penitip.tahun}
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
                                    {penitip.data.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="border border-gray-400 py-2 px-4">
                                                <Typography className="text-xs font-[400] text-blue-gray-600">
                                                    {item.nama_produk}
                                                </Typography>
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4">
                                                <Typography className="text-xs font-[400] text-blue-gray-600">
                                                    {item.qty}
                                                </Typography>
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-center">
                                                <Typography className="text-xs font-[400] text-blue-gray-600">
                                                    {item.harga_jual.toLocaleString('id-ID')}
                                                </Typography>
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-center">
                                                <Typography className="text-xs font-[400] text-blue-gray-600">
                                                    {item.total.toLocaleString('id-ID')}
                                                </Typography>
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-center">
                                                <Typography className="text-xs font-[400] text-blue-gray-600">
                                                    {item.komisi.toLocaleString('id-ID')}
                                                </Typography>
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-center">
                                                <Typography className="text-xs font-[400] text-blue-gray-600">
                                                    {item.yang_diterima.toLocaleString('id-ID')}
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
                                                {penitip.total.toLocaleString('id-ID')}
                                            </Typography>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Print</button>
                <button onClick={handleDownloadPdf} className="bg-green-500 text-white py-2 px-4 rounded">Download PDF</button>
            </div>
        </div>
    );
}
