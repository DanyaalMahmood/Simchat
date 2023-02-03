-- CreateTable
CREATE TABLE "_usertouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_usertouser_AB_unique" ON "_usertouser"("A", "B");

-- CreateIndex
CREATE INDEX "_usertouser_B_index" ON "_usertouser"("B");

-- AddForeignKey
ALTER TABLE "_usertouser" ADD CONSTRAINT "_usertouser_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_usertouser" ADD CONSTRAINT "_usertouser_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
