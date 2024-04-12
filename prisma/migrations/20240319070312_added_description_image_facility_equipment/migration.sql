/*
  Warnings:

  - Added the required column `description` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Facility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Facility` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `equipment` ADD COLUMN `description` TINYTEXT NOT NULL,
    ADD COLUMN `image` BLOB NOT NULL;

-- AlterTable
ALTER TABLE `facility` ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `image` BLOB NOT NULL;
