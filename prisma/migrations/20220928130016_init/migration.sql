/*
  Warnings:

  - The primary key for the `board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `board` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `board_id` on the `comment` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `board_id` on the `image` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `board_id` on the `like_rel` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_board_id_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_board_id_fkey`;

-- DropForeignKey
ALTER TABLE `like_rel` DROP FOREIGN KEY `like_rel_board_id_fkey`;

-- AlterTable
ALTER TABLE `board` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `comment` MODIFY `board_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `image` MODIFY `board_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `like_rel` MODIFY `board_id` INTEGER UNSIGNED NOT NULL;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like_rel` ADD CONSTRAINT `like_rel_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
