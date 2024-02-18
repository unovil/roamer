/*
  Warnings:

  - You are about to drop the column `grade_level` on the `sections` table. All the data in the column will be lost.
  - You are about to drop the column `section_name` on the `sections` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `middle_name` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sectionName]` on the table `Sections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `grade` to the `Sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionName` to the `Sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionId` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Sections_section_name_key` ON `sections`;

-- AlterTable
ALTER TABLE `sections` DROP COLUMN `grade_level`,
    DROP COLUMN `section_name`,
    ADD COLUMN `grade` INTEGER NOT NULL,
    ADD COLUMN `sectionName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `students` DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    DROP COLUMN `middle_name`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `middleName` VARCHAR(191) NULL,
    ADD COLUMN `sectionId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Sections_sectionName_key` ON `Sections`(`sectionName`);

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Sections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
