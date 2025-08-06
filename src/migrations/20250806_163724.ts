import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "main_page_promo_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  ALTER TABLE "main_page" ADD COLUMN "promo_section_title" varchar DEFAULT 'Promo';
  ALTER TABLE "main_page" ADD COLUMN "promo_title" varchar DEFAULT 'Promo';
  ALTER TABLE "main_page" ADD COLUMN "promo_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod';
  ALTER TABLE "main_page_promo_image" ADD CONSTRAINT "main_page_promo_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_page_promo_image" ADD CONSTRAINT "main_page_promo_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "main_page_promo_image_order_idx" ON "main_page_promo_image" USING btree ("_order");
  CREATE INDEX "main_page_promo_image_parent_id_idx" ON "main_page_promo_image" USING btree ("_parent_id");
  CREATE INDEX "main_page_promo_image_image_idx" ON "main_page_promo_image" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "main_page_promo_image" CASCADE;
  ALTER TABLE "main_page" DROP COLUMN "promo_section_title";
  ALTER TABLE "main_page" DROP COLUMN "promo_title";
  ALTER TABLE "main_page" DROP COLUMN "promo_description";`)
}
