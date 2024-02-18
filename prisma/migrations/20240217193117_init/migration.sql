/*
  Warnings:

  - You are about to drop the column `first_name` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `middle_name` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `school` table. All the data in the column will be lost.
  - You are about to drop the column `schoolName` on the `school` table. All the data in the column will be lost.
  - You are about to drop the column `sectionName` on the `section` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UserId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UserId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `School_schoolId_key` ON `school`;

-- DropIndex
DROP INDEX `Section_sectionName_key` ON `section`;

-- DropIndex
DROP INDEX `Student_email_key` ON `student`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    DROP COLUMN `middle_name`,
    ADD COLUMN `UserId` INTEGER NOT NULL,
    ADD COLUMN `department` JSON NOT NULL,
    ADD COLUMN `schoolId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `school` DROP COLUMN `schoolId`,
    DROP COLUMN `schoolName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `section` DROP COLUMN `sectionName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `schoolId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `email`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `middleName`,
    DROP COLUMN `role`,
    ADD COLUMN `UserId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `role` ENUM('STUDENT', 'ADMIN') NOT NULL DEFAULT 'STUDENT',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Facility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `schoolId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `department` ENUM('SCIENCE', 'MATH', 'MAPEH', 'MISC', 'LANGUAGE') NOT NULL DEFAULT 'MISC',
    `blockedDates` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `schoolId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `department` ENUM('SCIENCE', 'MATH', 'MAPEH', 'MISC', 'LANGUAGE') NOT NULL DEFAULT 'MISC',
    `blockedDates` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `isAllowed` BOOLEAN NOT NULL DEFAULT false,
    `requestDates` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FacilityToAdmin` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FacilityToAdmin_AB_unique`(`A`, `B`),
    INDEX `_FacilityToAdmin_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AdminToRequest` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AdminToRequest_AB_unique`(`A`, `B`),
    INDEX `_AdminToRequest_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FacilityToRequest` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FacilityToRequest_AB_unique`(`A`, `B`),
    INDEX `_FacilityToRequest_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EquipmentToRequest` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EquipmentToRequest_AB_unique`(`A`, `B`),
    INDEX `_EquipmentToRequest_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_StudentToRequest` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_StudentToRequest_AB_unique`(`A`, `B`),
    INDEX `_StudentToRequest_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_UserId_key` ON `Admin`(`UserId`);

-- CreateIndex
CREATE UNIQUE INDEX `Section_name_key` ON `Section`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_UserId_key` ON `Student`(`UserId`);

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facility` ADD CONSTRAINT `Facility_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipment` ADD CONSTRAINT `Equipment_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FacilityToAdmin` ADD CONSTRAINT `_FacilityToAdmin_A_fkey` FOREIGN KEY (`A`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FacilityToAdmin` ADD CONSTRAINT `_FacilityToAdmin_B_fkey` FOREIGN KEY (`B`) REFERENCES `Facility`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdminToRequest` ADD CONSTRAINT `_AdminToRequest_A_fkey` FOREIGN KEY (`A`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdminToRequest` ADD CONSTRAINT `_AdminToRequest_B_fkey` FOREIGN KEY (`B`) REFERENCES `Request`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FacilityToRequest` ADD CONSTRAINT `_FacilityToRequest_A_fkey` FOREIGN KEY (`A`) REFERENCES `Facility`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FacilityToRequest` ADD CONSTRAINT `_FacilityToRequest_B_fkey` FOREIGN KEY (`B`) REFERENCES `Request`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentToRequest` ADD CONSTRAINT `_EquipmentToRequest_A_fkey` FOREIGN KEY (`A`) REFERENCES `Equipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentToRequest` ADD CONSTRAINT `_EquipmentToRequest_B_fkey` FOREIGN KEY (`B`) REFERENCES `Request`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentToRequest` ADD CONSTRAINT `_StudentToRequest_A_fkey` FOREIGN KEY (`A`) REFERENCES `Request`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentToRequest` ADD CONSTRAINT `_StudentToRequest_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
