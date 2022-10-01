/*
  Warnings:

  - You are about to alter the column `user_id` on the `board` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `user_id` on the `comment` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - You are about to alter the column `user_id` on the `like_rel` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.

*/
-- DropForeignKey
ALTER TABLE `board` DROP FOREIGN KEY `board_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `like_rel` DROP FOREIGN KEY `like_rel_user_id_fkey`;

-- AlterTable
ALTER TABLE `board` MODIFY `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `comment` MODIFY `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `like_rel` MODIFY `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `board` ADD CONSTRAINT `board_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like_rel` ADD CONSTRAINT `like_rel_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
