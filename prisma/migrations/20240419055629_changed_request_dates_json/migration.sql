-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_equipmentId_fkey`;

-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_facilityId_fkey`;

-- AlterTable
ALTER TABLE `request` MODIFY `equipmentId` INTEGER NULL,
    MODIFY `facilityId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_facilityId_fkey` FOREIGN KEY (`facilityId`) REFERENCES `Facility`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `Equipment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
