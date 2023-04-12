CREATE TABLE `peserta_cimpa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `klasis` varchar(255) NOT NULL,
  `runggun` varchar(255) NOT NULL,
  `id_peserta` varchar(255) NOT NULL,
  `jenis_kelamin` varchar(255) NOT NULL,
  `no_telp` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `size_baju` varchar(255) NOT NULL,
  `link_sosmed` varchar(255) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `bukti_bayar` varchar(255) NOT NULL,
  `is_confirmed` TINYINT(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `akun_cimpa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `klasis` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `bukti_bayar` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bukti_bayar` varchar(255) DEFAULT NULL,
  `klasis` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
