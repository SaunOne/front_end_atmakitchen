// NotaPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1 solid #000',
    paddingBottom: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '60%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
  },
  tableCol: {
    width: '40%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 10,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

const NotaPDF = ({ notaData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ATMA KITCHEN</Text>
          <Text style={styles.text}>Jl. Centralpark No 10 Yogyakarta</Text>
          <Text style={styles.text}>0883-123-3123</Text>
        </View>
        <Image src="path/to/logo.jpg" style={{ width: 50, height: 50 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subTitle}>PEMESANAN CAKE</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.text}>No Nota : {notaData.id_transaksi}</Text>
            <Text style={styles.text}>Tanggal Pesan : {new Date(notaData.tanggal_pesan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
            <Text style={styles.text}>Lunas Pada : {new Date(notaData.tanggal_pelunasan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
            <Text style={styles.text}>Tanggal Ambil : {new Date(notaData.tanggal_pengambilan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </View>
          <View>
            <Text style={styles.text}>Pemesan :</Text>
            <Text style={styles.text}>{notaData.nama_lengkap}</Text>
            <Text style={styles.text}>{notaData.email}</Text>
            <Text style={{ ...styles.text, width: '20%', wrap: 'pre-wrap' }}>{notaData.alamat}</Text>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>NO</Text>
          <Text style={styles.tableColHeader}>ITEM</Text>
          <Text style={styles.tableColHeader}>JML</Text>
          <Text style={styles.tableColHeader}>SATUAN</Text>
          <Text style={styles.tableColHeader}>TOTAL</Text>
        </View>
        {notaData?.items?.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{index + 1}</Text>
            <Text style={styles.tableCol}>{item.produk}</Text>
            <Text style={styles.tableCol}>{item.jumlah_produk}</Text>
            <Text style={styles.tableCol}>{item.produk.satuan}</Text>
            <Text style={styles.tableCol}>{item.total_harga}</Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <View>
          <Text style={styles.text}>Point dari pesanan ini : {notaData.point_terpakai}</Text>
          <Text style={styles.text}>Total Point Customer : {notaData.point_diperoleh}</Text>
        </View>
        <View style={{ width: '50%' }}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>TOTAL SEBELUM ONGKIR</Text>
              <Text style={styles.tableCol}>{notaData.total_sebelum_ongkir}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>ONGKIR (Rad 5Km)</Text>
              <Text style={styles.tableCol}>{notaData.ongkir}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>TOTAL SETELAH ONGKIR</Text>
              <Text style={styles.tableCol}>{notaData.total_setelah_ongkir}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>POTONGAN POINT</Text>
              <Text style={styles.tableCol}>{notaData.point_terpakai}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>TOTAL</Text>
              <Text style={styles.tableCol}>{notaData.total_harga_transaksi}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>TERIMA KASIH SUDAH BERBELANJA</Text>
      </View>
    </Page>
  </Document>
);

export default NotaPDF;
