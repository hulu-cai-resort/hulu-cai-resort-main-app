import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."dining_area_type" AS ENUM('dining-area', 'restaurant');
  ALTER TABLE "dining_area" ADD COLUMN "type" "dining_area_type" DEFAULT 'dining-area' NOT NULL;
  ALTER TABLE "map_markers_points" ADD COLUMN "pointer_image_id" integer;
  ALTER TABLE "dining_page" ADD COLUMN "restaurant_title" varchar DEFAULT 'Restaurant' NOT NULL;
  ALTER TABLE "dining_page" ADD COLUMN "restaurant_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL;
  ALTER TABLE "map_markers_points" ADD CONSTRAINT "map_markers_points_pointer_image_id_media_id_fk" FOREIGN KEY ("pointer_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "map_markers_points_pointer_image_idx" ON "map_markers_points" USING btree ("pointer_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "map_markers_points" DROP CONSTRAINT "map_markers_points_pointer_image_id_media_id_fk";
  
  DROP INDEX "map_markers_points_pointer_image_idx";
  ALTER TABLE "dining_area" DROP COLUMN "type";
  ALTER TABLE "map_markers_points" DROP COLUMN "pointer_image_id";
  ALTER TABLE "dining_page" DROP COLUMN "restaurant_title";
  ALTER TABLE "dining_page" DROP COLUMN "restaurant_description";
  DROP TYPE "public"."dining_area_type";`)
}
