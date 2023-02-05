-- AlterTable
CREATE SEQUENCE messages_id_seq;
ALTER TABLE "Messages" ALTER COLUMN "id" SET DEFAULT nextval('messages_id_seq');
ALTER SEQUENCE messages_id_seq OWNED BY "Messages"."id";
