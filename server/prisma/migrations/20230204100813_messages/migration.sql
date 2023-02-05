-- CreateTable
CREATE TABLE "Messages" (
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentby" INTEGER NOT NULL,
    "sentto" INTEGER NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("sentby")
);

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_sentby_fkey" FOREIGN KEY ("sentby") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_sentto_fkey" FOREIGN KEY ("sentto") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
