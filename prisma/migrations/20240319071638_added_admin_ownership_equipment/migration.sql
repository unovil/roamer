-- CreateTable
CREATE TABLE `_EquipmentToAdmin` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EquipmentToAdmin_AB_unique`(`A`, `B`),
    INDEX `_EquipmentToAdmin_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EquipmentToAdmin` ADD CONSTRAINT `_EquipmentToAdmin_A_fkey` FOREIGN KEY (`A`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentToAdmin` ADD CONSTRAINT `_EquipmentToAdmin_B_fkey` FOREIGN KEY (`B`) REFERENCES `Equipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
