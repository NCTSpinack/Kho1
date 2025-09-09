-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 23, 2025 lúc 04:49 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `lopoto`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_nhap`
--

CREATE TABLE `chi_tiet_nhap` (
  `id` int(11) NOT NULL,
  `id_phieu_nhap` int(11) NOT NULL,
  `id_san_pham` int(11) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `don_gia` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_xuat`
--

CREATE TABLE `chi_tiet_xuat` (
  `id` int(11) NOT NULL,
  `id_phieu_xuat` int(11) NOT NULL,
  `id_san_pham` int(11) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `don_gia` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gia_san_pham`
--

CREATE TABLE `gia_san_pham` (
  `id` int(11) NOT NULL,
  `lop_id` int(11) NOT NULL,
  `gia_nhap` decimal(10,2) DEFAULT NULL,
  `gia_cu` decimal(10,2) DEFAULT NULL,
  `giam_gia` decimal(5,2) DEFAULT NULL,
  `gia_ban` decimal(10,2) DEFAULT NULL,
  `ngay_ap_dung` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hinh_anh_san_pham`
--

CREATE TABLE `hinh_anh_san_pham` (
  `id` int(11) NOT NULL,
  `lop_id` int(11) DEFAULT NULL,
  `url_anh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `hinh_anh_san_pham`
--

INSERT INTO `hinh_anh_san_pham` (`id`, `lop_id`, `url_anh`) VALUES
(18, 25, '/images/acquy-atlasbx-12v-40ah.jpg'),
(19, 25, '/images/acquy-atlasbx-12v-40ah-1.jpg'),
(20, 26, '/images/lopcu1.jpg'),
(21, 26, '/images/lopcu2.jpg'),
(22, 26, '/images/lopcu3.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoa_don`
--

CREATE TABLE `hoa_don` (
  `id` int(11) NOT NULL,
  `so_hoa_don` varchar(50) DEFAULT NULL,
  `id_khach_hang` int(11) NOT NULL,
  `id_nguoi_dung` int(11) NOT NULL,
  `id_phieu_xuat` int(11) DEFAULT NULL,
  `ngay_lap` datetime DEFAULT current_timestamp(),
  `tong_tien` decimal(15,2) DEFAULT NULL,
  `giam_gia` decimal(15,2) DEFAULT 0.00,
  `thanh_tien` decimal(15,2) DEFAULT NULL,
  `hinh_thuc_tt` enum('tien_mat','chuyen_khoan','the') DEFAULT NULL,
  `trang_thai` enum('cho_thanh_toan','da_thanh_toan','huy') DEFAULT 'cho_thanh_toan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khach_hang`
--

CREATE TABLE `khach_hang` (
  `id` int(11) NOT NULL,
  `ho_ten` varchar(100) NOT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `dia_chi` text DEFAULT NULL,
  `google_map` varchar(255) DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL,
  `ngay_tao` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kich_thuoc`
--

CREATE TABLE `kich_thuoc` (
  `id` int(11) NOT NULL,
  `ma_kich_thuoc` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `kich_thuoc`
--

INSERT INTO `kich_thuoc` (`id`, `ma_kich_thuoc`) VALUES
(2, '165/60R14'),
(1, '165/65R14'),
(3, '175/50R15'),
(4, '185/55R16'),
(7, '185/60R15'),
(5, '275/70R16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loai_lop`
--

CREATE TABLE `loai_lop` (
  `id` int(11) NOT NULL,
  `ten_loai_lop` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `loai_lop`
--

INSERT INTO `loai_lop` (`id`, `ten_loai_lop`) VALUES
(5, 'lốp cắt'),
(3, 'Lốp cũ'),
(1, 'Lốp mới'),
(2, 'Lốp thanh lý');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoi_dung`
--

CREATE TABLE `nguoi_dung` (
  `id` int(11) NOT NULL,
  `ho_ten` varchar(100) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL,
  `ten_tai_khoan` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `vai_tro` enum('quan_tri','nhan_vien') DEFAULT 'nhan_vien',
  `trang_thai` tinyint(1) DEFAULT 1,
  `ngay_tao` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nha_cung_cap`
--

CREATE TABLE `nha_cung_cap` (
  `id_ncc` int(11) NOT NULL,
  `ten_ncc` varchar(255) NOT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `ma_so_thue` varchar(50) DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL,
  `ngay_tao` datetime DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nha_xe`
--

CREATE TABLE `nha_xe` (
  `id` int(11) NOT NULL,
  `chu_xe` varchar(100) NOT NULL,
  `ten_nha_xe` varchar(100) NOT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL,
  `chuyen_tuyen` varchar(150) DEFAULT NULL,
  `dia_chi` varchar(150) DEFAULT NULL,
  `mo_ta` text DEFAULT NULL,
  `google_map` varchar(255) DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL,
  `hinh_anh` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieu_nhap`
--

CREATE TABLE `phieu_nhap` (
  `id` int(11) NOT NULL,
  `so_phieu` varchar(50) DEFAULT NULL,
  `id_nguoi_dung` int(11) DEFAULT NULL,
  `id_nha_cung_cap` int(11) DEFAULT NULL,
  `ngay_nhap` datetime DEFAULT current_timestamp(),
  `tong_tien` decimal(15,2) DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieu_xuat`
--

CREATE TABLE `phieu_xuat` (
  `id` int(11) NOT NULL,
  `so_phieu` varchar(50) DEFAULT NULL,
  `id_nguoi_dung` int(11) DEFAULT NULL,
  `loai_xuat` enum('ban_hang','bao_hanh','chuyen_kho') DEFAULT 'ban_hang',
  `ngay_xuat` datetime DEFAULT current_timestamp(),
  `tong_tien` decimal(15,2) DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `san_pham`
--

CREATE TABLE `san_pham` (
  `id` int(11) NOT NULL,
  `ten_san_pham` varchar(255) NOT NULL,
  `ma_san_pham` varchar(100) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `so_luong` int(11) DEFAULT 0,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `mo_ta_chi_tiet` text DEFAULT NULL,
  `rating` float DEFAULT 0,
  `luot_xem` int(11) DEFAULT 0,
  `trang_thai` tinyint(1) DEFAULT 1,
  `ngay_tao` datetime DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `san_pham`
--

INSERT INTO `san_pham` (`id`, `ten_san_pham`, `ma_san_pham`, `slug`, `so_luong`, `anh_dai_dien`, `mo_ta_chi_tiet`, `rating`, `luot_xem`, `trang_thai`, `ngay_tao`, `ngay_cap_nhat`) VALUES
(25, 'Ắc quy 40AH AtlasBX 12V Hàn Quốc', 'AQ40AH', 'ac-quy-40ah-atlasbx-han-quoc', 10, '/images/acquy-atlasbx-12v-40ah.jpg', 'Ắc quy phổ thông dành cho xe hơi', 4.5, 10, 1, '2025-08-10 21:11:40', '2025-08-10 21:11:40'),
(26, 'Lốp 275/70R16 Michelin Thanh Lý giá rẻ', 'TL2757016', 'lop-275-70r16-michelin-thanh-ly-gia-re', 10, '/images/lop-michelin-275-70r16.jpg', 'Lốp Michelin 275/70R16 hàng thanh lý giá rẻ, chất lượng tốt.', 4.5, 0, 1, '2025-08-16 16:58:18', '2025-08-16 16:58:18'),
(27, 'Lốp 275/70R16 Michelin Thanh Lý giá rẻ', 'TL2757017', 'lop-275-70r16-michelin-thanh-ly-gia-re-1', 10, '/images/lop-michelin-275-70r16.jpg', 'Lốp Michelin 275/70R16 hàng thanh lý giá rẻ, chất lượng tốt.', 4.5, 0, 1, '2025-08-19 16:58:18', '2025-08-19 16:58:18'),
(28, 'Lốp 275/70R16 Michelin Thanh Lý giá rẻ', 'TL2757018', 'lop-275-70r16-michelin-thanh-ly-gia-re-2', 10, '/images/lop-michelin-275-70r16.jpg', 'Lốp Michelin 275/70R16 hàng thanh lý giá rẻ, chất lượng tốt.', 4.5, 0, 1, '2025-08-19 16:58:18', '2025-08-19 16:58:18'),
(29, 'Lốp 275/70R16 Michelin Thanh Lý giá rẻ', 'TL2757019', 'lop-275-70r16-michelin-thanh-ly-gia-re-3', 10, '/images/lop-michelin-275-70r16.jpg', 'Lốp Michelin 275/70R16 hàng thanh lý giá rẻ, chất lượng tốt.', 4.5, 0, 1, '2025-08-19 16:58:18', '2025-08-19 16:58:18');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thong_so_ac_quy`
--

CREATE TABLE `thong_so_ac_quy` (
  `id` int(11) NOT NULL,
  `san_pham_id` int(11) NOT NULL,
  `thuong_hieu` varchar(100) DEFAULT NULL,
  `dung_luong` varchar(50) DEFAULT NULL,
  `xuat_xu` varchar(50) DEFAULT NULL,
  `dien_ap` varchar(50) DEFAULT '"12V"',
  `loai_ac_quy` varchar(50) DEFAULT '"Ắc quy khô"'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `thong_so_ac_quy`
--

INSERT INTO `thong_so_ac_quy` (`id`, `san_pham_id`, `thuong_hieu`, `dung_luong`, `xuat_xu`, `dien_ap`, `loai_ac_quy`) VALUES
(1, 25, 'AtlasBX', '40AH', 'Hàn Quốc', '12', 'Khô');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thong_so_dau`
--

CREATE TABLE `thong_so_dau` (
  `id` int(11) NOT NULL,
  `san_pham_id` int(11) NOT NULL,
  `thuong_hieu` varchar(50) DEFAULT NULL,
  `xuat_xu` varchar(50) DEFAULT NULL,
  `dung_tich` varchar(50) DEFAULT NULL,
  `do_nhot` varchar(50) DEFAULT NULL,
  `loai_dau` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thong_so_lop`
--

CREATE TABLE `thong_so_lop` (
  `id` int(11) NOT NULL,
  `lop_id` int(11) NOT NULL,
  `kich_thuoc_id` int(11) NOT NULL,
  `thuong_hieu_id` int(11) DEFAULT NULL,
  `loai_lop_id` int(11) DEFAULT NULL,
  `xuat_xu` varchar(50) DEFAULT NULL,
  `nam_sx` varchar(50) DEFAULT NULL,
  `hoa_lop` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `thong_so_lop`
--

INSERT INTO `thong_so_lop` (`id`, `lop_id`, `kich_thuoc_id`, `thuong_hieu_id`, `loai_lop_id`, `xuat_xu`, `nam_sx`, `hoa_lop`) VALUES
(1, 26, 5, 1, 2, NULL, NULL, NULL),
(2, 27, 1, 2, 3, 'Hàn Quốc', '2022', NULL),
(3, 28, 4, 2, 2, 'Hàn Quốc', '2022', NULL),
(4, 29, 3, 2, 2, 'Hàn Quốc', '2022', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thuong_hieu`
--

CREATE TABLE `thuong_hieu` (
  `id` int(11) NOT NULL,
  `ten_thuong_hieu` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `thuong_hieu`
--

INSERT INTO `thuong_hieu` (`id`, `ten_thuong_hieu`) VALUES
(2, 'Brigestone'),
(5, 'Continental'),
(3, 'Dunlop'),
(1, 'Michelin'),
(4, 'Yokohama');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tintuclopoto`
--

CREATE TABLE `tintuclopoto` (
  `id` int(11) NOT NULL,
  `tieu_de` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `tom_tat` varchar(191) DEFAULT NULL,
  `noi_dung` varchar(191) DEFAULT NULL,
  `hinh_anh` varchar(191) DEFAULT NULL,
  `tac_gia` varchar(191) DEFAULT NULL,
  `ngay_dang` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `trang_thai` tinyint(1) NOT NULL DEFAULT 1,
  `luot_xem` int(11) NOT NULL DEFAULT 0,
  `tag` varchar(191) DEFAULT NULL,
  `loai_bai_viet` varchar(191) DEFAULT NULL,
  `ngay_cap_nhat` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tintuclopoto`
--

INSERT INTO `tintuclopoto` (`id`, `tieu_de`, `slug`, `tom_tat`, `noi_dung`, `hinh_anh`, `tac_gia`, `ngay_dang`, `trang_thai`, `luot_xem`, `tag`, `loai_bai_viet`, `ngay_cap_nhat`) VALUES
(1, 'Cách chọn lốp phù hợp với xe', 'cach-chon-lop', 'Hướng dẫn chọn lốp ô tô phù hợp', 'Chi tiết cách chọn lốp theo nhu cầu, thời tiết và đường đi.', '/images/lop.png', 'Admin', '2025-05-27 16:17:49.000', 1, 102, 'lốp, chọn lốp', 'Tư vấn', '2025-08-12 16:29:57.000'),
(2, 'Khi nào cần thay lốp?', 'thay-lop-khi-nao', 'Dấu hiệu cần thay lốp', 'Mòn vân, nứt lốp và mất độ bám là những yếu tố cần lưu ý.', '/images/lopcu1.jpg', 'Admin', '2025-05-27 16:17:49.000', 1, 85, 'bảo dưỡng, an toàn', 'Hướng dẫn', '2025-08-19 16:30:05.000'),
(3, 'So sánh lốp tubeless và có săm', 'so-sanh-lop', 'Ưu nhược điểm 2 loại lốp', 'Lốp không săm bền và tiện hơn, nhưng giá cao hơn.', '/images/lopcu2.jpg', 'Admin', '2025-05-27 16:17:49.000', 1, 93, 'lốp không săm', 'So sánh', '2025-08-19 16:30:11.000'),
(4, 'Top 5 thương hiệu lốp xe tốt', 'top-5-lop', 'Lốp ô tô nào tốt nhất?', 'Michelin, Goodyear, Bridgestone là những thương hiệu hàng đầu.', '/images/lopcu3.jpg', 'Admin', '2025-05-27 16:17:49.000', 1, 110, 'top lốp, thương hiệu', 'Tin tổng hợp', '2025-08-17 16:30:19.000'),
(5, 'Lốp xe có cần đảo định kỳ không?', 'dao-lop', 'Đảo lốp tăng tuổi thọ', 'Giúp lốp mòn đều và vận hành an toàn hơn.', '/images/lopcu4.jpg', 'Admin', '2025-05-27 16:17:49.000', 1, 77, 'đảo lốp, kỹ thuật', 'Tư vấn', '2025-08-10 16:30:26.000'),
(6, 'Áp suất lốp bao nhiêu là đủ?', 'ap-suat-lop', 'Kiểm tra áp suất định kỳ', 'Mỗi dòng xe có khuyến nghị riêng về áp suất lốp.', '/images/1754466668509-185-55r16-3.jpg', 'Admin', '2025-05-27 16:17:49.000', 1, 64, 'áp suất, bảo dưỡng', 'Kỹ thuật', '2025-08-11 16:30:32.000'),
(7, 'Cách đọc ký hiệu trên lốp', 'doc-ky-hieu-lop', 'Ý nghĩa thông số lốp', 'Ví dụ: 195/65R15 cho biết chiều rộng, tỉ lệ và kích thước vành.', '/images/1.jpg', 'Admin', '2025-05-27 16:17:49.000', 1, 95, 'kỹ thuật, thông số', 'Hướng dẫn', '2025-08-11 16:30:38.000'),
(8, 'Lốp ô tô có hạn sử dụng không?', 'han-su-dung-lop', 'Tuổi thọ lốp xe', 'Lốp thường dùng được 5–6 năm, kể cả chưa mòn.', '/images/1.jpg', 'Admin', '2025-05-27 16:17:49.000', 1, 72, 'lốp cũ, thời gian', 'Tư vấn', '2025-08-20 16:30:42.000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `xe_oto`
--

CREATE TABLE `xe_oto` (
  `id` int(11) NOT NULL,
  `hang_xe` varchar(50) DEFAULT NULL,
  `ten_xe` varchar(50) DEFAULT NULL,
  `doi_xe` varchar(50) DEFAULT NULL,
  `dung_tich_xe` varchar(50) DEFAULT NULL,
  `kich_thuoc_lop` varchar(50) DEFAULT NULL,
  `loai_lop` varchar(50) DEFAULT NULL,
  `dung_luong_ac_quy` varchar(50) DEFAULT NULL,
  `loai_coc_ac_quy` varchar(50) DEFAULT NULL,
  `so_lit_dau` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `xe_oto`
--

INSERT INTO `xe_oto` (`id`, `hang_xe`, `ten_xe`, `doi_xe`, `dung_tich_xe`, `kich_thuoc_lop`, `loai_lop`, `dung_luong_ac_quy`, `loai_coc_ac_quy`, `so_lit_dau`) VALUES
(1, 'Hyundai', 'Grand i10', '2016', '1.2L', '165/65R14', 'Lốp thường', '40AH', 'Cọc nhỏ-nổi', '3lit');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('80342491-1aac-46df-87fb-41eb0e1fdd16', '51fd7911fee11aa9a03fad6c8eb33b01e504683dcfbf11e59d6a99f508d5ea45', '2025-05-27 09:09:35.573', '20250527090935_init', NULL, NULL, '2025-05-27 09:09:35.551', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chi_tiet_nhap`
--
ALTER TABLE `chi_tiet_nhap`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_phieu_nhap` (`id_phieu_nhap`),
  ADD KEY `id_san_pham` (`id_san_pham`);

--
-- Chỉ mục cho bảng `chi_tiet_xuat`
--
ALTER TABLE `chi_tiet_xuat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_phieu_xuat` (`id_phieu_xuat`),
  ADD KEY `id_san_pham` (`id_san_pham`);

--
-- Chỉ mục cho bảng `gia_san_pham`
--
ALTER TABLE `gia_san_pham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lop_id` (`lop_id`);

--
-- Chỉ mục cho bảng `hinh_anh_san_pham`
--
ALTER TABLE `hinh_anh_san_pham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lop_id` (`lop_id`);

--
-- Chỉ mục cho bảng `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `so_hoa_don` (`so_hoa_don`),
  ADD KEY `id_khach_hang` (`id_khach_hang`),
  ADD KEY `id_nguoi_dung` (`id_nguoi_dung`),
  ADD KEY `id_phieu_xuat` (`id_phieu_xuat`);

--
-- Chỉ mục cho bảng `khach_hang`
--
ALTER TABLE `khach_hang`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `kich_thuoc`
--
ALTER TABLE `kich_thuoc`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ma_kich_thuoc` (`ma_kich_thuoc`);

--
-- Chỉ mục cho bảng `loai_lop`
--
ALTER TABLE `loai_lop`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ten_loai_lop` (`ten_loai_lop`);

--
-- Chỉ mục cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `nha_cung_cap`
--
ALTER TABLE `nha_cung_cap`
  ADD PRIMARY KEY (`id_ncc`);

--
-- Chỉ mục cho bảng `nha_xe`
--
ALTER TABLE `nha_xe`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `phieu_nhap`
--
ALTER TABLE `phieu_nhap`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `so_phieu` (`so_phieu`),
  ADD KEY `id_nguoi_dung` (`id_nguoi_dung`),
  ADD KEY `phieunhap_fk_ncc` (`id_nha_cung_cap`);

--
-- Chỉ mục cho bảng `phieu_xuat`
--
ALTER TABLE `phieu_xuat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `so_phieu` (`so_phieu`),
  ADD KEY `id_nguoi_dung` (`id_nguoi_dung`);

--
-- Chỉ mục cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `ma_san_pham` (`ma_san_pham`);

--
-- Chỉ mục cho bảng `thong_so_ac_quy`
--
ALTER TABLE `thong_so_ac_quy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `thongso_acquy_fk_sanpham` (`san_pham_id`);

--
-- Chỉ mục cho bảng `thong_so_dau`
--
ALTER TABLE `thong_so_dau`
  ADD PRIMARY KEY (`id`),
  ADD KEY `thongsodau_fk_sanpham` (`san_pham_id`);

--
-- Chỉ mục cho bảng `thong_so_lop`
--
ALTER TABLE `thong_so_lop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lop_id` (`lop_id`),
  ADD KEY `thuonghieu_fk_thongso` (`thuong_hieu_id`),
  ADD KEY `kichthuoc_fk_thongso` (`kich_thuoc_id`),
  ADD KEY `loailop_fk_thongso` (`loai_lop_id`);

--
-- Chỉ mục cho bảng `thuong_hieu`
--
ALTER TABLE `thuong_hieu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ten_thuong_hieu` (`ten_thuong_hieu`);

--
-- Chỉ mục cho bảng `tintuclopoto`
--
ALTER TABLE `tintuclopoto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `TintucLopoto_slug_key` (`slug`);

--
-- Chỉ mục cho bảng `xe_oto`
--
ALTER TABLE `xe_oto`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chi_tiet_nhap`
--
ALTER TABLE `chi_tiet_nhap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `chi_tiet_xuat`
--
ALTER TABLE `chi_tiet_xuat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `gia_san_pham`
--
ALTER TABLE `gia_san_pham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `hinh_anh_san_pham`
--
ALTER TABLE `hinh_anh_san_pham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `hoa_don`
--
ALTER TABLE `hoa_don`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `khach_hang`
--
ALTER TABLE `khach_hang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `kich_thuoc`
--
ALTER TABLE `kich_thuoc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `loai_lop`
--
ALTER TABLE `loai_lop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nha_cung_cap`
--
ALTER TABLE `nha_cung_cap`
  MODIFY `id_ncc` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nha_xe`
--
ALTER TABLE `nha_xe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `phieu_nhap`
--
ALTER TABLE `phieu_nhap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `phieu_xuat`
--
ALTER TABLE `phieu_xuat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `thong_so_ac_quy`
--
ALTER TABLE `thong_so_ac_quy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `thong_so_dau`
--
ALTER TABLE `thong_so_dau`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `thong_so_lop`
--
ALTER TABLE `thong_so_lop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `thuong_hieu`
--
ALTER TABLE `thuong_hieu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `tintuclopoto`
--
ALTER TABLE `tintuclopoto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `xe_oto`
--
ALTER TABLE `xe_oto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chi_tiet_nhap`
--
ALTER TABLE `chi_tiet_nhap`
  ADD CONSTRAINT `chi_tiet_nhap_ibfk_1` FOREIGN KEY (`id_phieu_nhap`) REFERENCES `phieu_nhap` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chi_tiet_nhap_ibfk_2` FOREIGN KEY (`id_san_pham`) REFERENCES `san_pham` (`id`);

--
-- Các ràng buộc cho bảng `chi_tiet_xuat`
--
ALTER TABLE `chi_tiet_xuat`
  ADD CONSTRAINT `chi_tiet_xuat_ibfk_1` FOREIGN KEY (`id_phieu_xuat`) REFERENCES `phieu_xuat` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chi_tiet_xuat_ibfk_2` FOREIGN KEY (`id_san_pham`) REFERENCES `san_pham` (`id`);

--
-- Các ràng buộc cho bảng `gia_san_pham`
--
ALTER TABLE `gia_san_pham`
  ADD CONSTRAINT `gia_san_pham_ibfk_1` FOREIGN KEY (`lop_id`) REFERENCES `san_pham` (`id`);

--
-- Các ràng buộc cho bảng `hinh_anh_san_pham`
--
ALTER TABLE `hinh_anh_san_pham`
  ADD CONSTRAINT `hinh_anh_san_pham_ibfk_1` FOREIGN KEY (`lop_id`) REFERENCES `san_pham` (`id`);

--
-- Các ràng buộc cho bảng `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD CONSTRAINT `hoa_don_ibfk_1` FOREIGN KEY (`id_khach_hang`) REFERENCES `khach_hang` (`id`),
  ADD CONSTRAINT `hoa_don_ibfk_2` FOREIGN KEY (`id_nguoi_dung`) REFERENCES `nguoi_dung` (`id`),
  ADD CONSTRAINT `hoa_don_ibfk_3` FOREIGN KEY (`id_phieu_xuat`) REFERENCES `phieu_xuat` (`id`);

--
-- Các ràng buộc cho bảng `phieu_nhap`
--
ALTER TABLE `phieu_nhap`
  ADD CONSTRAINT `phieu_nhap_ibfk_1` FOREIGN KEY (`id_nguoi_dung`) REFERENCES `nguoi_dung` (`id`),
  ADD CONSTRAINT `phieunhap_fk_ncc` FOREIGN KEY (`id_nha_cung_cap`) REFERENCES `nha_cung_cap` (`id_ncc`);

--
-- Các ràng buộc cho bảng `phieu_xuat`
--
ALTER TABLE `phieu_xuat`
  ADD CONSTRAINT `phieu_xuat_ibfk_1` FOREIGN KEY (`id_nguoi_dung`) REFERENCES `nguoi_dung` (`id`);

--
-- Các ràng buộc cho bảng `thong_so_ac_quy`
--
ALTER TABLE `thong_so_ac_quy`
  ADD CONSTRAINT `thongso_acquy_fk_sanpham` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`);

--
-- Các ràng buộc cho bảng `thong_so_dau`
--
ALTER TABLE `thong_so_dau`
  ADD CONSTRAINT `thongsodau_fk_sanpham` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`);

--
-- Các ràng buộc cho bảng `thong_so_lop`
--
ALTER TABLE `thong_so_lop`
  ADD CONSTRAINT `kichthuoc_fk_thongso` FOREIGN KEY (`kich_thuoc_id`) REFERENCES `kich_thuoc` (`id`),
  ADD CONSTRAINT `loailop_fk_thongso` FOREIGN KEY (`loai_lop_id`) REFERENCES `loai_lop` (`id`),
  ADD CONSTRAINT `thong_so_lop_ibfk_1` FOREIGN KEY (`lop_id`) REFERENCES `san_pham` (`id`),
  ADD CONSTRAINT `thuonghieu_fk_thongso` FOREIGN KEY (`thuong_hieu_id`) REFERENCES `thuong_hieu` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
