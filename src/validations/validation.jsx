import { z } from "zod";

export const userLogin = z
    .object({
        email: z
            .string({
                required_error: "Email wajib diisi!",
            })
            .email({ message: "Email tidak valid" }),
        password: z
            .string({
                required_error: "Password wajib diisi",
                invalid_type_error:
                    "Password wajib terdiri dari minimal 6 karakter & maksimal 20 karakter!",
            })
            .min(1, { message: "Password wajib diisi!" }),
    });


export const userRegistration = z
    .object({
        nama_lengkap: z
            .string({
                required_error: "Nama Lengkap wajib diisi",
                invalid_type_error:
                    "Nama Lengkap wajib terdiri dari minimal 3 karakter & maksimal 50 karakter!",
            })
            .min(3, { message: "Nama Lengkap wajib terdiri dari minimal 3 karakter" })
            .max(50, { message: "Nama Lengkap maksimal 50 karakter" }),
        username: z
            .string({
                required_error: "Username wajib diisi",
                invalid_type_error:
                    "Username wajib terdiri dari minimal 3 karakter & maksimal 15 karakter!",
            })
            .min(6, { message: "Username wajib terdiri dari minimal 6 karakter" })
            .max(15, { message: "Username maksimal 15 karakter" }),
        email: z
            .string({
                required_error: "Email wajib diisi!",
            })
            .email({ message: "Email tidak valid" }),
        no_telp: z
            .string({
                invalid_type_error:
                    "Nomor Telepon wajib terdiri dari minimal 10 angka & maksimal 15 angka!",
            })
            .min(10, { message: "Nomor Telepon minimal 10 angka" })
            .max(15, { message: "Nomor Telepon maksimal 15 angka" })
            .refine((value) => parseFloat(value) > 0, { message: "Nomor Telepon Tidak Valid!" }),
        gender: z
            .string()
            .min(1, { message: "Jenis Kelamin harus dipilih" }),
        tanggal_lahir: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Format Tanggal Lahir tidak valid (YYYY-MM-DD)" }),
        password: z
            .string({
                required_error: "Password wajib diisi",
                invalid_type_error:
                    "Password wajib terdiri dari minimal 8 karakter & maksimal 20 karakter!",
            })
            .min(8, { message: "Password minimal 8 karakter" })
            .max(20, { message: "Password maksimal 20 karakter" }),

        confirmPassword: z.string()
            .min(6, { message: "Password minimal 6 karakter" })
            .max(20, { message: "Password maksimal 20 karakter" }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Tidak sesuai dengan Password yang diinputkan! ",
            });
        }
    });


export const forgotPassword = z
    .object({
        email: z
            .string({
                required_error: "Email wajib diisi!",
            })
            .email({ message: "Email tidak valid" }),
    });


export const addNewPassword = z
    .object({
        password: z
            .string({
                required_error: "Password wajib diisi",
                invalid_type_error:
                    "Password wajib terdiri dari minimal 8 karakter & maksimal 20 karakter!",
            })
            .min(8, { message: "Password minimal 8 karakter" })
            .max(20, { message: "Password maksimal 20 karakter" }),

        password_confirmation: z.string()
            .min(8, { message: "Password minimal 8 karakter" })
            .max(20, { message: "Password maksimal 20 karakter" }),
    })
    .superRefine(({ password, password_confirmation }, ctx) => {
        if (password !== password_confirmation) {
            ctx.addIssue({
                code: "custom",
                path: ["password_confirmation"],
                message: "Password Tidak Sesuai",
            });
        }
    });


export const penitip = z
    .object({
        nama_penitip: z
            .string({
                required_error: "Nama Lengkap wajib diisi",
                invalid_type_error:
                    "Nama Lengkap wajib terdiri dari minimal 3 karakter & maksimal 50 karakter!",
            })
            .min(3, { message: "Nama Lengkap wajib terdiri dari minimal 3 karakter" })
            .max(50, { message: "Nama Lengkap maksimal 50 karakter" }),
        no_telp_penitip: z
            .string({
                invalid_type_error:
                    "Nomor Telepon wajib terdiri dari minimal 10 angka & maksimal 15 angka!",
            })
            .min(10, { message: "Nomor Telepon minimal 10 angka" })
            .max(15, { message: "Nomor Telepon maksimal 15 angka" })
            .refine((value) => parseFloat(value) > 0, { message: "Nomor Telepon Tidak Valid!" }),
        alamat: z
            .string({
                required_error: "Username wajib diisi",
                invalid_type_error:
                    "Username wajib terdiri dari minimal 3 karakter & maksimal 15 karakter!",
            })
            .min(6, { message: "Alamat wajib terdiri dari minimal 6 karakter" })
            .max(50, { message: "Alamat maksimal 50 karakter" }),
    });


