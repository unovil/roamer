/*
  Warnings:

  - You are about to drop the `_equipmenttorequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_facilitytorequest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `equipmentId` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facilityId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_equipmenttorequest` DROP FOREIGN KEY `_EquipmentToRequest_A_fkey`;

-- DropForeignKey
ALTER TABLE `_equipmenttorequest` DROP FOREIGN KEY `_EquipmentToRequest_B_fkey`;

-- DropForeignKey
ALTER TABLE `_facilitytorequest` DROP FOREIGN KEY `_FacilityToRequest_A_fkey`;

-- DropForeignKey
ALTER TABLE `_facilitytorequest` DROP FOREIGN KEY `_FacilityToRequest_B_fkey`;

-- AlterTable
ALTER TABLE `request` ADD COLUMN `equipmentId` INTEGER NOT NULL,
    ADD COLUMN `facilityId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_equipmenttorequest`;

-- DropTable
DROP TABLE `_facilitytorequest`;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_facilityId_fkey` FOREIGN KEY (`facilityId`) REFERENCES `Facility`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `Equipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
