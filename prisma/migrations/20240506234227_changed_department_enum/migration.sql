/*
  Warnings:

  - You are about to alter the column `department` on the `equipment` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(2))`.
  - You are about to alter the column `department` on the `facility` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `equipment` MODIFY `department` ENUM('GENERALPURPOSE', 'MAPEH', 'SCIENCE', 'MULTIMEDIA', 'MISCELLANEOUS') NOT NULL DEFAULT 'MISCELLANEOUS';

-- AlterTable
ALTER TABLE `facility` MODIFY `department` ENUM('GENERALPURPOSE', 'MAPEH', 'SCIENCE', 'MULTIMEDIA', 'MISCELLANEOUS') NOT NULL DEFAULT 'MISCELLANEOUS';