export const staff = z
    .object({
        username: z
            .string({
                required_error: "Username wajib diisi",
                invalid_type_error:
                    "Username wajib terdiri dari minimal 3 karakter & maksimal 50 karakter!",
            })
            .min(3, { message: "Username wajib terdiri dari minimal 3 karakter" })
            .max(50, { message: "Username maksimal 50 karakter" }),
        nama_lengkap: z
            .string({
                required_error: "Nama Lengkap wajib diisi",
                invalid_type_error:
                    "Nama Lengkap wajib terdiri dari minimal 3 karakter & maksimal 50 karakter!",
            })
            .min(3, { message: "Nama Lengkap wajib terdiri dari minimal 3 karakter" })
            .max(50, { message: "Nama Lengkap maksimal 50 karakter" }),
        no_telp: z
            .string({
                invalid_type_error:
                    "Nomor Telepon wajib terdiri dari minimal 10 angka & maksimal 15 angka!",
            })
            .min(10, { message: "Nomor Telepon minimal 10 angka" })
            .max(15, { message: "Nomor Telepon maksimal 15 angka" })
            .refine((value) => parseFloat(value) > 0, { message: "Nomor Telepon Tidak Valid!" }),
        email: z
            .string({
                required_error: "Email wajib diisi!",
            })
            .email({ message: "Email tidak valid" }),
        gender: z.string({
            invalid_type_error:
                "Gender Wajib Diisi",
        })
            .min(1, { message: "Gender Wajib Diisi" }),
        tanggal_lahir: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Format Tanggal Lahir tidak valid (YYYY-MM-DD)" }),
        jabatan: z
            .string({
                invalid_type_error:
                    "Jabatan Wajib Diisi",
            })
            .min(1, { message: "Jabatan Wajib Diisi" }),
    });



export const bahanBaku = z
    .object({
        nama_bahan: z
            .string({
                required_error: "Nama Bahan wajib diisi",
                invalid_type_error:
                    "Nama Bahan wajib diisi!",
            })
            .min(1, { message: "Nama Bahan wajib diisi!" }),
        jumlah: z
            .string({
                invalid_type_error:
                    "Jumlah Wajib Diisi!",
            })
            .min(1, { message: "Jumlah Wajib Diisi!" })
            .refine((value) => parseFloat(value) > 0, { message: "Jumlah harus lebih dari 0" }),

        harga_beli: z
            .string({
                invalid_type_error:
                    "Jumlah Wajib Diisi!",
            })
            .min(1, { message: "Jumlah Wajib Diisi!" })
            .refine((value) => parseFloat(value) > 0, { message: "Harga beli harus lebih dari 0" }),
        satuan: z
            .string({
                required_error: "Satuan wajib diisi!",
                invalid_type_error:
                    "Satuan wajib diisi!",
            })
            .min(1, { message: "Satuan wajib diisi!" }),


    });


export const pengeluaranLainnya = z
    .object({
        nama_pengeluaran: z
            .string({
                required_error: "Nama Pengeluaran wajib diisi",
                invalid_type_error:
                    "Nama Pengeluaran wajib diisi!",
            })
            .min(1, { message: "Peruntukan Pengeluaran wajib diisi!" }),


        jumlah_pengeluaran: z
            .string({
                invalid_type_error:
                    "Jumlah Wajib Diisi!",
            })
            .min(1, { message: "Total Pengeluaran Wajib Diisi!" })
            .refine((value) => parseFloat(value) > 0, { message: "Total Pengeluaran harus lebih dari 0" }),

    });


export const editProfile = z
    .object({
        nama_lengkap: z
            .string({
                required_error: "Nama Lengkap wajib diisi",
                invalid_type_error:
                    "Nama Lengkap wajib terdiri dari minimal 3 karakter & maksimal 50 karakter!",
            })
            .min(3, { message: "Nama Lengkap wajib terdiri dari minimal 3 karakter" })
            .max(50, { message: "Nama Lengkap maksimal 50 karakter" }),
        username: z
            .string({
                required_error: "Username wajib diisi",
                invalid_type_error:
                    "Username wajib terdiri dari minimal 3 karakter & maksimal 15 karakter!",
            })
            .min(6, { message: "Username wajib terdiri dari minimal 6 karakter" })
            .max(15, { message: "Username maksimal 15 karakter" }),
        email: z
            .string({
                required_error: "Email wajib diisi!",
            })
            .email({ message: "Email tidak valid" }),
        no_telp: z
            .string({
                invalid_type_error:
                    "Nomor Telepon wajib terdiri dari minimal 10 angka & maksimal 15 angka!",
            })
            .min(10, { message: "Nomor Telepon minimal 10 angka" })
            .max(15, { message: "Nomor Telepon maksimal 15 angka" })
            .refine((value) => parseFloat(value) > 0, { message: "Nomor Telepon Tidak Valid!" }),
        gender: z
            .string()
            .min(1, { message: "Jenis Kelamin harus dipilih" }),
        tanggal_lahir: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Format Tanggal Lahir tidak valid (YYYY-MM-DD)" }),
    })

