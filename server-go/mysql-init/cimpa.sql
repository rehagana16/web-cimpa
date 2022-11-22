CREATE TABLE `peserta_cimpa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  `klasis` varchar(255) DEFAULT NULL,
  `runggun` varchar(255) DEFAULT NULL,
  `id_peserta` varchar(255) DEFAULT NULL,
  `jenis_kelamin` varchar(255) DEFAULT NULL,
  `no_telp` varchar(255) DEFAULT NULL,
  `link_sosmed` varchar(255) DEFAULT NULL,
  `bukti_bayar` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `is_confirmed` TINYINT(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;