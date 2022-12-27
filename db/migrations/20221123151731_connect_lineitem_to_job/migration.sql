-- CreateTable
CREATE TABLE "_JobToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobToLineItem_AB_unique" ON "_JobToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToLineItem_B_index" ON "_JobToLineItem"("B");

-- AddForeignKey
ALTER TABLE "_JobToLineItem" ADD CONSTRAINT "_JobToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToLineItem" ADD CONSTRAINT "_JobToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