export const bahanBakuAdmin = z
    .object({
        nama_bahan: z
            .string({
                required_error: "Nama Bahan wajib diisi",
                invalid_type_error:
                    "Nama Bahan wajib diisi!",
            })
            .min(1, { message: "Nama Bahan wajib diisi!" }),
        satuan: z
            .string({
                required_error: "Satuan wajib diisi!",
                invalid_type_error:
                    "Satuan wajib diisi!",
            })
            .min(1, { message: "Satuan wajib diisi!" }),
    });

export const resepAdmin = z
    .object({
  
        nama_bahan: z
            .string({
                required_error: "Nama Resep wajib diisi",
                invalid_type_error:
                    "Nama Resep wajib diisi!",
            })
            .min(1, { message: "Nama Resep wajib diisi!" }),
        jumlah_bahan: z
            .string({
                invalid_type_error:
                    "Jumlah Kebutuhan Wajib Diisi!",
            })
            .min(1, { message: "Jumlah Kebutuhan Wajib Diisi!" })
            .refine((value) => parseFloat(value) > 0, { message: "Jumlah Kebutuhan harus lebih dari 0" }),

    });

export const gajiKaryawan = z
    .object({
        gaji: z
            .string({
                invalid_type_error:
                    "Gaji Wajib Diisi!",
            })
            .min(1, { message: "Gaji Wajib Diisi!" })
            .refine((value) => parseFloat(value) > 0, { message: "Gaji harus lebih dari 0" }),
        bonus_gaji: z
            .string({
                invalid_type_error:
                    "Bonus Gaji Wajib Diisi!",
            })
            .min(1, { message: "Bonus Gaji Wajib Diisi!" })
            .refine((value) => parseFloat(value) > 0, { message: "Bonus Gaji harus lebih dari 0" }),
    });

export const editAlamat = z
    .object({
        provinsi: z
        .string({
            required_error: "Provinsi wajib diisi",
            invalid_type_error:
                "Provinsi wajib diisi!",
        })
        .min(1, { message: "Provinsi wajib diisi!" }),
        kabupaten: z
        .string({
            required_error: "Kabupaten wajib diisi",
            invalid_type_error:
                "Kabupaten wajib diisi!",
        })
        .min(1, { message: "Kabupaten wajib diisi!" }),
        kecamatan: z
        .string({
            required_error: "Kecamatan wajib diisi",
            invalid_type_error:
                "Kecamatan wajib diisi!",
        })
        .min(1, { message: "Kecamatan wajib diisi!" }),
        kelurahan: z
        .string({
            required_error: "Kelurahan wajib diisi",
            invalid_type_error:
                "Kelurahan wajib diisi!",
        })
        .min(1, { message: "Kelurahan wajib diisi!" }),
        detail_alamat: z
        .string({
            required_error: "Detail Alamat wajib diisi",
            invalid_type_error:
                "Detail Alamat wajib diisi!",
        })
        .min(1, { message: "Detail Alamat wajib diisi!" }),
        kode_pos: z
        .string({
            required_error: "Kode Pos wajib diisi",
            invalid_type_error:
                "Kode Pos wajib diisi!",
        })
        .min(5, { message: "Kode Pos minimal 5 digit!" }),
    });

export const ValidasiRadius = z.object({
    radius: z
        .string({
            invalid_type_error: "Jarak Wajib Diisi!",
        })
        .min(1, { message: "Jarak Wajib Diisi!" })
        .refine((value) => parseFloat(value) > 0, { message: "Jarak harus lebih dari 0" }),
});

export const ValidasiPembayaran = z.object({
    jumlah_pembayaran: z
        .string({
            invalid_type_error: "Jumlah Pembayaran Wajib Diisi!",
        })
        .min(1, { message: "Jumlah Pembayaran Wajib Diisi!" })
        .refine((value) => parseFloat(value) > 0, { message: "Jumlah Pembayaran harus lebih dari 0" }),
});

export const pembayaranCustomer = z.object({
    bukti_pembayaran: z
        .instanceof(File)
            .refine((file) => file.type.startsWith("image/"), {
                message: "File harus berupa gambar",
            })
            .refine((file) => file.size <= 1048576, {
                message: "Ukuran gambar tidak boleh melebihi 1MB",
            }),
});