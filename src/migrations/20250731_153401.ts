import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."accommodations_bed_type" AS ENUM('super-king', 'king', 'queen', 'full-double', 'twin', 'single', 'super-single', 'bunk-bed', 'sleeping-bag');
  CREATE TYPE "public"."accommodations_type" AS ENUM('villa', 'cabin', 'cottage', 'camping_ground');
  CREATE TYPE "public"."accommodations_location" AS ENUM('valley-cibedug', 'hills-babakan');
  CREATE TYPE "public"."enum_accommodations_unit_type" AS ENUM('super-executive', 'executive', 'deluxe', 'superior', 'standard');
  CREATE TYPE "public"."enum_accommodations_cabin_type" AS ENUM('mini', 'junior', 'medium', 'large', 'jumbo');
  CREATE TYPE "public"."enum_accommodations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__accommodations_v_version_unit_type" AS ENUM('super-executive', 'executive', 'deluxe', 'superior', 'standard');
  CREATE TYPE "public"."enum__accommodations_v_version_cabin_type" AS ENUM('mini', 'junior', 'medium', 'large', 'jumbo');
  CREATE TYPE "public"."enum__accommodations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_activities_age_range" AS ENUM('kids-friendly', 'pre-teen-friendly', 'adults-only');
  CREATE TYPE "public"."enum_attractions_age_range" AS ENUM('kids-friendly', 'pre-teen-friendly', 'adults-only');
  CREATE TYPE "public"."meeting_event_area_location" AS ENUM('valley-cibedug', 'hills-babakan');
  CREATE TYPE "public"."meeting_event_area_building_type" AS ENUM('bale', 'ballroom', 'amphitheater');
  CREATE TYPE "public"."meeting_event_area_area_type" AS ENUM('indoor', 'outdoor');
  CREATE TYPE "public"."enum_main_page_activities_icon" AS ENUM('heart-handshake', 'projector', 'tent-tree', 'volleyball', 'tent');
  CREATE TYPE "public"."enum_main_page_social_links_platform" AS ENUM('instagram', 'youtube', 'facebook', 'tiktok');
  CREATE TYPE "public"."enum_main_page_seo_structured_data_organization_type" AS ENUM('TouristAttraction', 'Campground', 'Resort', 'Organization');
  CREATE TYPE "public"."enum_accommodations_page_seo_structured_data_accommodation_type" AS ENUM('LodgingBusiness', 'Campground', 'Resort', 'Hotel');
  CREATE TYPE "public"."enum_villa_page_seo_structured_data_accommodation_type" AS ENUM('Resort', 'LodgingBusiness', 'Hotel');
  CREATE TYPE "public"."enum_cottage_page_seo_structured_data_accommodation_type" AS ENUM('LodgingBusiness', 'Resort', 'BedAndBreakfast');
  CREATE TYPE "public"."enum_cabin_page_seo_structured_data_accommodation_type" AS ENUM('LodgingBusiness', 'Campground', 'Resort');
  CREATE TYPE "public"."enum_camping_ground_page_seo_structured_data_accommodation_type" AS ENUM('Campground', 'RVPark', 'LodgingBusiness');
  CREATE TYPE "public"."enum_attraction_amenities_page_seo_schema_categories_item" AS ENUM('adventure-sports', 'nature-activities', 'family-entertainment', 'outdoor-recreation', 'water-activities', 'hiking-trekking');
  CREATE TYPE "public"."enum_attraction_amenities_page_seo_schema_amenities_item" AS ENUM('restaurant', 'swimming-pool', 'spa-wellness', 'conference-facilities', 'recreation-center', 'parking', 'wifi', 'gift-shop');
  CREATE TYPE "public"."enum_attraction_amenities_page_seo_schema_hours_days_day" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
  CREATE TYPE "public"."enum_attraction_amenities_page_seo_schema_type" AS ENUM('TouristAttraction', 'AmusementPark', 'Resort', 'RecreationCenter');
  CREATE TYPE "public"."enum_attraction_amenities_page_seo_schema_price" AS ENUM('$', '$$', '$$$', '$$$$');
  CREATE TYPE "public"."enum_reservation_faq_page_must_know_section_info_cards_icon" AS ENUM('users', 'clock', 'bath', 'salad');
  CREATE TYPE "public"."enum_reservation_faq_page_contact_section_contacts_type" AS ENUM('whatsapp', 'phone', 'email');
  CREATE TABLE "accommodations_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "accommodations_bed_configuration" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"room_name" varchar,
  	"bed_type" "accommodations_bed_type",
  	"bed_count" numeric DEFAULT 1
  );
  
  CREATE TABLE "accommodations_tent_configuration" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tent_type" varchar,
  	"tent_capacity" varchar,
  	"number_of_tents" numeric
  );
  
  CREATE TABLE "accommodations_other" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amenity" varchar
  );
  
  CREATE TABLE "accommodations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"type" "accommodations_type",
  	"maps_code" varchar,
  	"location" "accommodations_location" DEFAULT 'valley-cibedug',
  	"description" varchar,
  	"unit_type" "enum_accommodations_unit_type",
  	"cabin_type" "enum_accommodations_cabin_type",
  	"size" numeric,
  	"floors" numeric,
  	"floor_location" numeric,
  	"bedrooms" numeric,
  	"ground_capacity" numeric,
  	"min_capacity" numeric,
  	"max_capacity" numeric,
  	"beds" numeric,
  	"extra_beds" numeric,
  	"bathrooms" varchar,
  	"bathrooms_in_bedroom" numeric,
  	"bathrooms_outside" numeric,
  	"rooftop" boolean,
  	"balcony" boolean,
  	"terrace" boolean,
  	"private_pool" boolean,
  	"jacuzzi" boolean,
  	"common_space" boolean,
  	"kitchen" boolean,
  	"dedicated_workspace" boolean,
  	"air_conditioning" boolean,
  	"fan" boolean,
  	"tv" boolean,
  	"smart_tv" boolean,
  	"wifi" boolean,
  	"bathtub" boolean,
  	"shower" boolean,
  	"hot_water" boolean,
  	"body_soap" boolean,
  	"shampoo" boolean,
  	"conditioner" boolean,
  	"towels" boolean,
  	"safe" boolean,
  	"clothing_storage" boolean,
  	"dining_table" boolean,
  	"sofa_lounger" boolean,
  	"stove" boolean,
  	"minibar" boolean,
  	"refrigerator" boolean,
  	"microwave" boolean,
  	"rice_cooker" boolean,
  	"toaster" boolean,
  	"cooking_utensils" boolean,
  	"dishes_silverware" boolean,
  	"hot_water_kettle" boolean,
  	"coffee_maker" boolean,
  	"water_dispenser" boolean,
  	"coffee_tea_sugar" boolean,
  	"price_starting_from" numeric,
  	"price_unit" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_accommodations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_accommodations_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_accommodations_v_version_bed_configuration" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"room_name" varchar,
  	"bed_type" "accommodations_bed_type",
  	"bed_count" numeric DEFAULT 1,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_accommodations_v_version_tent_configuration" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tent_type" varchar,
  	"tent_capacity" varchar,
  	"number_of_tents" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_accommodations_v_version_other" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"amenity" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_accommodations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_type" "accommodations_type",
  	"version_maps_code" varchar,
  	"version_location" "accommodations_location" DEFAULT 'valley-cibedug',
  	"version_description" varchar,
  	"version_unit_type" "enum__accommodations_v_version_unit_type",
  	"version_cabin_type" "enum__accommodations_v_version_cabin_type",
  	"version_size" numeric,
  	"version_floors" numeric,
  	"version_floor_location" numeric,
  	"version_bedrooms" numeric,
  	"version_ground_capacity" numeric,
  	"version_min_capacity" numeric,
  	"version_max_capacity" numeric,
  	"version_beds" numeric,
  	"version_extra_beds" numeric,
  	"version_bathrooms" varchar,
  	"version_bathrooms_in_bedroom" numeric,
  	"version_bathrooms_outside" numeric,
  	"version_rooftop" boolean,
  	"version_balcony" boolean,
  	"version_terrace" boolean,
  	"version_private_pool" boolean,
  	"version_jacuzzi" boolean,
  	"version_common_space" boolean,
  	"version_kitchen" boolean,
  	"version_dedicated_workspace" boolean,
  	"version_air_conditioning" boolean,
  	"version_fan" boolean,
  	"version_tv" boolean,
  	"version_smart_tv" boolean,
  	"version_wifi" boolean,
  	"version_bathtub" boolean,
  	"version_shower" boolean,
  	"version_hot_water" boolean,
  	"version_body_soap" boolean,
  	"version_shampoo" boolean,
  	"version_conditioner" boolean,
  	"version_towels" boolean,
  	"version_safe" boolean,
  	"version_clothing_storage" boolean,
  	"version_dining_table" boolean,
  	"version_sofa_lounger" boolean,
  	"version_stove" boolean,
  	"version_minibar" boolean,
  	"version_refrigerator" boolean,
  	"version_microwave" boolean,
  	"version_rice_cooker" boolean,
  	"version_toaster" boolean,
  	"version_cooking_utensils" boolean,
  	"version_dishes_silverware" boolean,
  	"version_hot_water_kettle" boolean,
  	"version_coffee_maker" boolean,
  	"version_water_dispenser" boolean,
  	"version_coffee_tea_sugar" boolean,
  	"version_price_starting_from" numeric,
  	"version_price_unit" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__accommodations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "activities_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "activities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"location" "accommodations_location" DEFAULT 'valley-cibedug' NOT NULL,
  	"age_range" "enum_activities_age_range",
  	"image_id" integer NOT NULL,
  	"price" numeric NOT NULL,
  	"price_unit" varchar DEFAULT 'per orang',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "attractions_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "attractions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"location" "accommodations_location" DEFAULT 'valley-cibedug' NOT NULL,
  	"age_range" "enum_attractions_age_range",
  	"image_id" integer NOT NULL,
  	"price" numeric NOT NULL,
  	"price_unit" varchar DEFAULT 'per orang',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "amenities_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "amenities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"location" "accommodations_location" DEFAULT 'valley-cibedug' NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dining_area_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "dining_area" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"map_code" varchar,
  	"location" "accommodations_location" DEFAULT 'valley-cibedug' NOT NULL,
  	"image_id" integer NOT NULL,
  	"menu_link" varchar,
  	"group_size_minimum" numeric,
  	"group_size_maximum" numeric,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "meeting_event_area_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "meeting_event_area" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"maps_code" varchar,
  	"location" "meeting_event_area_location",
  	"building_type" "meeting_event_area_building_type",
  	"area_type" "meeting_event_area_area_type",
  	"description" varchar,
  	"size" numeric,
  	"dimensions_width" numeric,
  	"dimensions_length" numeric,
  	"group_size_minimum" numeric,
  	"group_size_maximum" numeric,
  	"price_starting_from" numeric NOT NULL,
  	"price_unit" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "meeting_package_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "meeting_package_package_features_special_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"special_feature" varchar
  );
  
  CREATE TABLE "meeting_package_package_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"price" numeric NOT NULL,
  	"price_period" varchar DEFAULT 'Per pax'
  );
  
  CREATE TABLE "meeting_package" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "games_ground_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "games_ground" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"map_code" varchar,
  	"location" "accommodations_location" DEFAULT 'valley-cibedug' NOT NULL,
  	"image_id" integer NOT NULL,
  	"group_size_ice_braking_capacity" numeric,
  	"group_size_games_capacity" numeric,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "additional_rent_package_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature_title" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"price_period" varchar DEFAULT 'Per day'
  );
  
  CREATE TABLE "additional_rent" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "map_markers_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"lat" numeric NOT NULL,
  	"lng" numeric NOT NULL,
  	"map_code" varchar,
  	"related_accommodation_id" integer,
  	"related_meeting_event_area_id" integer,
  	"related_dining_area_id" integer,
  	"related_attraction_id" integer,
  	"related_amenity_id" integer
  );
  
  CREATE TABLE "map_markers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "customers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"paket_akomodasi" varchar NOT NULL,
  	"jumlah_tamu" numeric NOT NULL,
  	"paket_makan" varchar NOT NULL,
  	"paket_aktivitas" varchar NOT NULL,
  	"tanggal" timestamp(3) with time zone NOT NULL,
  	"keterangan" varchar,
  	"nama" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"nomor_telepon" varchar NOT NULL,
  	"alamat" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"accommodations_id" integer,
  	"activities_id" integer,
  	"attractions_id" integer,
  	"amenities_id" integer,
  	"dining_area_id" integer,
  	"meeting_event_area_id" integer,
  	"meeting_package_id" integer,
  	"games_ground_id" integer,
  	"additional_rent_id" integer,
  	"map_markers_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"customers_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"footer_image_id" integer,
  	"address" varchar DEFAULT 'Jl.Alamat',
  	"phone" varchar DEFAULT '08555555551234',
  	"email" varchar DEFAULT 'hulucaicamp@gmail.com',
  	"instagram_handle" varchar DEFAULT 'Hulucaicamp',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "main_page_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar DEFAULT 'Camping',
  	"image_id" integer NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "main_page_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "main_page_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"message" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "main_page_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "main_page_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" "enum_main_page_activities_icon" NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "main_page_reviews_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "main_page_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"customer_name" varchar NOT NULL,
  	"customer_image_id" integer,
  	"review" varchar NOT NULL,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "main_page_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_main_page_social_links_platform" NOT NULL,
  	"username" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "main_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Welcome to Camp Hulu Cai' NOT NULL,
  	"hero_description" varchar DEFAULT 'Terletak di kaki Gunung Pangrango dengan udara sejuk dan panorama hijau, menciptakan suasana alami dan menyegarkan' NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"services_title" varchar DEFAULT 'Our Services',
  	"about_section_title" varchar DEFAULT 'Place To Go',
  	"about_title" varchar DEFAULT 'Why Nature Feels Better Here',
  	"about_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  	"about_image_id" integer,
  	"packages_section_title" varchar DEFAULT 'Package Vacation',
  	"packages_title" varchar DEFAULT 'Find the Perfect Package for You',
  	"packages_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  	"activities_title" varchar DEFAULT 'Escape the noise. Find your peace together',
  	"activities_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  	"location_section_title" varchar DEFAULT 'Our Location and Facility',
  	"location_title" varchar DEFAULT 'Escape the noise. Find your peace together',
  	"location_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  	"location_image_id" integer,
  	"location_info_place_name" varchar DEFAULT 'Place 1',
  	"location_info_area_name" varchar DEFAULT 'Area Camping',
  	"location_info_address" varchar DEFAULT 'Alamat : JL. Kalpataru No. Malang
  
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  	"reviews_section_title" varchar DEFAULT 'Review Customer',
  	"reviews_title" varchar DEFAULT 'What Our Customer Says',
  	"reviews_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  	"social_section_title" varchar DEFAULT 'Social Media',
  	"social_title" varchar DEFAULT 'Let''s Check this out our Social Media',
  	"social_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor',
  	"social_background_image_id" integer,
  	"seo_title" varchar DEFAULT 'Camp Hulu Cai - Mountain Resort & Camping Experience',
  	"seo_description" varchar DEFAULT 'Experience the ultimate mountain getaway at Camp Hulu Cai. Located at the foot of Mount Pangrango, enjoy fresh air, beautiful scenery, and unforgettable camping adventures.',
  	"seo_keywords" varchar DEFAULT 'camp hulu cai, mountain camping, gunung pangrango, camping resort, outdoor adventure, nature retreat, mountain resort, camping indonesia',
  	"seo_og_image_id" integer,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_structured_data_organization_name" varchar DEFAULT 'Camp Hulu Cai',
  	"seo_structured_data_organization_type" "enum_main_page_seo_structured_data_organization_type" DEFAULT 'TouristAttraction',
  	"seo_structured_data_address_street_address" varchar,
  	"seo_structured_data_address_address_locality" varchar,
  	"seo_structured_data_address_address_region" varchar,
  	"seo_structured_data_address_postal_code" varchar,
  	"seo_structured_data_address_address_country" varchar DEFAULT 'ID',
  	"seo_structured_data_telephone" varchar,
  	"seo_structured_data_email" varchar,
  	"seo_structured_data_price_range" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "map_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Peta Camp Hulu Cai' NOT NULL,
  	"description" varchar DEFAULT 'Peta ini adalah peta dari camp Hulu Cai' NOT NULL,
  	"seo_title" varchar DEFAULT 'Map & Location - Camp Hulu Cai',
  	"seo_description" varchar DEFAULT 'Find your way to Camp Hulu Cai with our interactive map. Located at the foot of Mount Pangrango, discover our facilities, accommodations, and activities layout.',
  	"seo_keywords" varchar DEFAULT 'camp hulu cai map, location, gunung pangrango, camping site map, facilities map, accommodation location, camp layout',
  	"seo_og_image_id" integer,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "accommodations_page_seo_structured_data_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amenity" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Rest. Recharge. Reconnect.' NOT NULL,
  	"hero_description" varchar DEFAULT 'Experience restful nights and peaceful mornings in accommodations surrounded by towering trees and crisp mountain breeze. At Camp Hulu Cai, each room is thoughtfully designed to offer comfort while keeping you connected to the natural beauty just outside your window — the perfect place to rest, recharge, and reconnect.' NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"accommodations_title" varchar DEFAULT 'Our Accommodations' NOT NULL,
  	"seo_title" varchar DEFAULT 'Accommodations - Camp Hulu Cai Mountain Resort',
  	"seo_description" varchar DEFAULT 'Discover comfortable accommodations at Camp Hulu Cai. From cozy cottages to spacious villas, rest and recharge surrounded by nature at Mount Pangrango.',
  	"seo_keywords" varchar DEFAULT 'camp hulu cai accommodations, mountain resort, cottages, villas, camping ground, gunung pangrango lodging, nature accommodation',
  	"seo_og_image_id" integer,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_structured_data_accommodation_type" "enum_accommodations_page_seo_structured_data_accommodation_type" DEFAULT 'LodgingBusiness',
  	"seo_structured_data_check_in_time" varchar,
  	"seo_structured_data_check_out_time" varchar,
  	"seo_structured_data_star_rating" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "villa_page_seo_structured_data_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amenity" varchar NOT NULL
  );
  
  CREATE TABLE "villa_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Villa: Spacious Comfort. Private Serenity.' NOT NULL,
  	"hero_description" varchar DEFAULT 'Experience restful nights and peaceful mornings in accommodations surrounded by towering trees and crisp mountain breeze. At Camp Hulu Cai, each room is thoughtfully designed to offer comfort while keeping you connected to the natural beauty just outside your window — the perfect place to rest, recharge, and reconnect.' NOT NULL,
  	"hero_background_image_id" integer NOT NULL,
  	"show_scroll_indicator" boolean DEFAULT true,
  	"seo_title" varchar DEFAULT 'Villa Accommodations - Camp Hulu Cai Mountain Resort',
  	"seo_description" varchar DEFAULT 'Experience spacious villa accommodations at Camp Hulu Cai. Private, comfortable villas with mountain views, perfect for families and groups seeking luxury in nature.',
  	"seo_keywords" varchar DEFAULT 'camp hulu cai villa, mountain villa, luxury accommodation, family villa, group accommodation, gunung pangrango villa, private villa',
  	"seo_og_image_id" integer,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_structured_data_accommodation_type" "enum_villa_page_seo_structured_data_accommodation_type" DEFAULT 'Resort',
  	"seo_structured_data_max_occupancy" numeric,
  	"seo_structured_data_number_of_rooms" numeric,
  	"seo_structured_data_star_rating" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cottage_page_seo_structured_data_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amenity" varchar NOT NULL
  );
  
  CREATE TABLE "cottage_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Cottage: Quaint Haven, Peaceful Retreat.' NOT NULL,
  	"hero_description" varchar DEFAULT 'Experience restful nights and peaceful mornings in accommodations surrounded by towering trees and crisp mountain breeze. At Camp Hulu Cai, each room is thoughtfully designed to offer comfort while keeping you connected to the natural beauty just outside your window — the perfect place to rest, recharge, and reconnect.' NOT NULL,
  	"hero_background_image_id" integer NOT NULL,
  	"show_scroll_indicator" boolean DEFAULT true,
  	"seo_title" varchar DEFAULT 'Cottage Accommodations - Camp Hulu Cai Mountain Resort',
  	"seo_description" varchar DEFAULT 'Stay in charming cottage accommodations at Camp Hulu Cai. Cozy, quaint cottages offering peaceful retreat surrounded by mountain nature and fresh air.',
  	"seo_keywords" varchar DEFAULT 'camp hulu cai cottage, mountain cottage, cozy accommodation, quaint cottage, nature retreat, gunung pangrango cottage, peaceful stay',
  	"seo_og_image_id" integer,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_structured_data_accommodation_type" "enum_cottage_page_seo_structured_data_accommodation_type" DEFAULT 'LodgingBusiness',
  	"seo_structured_data_max_occupancy" numeric,
  	"seo_structured_data_number_of_rooms" numeric,
  	"seo_structured_data_star_rating" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cabin_page_seo_structured_data_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amenity" varchar NOT NULL
  );
  
  CREATE TABLE "cabin_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Cottage: Quaint Haven, Peaceful Retreat.' NOT NULL,
  	"hero_description" varchar DEFAULT 'Experience restful nights and peaceful mornings in accommodations surrounded by towering trees and crisp mountain breeze. At Camp Hulu Cai, each room is thoughtfully designed to offer comfort while keeping you connected to the natural beauty just outside your window — the perfect place to rest, recharge, and reconnect.' NOT NULL,
  	"hero_background_image_id" integer NOT NULL,
  	"show_scroll_indicator" boolean DEFAULT true,
  	"seo_title" varchar DEFAULT 'Cabin Accommodations - Camp Hulu Cai Mountain Resort',
  	"seo_description" varchar DEFAULT 'Discover rustic cabin accommodations at Camp Hulu Cai. Authentic mountain cabins offering cozy comfort and direct connection with nature at Mount Pangrango.',
  	"seo_keywords" varchar DEFAULT 'camp hulu cai cabin, mountain cabin, rustic accommodation, log cabin, nature cabin, gunung pangrango cabin, wilderness stay',
  	"seo_og_image_id" integer,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_structured_data_accommodation_type" "enum_cabin_page_seo_structured_data_accommodation_type" DEFAULT 'LodgingBusiness',
  	"seo_structured_data_max_occupancy" numeric,
  	"seo_structured_data_number_of_rooms" numeric,
  	"seo_structured_data_star_rating" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "camping_ground_page_seo_structured_data_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amenity" varchar NOT NULL
  );
  
  CREATE TABLE "camping_ground_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Cottage: Quaint Haven, Peaceful Retreat.' NOT NULL,
  	"hero_description" varchar DEFAULT 'Experience restful nights and peaceful mornings in accommodations surrounded by towering trees and crisp mountain breeze. At Camp Hulu Cai, each room is thoughtfully designed to offer comfort while keeping you connected to the natural beauty just outside your window — the perfect place to rest, recharge, and reconnect.' NOT NULL,
  	"hero_background_image_id" integer NOT NULL,
  	"show_scroll_indicator" boolean DEFAULT true,
  	"seo_title" varchar DEFAULT 'Camping Ground - Camp Hulu Cai Mountain Resort',
  	"seo_description" varchar DEFAULT 'Experience authentic camping at Camp Hulu Cai camping grounds. Pitch your tent under the stars with modern facilities and stunning mountain views at Mount Pangrango.',
  	"seo_keywords" varchar DEFAULT 'camp hulu cai camping, mountain camping, camping ground, tent camping, outdoor camping, gunung pangrango camping, nature camping',
  	"seo_og_image_id" integer,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_structured_data_accommodation_type" "enum_camping_ground_page_seo_structured_data_accommodation_type" DEFAULT 'Campground',
  	"seo_structured_data_max_occupancy" numeric,
  	"seo_structured_data_number_of_sites" numeric,
  	"seo_structured_data_star_rating" numeric,
  	"seo_structured_data_pets_allowed" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "attraction_amenities_page_seo_schema_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" "enum_attraction_amenities_page_seo_schema_categories_item" NOT NULL
  );
  
  CREATE TABLE "attraction_amenities_page_seo_schema_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" "enum_attraction_amenities_page_seo_schema_amenities_item" NOT NULL
  );
  
  CREATE TABLE "attraction_amenities_page_seo_schema_hours_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_attraction_amenities_page_seo_schema_hours_days_day" NOT NULL
  );
  
  CREATE TABLE "attraction_amenities_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Experience comfort, adventure, and connection' NOT NULL,
  	"hero_description" varchar DEFAULT 'Experience comfort, adventure, and connection in one nature-filled escape — from cozy glamping tents and campfire nights to sunrise hikes, forest trails, and family-friendly fun. Every corner is designed to bring you closer to nature and closer to each other.' NOT NULL,
  	"hero_image_id" integer,
  	"attractions_title" varchar DEFAULT 'Attraction' NOT NULL,
  	"attractions_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"amenities_title" varchar DEFAULT 'Amenities' NOT NULL,
  	"amenities_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"seo_title" varchar DEFAULT 'Attractions & Amenities - Camp Hulu Cai Mountain Resort',
  	"seo_description" varchar DEFAULT 'Discover amazing attractions and premium amenities at Camp Hulu Cai. From adventure activities to comfortable facilities, experience the perfect mountain getaway at Mount Pangrango.',
  	"seo_keywords" varchar DEFAULT 'camp hulu cai attractions, amenities, mountain activities, facilities, adventure activities, gunung pangrango attractions, resort amenities',
  	"seo_og_image_id" integer,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_schema_type" "enum_attraction_amenities_page_seo_schema_type" DEFAULT 'TouristAttraction',
  	"seo_schema_hours_open" varchar,
  	"seo_schema_hours_close" varchar,
  	"seo_schema_price" "enum_attraction_amenities_page_seo_schema_price",
  	"seo_schema_rating" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "activities_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Unleash the Fun in Nature' NOT NULL,
  	"hero_description" varchar DEFAULT 'Jump into nature-powered adventures that go beyond fun — from outbound games to forest walks and team-building challenges, every activity at Camp Hulu Cai is crafted to spark joy, collaboration, and lasting memories in the great outdoors. Perfect for schools, companies, and families alike.' NOT NULL,
  	"hero_image_id" integer,
  	"activities_title" varchar DEFAULT 'This activity will suits your group well' NOT NULL,
  	"activities_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"reservation_button_text" varchar DEFAULT 'Reservasi',
  	"reservation_button_link" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_image_id" integer,
  	"canonical_url" varchar,
  	"noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "dining_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Experience comfort, adventure, and connection' NOT NULL,
  	"hero_description" varchar DEFAULT 'Jump into nature-powered adventures that go beyond fun — from outbound games to forest walks and team-building challenges, every activity at Camp Hulu Cai is crafted to spark joy, collaboration, and lasting memories in the great outdoors. Perfect for schools, companies, and families alike.' NOT NULL,
  	"hero_image_id" integer,
  	"dining_title" varchar DEFAULT 'This activity will suits your group well' NOT NULL,
  	"dining_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_image_id" integer,
  	"canonical_url" varchar,
  	"noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "events_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Experience comfort, adventure, and connection' NOT NULL,
  	"hero_description" varchar DEFAULT 'Jump into nature-powered adventures that go beyond fun — from outbound games to forest walks and team-building challenges, every activity at Camp Hulu Cai is crafted to spark joy, collaboration, and lasting memories in the great outdoors. Perfect for schools, companies, and families alike.' NOT NULL,
  	"hero_image_id" integer,
  	"meeting_and_event_area_title" varchar DEFAULT 'This activity will suits your group well' NOT NULL,
  	"meeting_and_event_area_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"meeting_and_event_area_outdoor_title" varchar DEFAULT 'Outdoor' NOT NULL,
  	"meeting_and_event_area_outdoor_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"meeting_and_event_area_outdoor_image_id" integer,
  	"meeting_and_event_area_indoor_title" varchar DEFAULT 'Indoor' NOT NULL,
  	"meeting_and_event_area_indoor_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"meeting_and_event_area_indoor_image_id" integer,
  	"meeting_package_title" varchar DEFAULT 'This activity will suits your group well' NOT NULL,
  	"meeting_package_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_image_id" integer,
  	"canonical_url" varchar,
  	"noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "events_indoor_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Experience comfort, adventure, and connection' NOT NULL,
  	"hero_description" varchar DEFAULT 'Jump into nature-powered adventures that go beyond fun — from outbound games to forest walks and team-building challenges, every activity at Camp Hulu Cai is crafted to spark joy, collaboration, and lasting memories in the great outdoors. Perfect for schools, companies, and families alike.' NOT NULL,
  	"hero_image_id" integer,
  	"events_title" varchar DEFAULT 'This activity will suits your group well' NOT NULL,
  	"events_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_image_id" integer,
  	"canonical_url" varchar,
  	"noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "events_outdoor_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Experience comfort, adventure, and connection' NOT NULL,
  	"hero_description" varchar DEFAULT 'Jump into nature-powered adventures that go beyond fun — from outbound games to forest walks and team-building challenges, every activity at Camp Hulu Cai is crafted to spark joy, collaboration, and lasting memories in the great outdoors. Perfect for schools, companies, and families alike.' NOT NULL,
  	"hero_image_id" integer,
  	"events_title" varchar DEFAULT 'This activity will suits your group well' NOT NULL,
  	"events_description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_image_id" integer,
  	"canonical_url" varchar,
  	"noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "reservation_faq_page_must_know_section_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_reservation_faq_page_must_know_section_info_cards_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "reservation_faq_page_faq_section_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "reservation_faq_page_contact_section_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "reservation_faq_page_contact_section_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_reservation_faq_page_contact_section_contacts_type" NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "reservation_faq_page_terms_section_rules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "reservation_faq_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"must_know_section_title" varchar DEFAULT 'Must You Know' NOT NULL,
  	"must_know_section_subtitle" varchar DEFAULT 'Informasi apa saja yang perlu disiapkan?',
  	"must_know_section_description" varchar,
  	"faq_section_title" varchar DEFAULT 'Frequently Asked Questions' NOT NULL,
  	"contact_section_title" varchar DEFAULT 'Narahubung' NOT NULL,
  	"contact_section_subtitle" varchar DEFAULT 'More Than a Trip',
  	"contact_section_description" varchar,
  	"terms_section_title" varchar DEFAULT 'Terms & Condition' NOT NULL,
  	"terms_section_subtitle" varchar DEFAULT 'Peraturan apa saja yang berlaku di Camp Hulu Cai',
  	"terms_section_description" varchar,
  	"reservation_c_t_a_background_image_id" integer,
  	"reservation_c_t_a_icon_id" integer,
  	"reservation_c_t_a_title" varchar DEFAULT 'Build Your Own Experience' NOT NULL,
  	"reservation_c_t_a_subtitle" varchar DEFAULT 'Build Your Own Experience',
  	"reservation_c_t_a_button_text" varchar DEFAULT 'Isi Form Reservasi' NOT NULL,
  	"reservation_c_t_a_button_link" varchar,
  	"seo_title" varchar DEFAULT 'Reservation & FAQ - Camp Hulu Cai',
  	"seo_description" varchar DEFAULT 'Find answers to frequently asked questions about reservations at Camp Hulu Cai. Learn about booking procedures, camp rules, and get in touch with our team.',
  	"seo_keywords" varchar,
  	"seo_og_image_id" integer,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "reservation_form_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Reservation Form' NOT NULL,
  	"hero_description" varchar DEFAULT 'Reservation Form for Camp Hulu Cai' NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"meta_image_id" integer,
  	"canonical_url" varchar,
  	"noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_form" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone_number" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "accommodations_images" ADD CONSTRAINT "accommodations_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations_images" ADD CONSTRAINT "accommodations_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_bed_configuration" ADD CONSTRAINT "accommodations_bed_configuration_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_tent_configuration" ADD CONSTRAINT "accommodations_tent_configuration_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_other" ADD CONSTRAINT "accommodations_other_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accommodations_v_version_images" ADD CONSTRAINT "_accommodations_v_version_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_accommodations_v_version_images" ADD CONSTRAINT "_accommodations_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_accommodations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accommodations_v_version_bed_configuration" ADD CONSTRAINT "_accommodations_v_version_bed_configuration_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_accommodations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accommodations_v_version_tent_configuration" ADD CONSTRAINT "_accommodations_v_version_tent_configuration_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_accommodations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accommodations_v_version_other" ADD CONSTRAINT "_accommodations_v_version_other_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_accommodations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accommodations_v" ADD CONSTRAINT "_accommodations_v_parent_id_accommodations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accommodations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_points" ADD CONSTRAINT "activities_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities" ADD CONSTRAINT "activities_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "attractions_points" ADD CONSTRAINT "attractions_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."attractions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "attractions" ADD CONSTRAINT "attractions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "amenities_points" ADD CONSTRAINT "amenities_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "amenities" ADD CONSTRAINT "amenities_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dining_area_points" ADD CONSTRAINT "dining_area_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dining_area"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dining_area" ADD CONSTRAINT "dining_area_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meeting_event_area_images" ADD CONSTRAINT "meeting_event_area_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meeting_event_area_images" ADD CONSTRAINT "meeting_event_area_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meeting_event_area"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meeting_package_features" ADD CONSTRAINT "meeting_package_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meeting_package"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meeting_package_package_features_special_features" ADD CONSTRAINT "meeting_package_package_features_special_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meeting_package_package_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meeting_package_package_features" ADD CONSTRAINT "meeting_package_package_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meeting_package"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "games_ground_points" ADD CONSTRAINT "games_ground_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."games_ground"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "games_ground" ADD CONSTRAINT "games_ground_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "additional_rent_package_features" ADD CONSTRAINT "additional_rent_package_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."additional_rent"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "map_markers_points" ADD CONSTRAINT "map_markers_points_related_accommodation_id_accommodations_id_fk" FOREIGN KEY ("related_accommodation_id") REFERENCES "public"."accommodations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "map_markers_points" ADD CONSTRAINT "map_markers_points_related_meeting_event_area_id_meeting_event_area_id_fk" FOREIGN KEY ("related_meeting_event_area_id") REFERENCES "public"."meeting_event_area"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "map_markers_points" ADD CONSTRAINT "map_markers_points_related_dining_area_id_dining_area_id_fk" FOREIGN KEY ("related_dining_area_id") REFERENCES "public"."dining_area"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "map_markers_points" ADD CONSTRAINT "map_markers_points_related_attraction_id_attractions_id_fk" FOREIGN KEY ("related_attraction_id") REFERENCES "public"."attractions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "map_markers_points" ADD CONSTRAINT "map_markers_points_related_amenity_id_amenities_id_fk" FOREIGN KEY ("related_amenity_id") REFERENCES "public"."amenities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "map_markers_points" ADD CONSTRAINT "map_markers_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."map_markers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_accommodations_fk" FOREIGN KEY ("accommodations_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_attractions_fk" FOREIGN KEY ("attractions_id") REFERENCES "public"."attractions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_amenities_fk" FOREIGN KEY ("amenities_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dining_area_fk" FOREIGN KEY ("dining_area_id") REFERENCES "public"."dining_area"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_meeting_event_area_fk" FOREIGN KEY ("meeting_event_area_id") REFERENCES "public"."meeting_event_area"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_meeting_package_fk" FOREIGN KEY ("meeting_package_id") REFERENCES "public"."meeting_package"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_games_ground_fk" FOREIGN KEY ("games_ground_id") REFERENCES "public"."games_ground"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_additional_rent_fk" FOREIGN KEY ("additional_rent_id") REFERENCES "public"."additional_rent"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_map_markers_fk" FOREIGN KEY ("map_markers_id") REFERENCES "public"."map_markers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_customers_fk" FOREIGN KEY ("customers_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_footer_image_id_media_id_fk" FOREIGN KEY ("footer_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_page_services" ADD CONSTRAINT "main_page_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_page_services" ADD CONSTRAINT "main_page_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_page_features" ADD CONSTRAINT "main_page_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_page_testimonials" ADD CONSTRAINT "main_page_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_page_testimonials" ADD CONSTRAINT "main_page_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_page_packages" ADD CONSTRAINT "main_page_packages_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_page_packages" ADD CONSTRAINT "main_page_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_page_activities" ADD CONSTRAINT "main_page_activities_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_page_activities" ADD CONSTRAINT "main_page_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_page_reviews_image" ADD CONSTRAINT "main_page_reviews_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_page_reviews_image" ADD CONSTRAINT "main_page_reviews_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_page_reviews" ADD CONSTRAINT "main_page_reviews_customer_image_id_media_id_fk" FOREIGN KEY ("customer_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_page_reviews" ADD CONSTRAINT "main_page_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_page_social_links" ADD CONSTRAINT "main_page_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_page" ADD CONSTRAINT "main_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_page" ADD CONSTRAINT "main_page_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_page" ADD CONSTRAINT "main_page_location_image_id_media_id_fk" FOREIGN KEY ("location_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_page" ADD CONSTRAINT "main_page_social_background_image_id_media_id_fk" FOREIGN KEY ("social_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_page" ADD CONSTRAINT "main_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "map_page" ADD CONSTRAINT "map_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations_page_seo_structured_data_amenities" ADD CONSTRAINT "accommodations_page_seo_structured_data_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_page" ADD CONSTRAINT "accommodations_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations_page" ADD CONSTRAINT "accommodations_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "villa_page_seo_structured_data_amenities" ADD CONSTRAINT "villa_page_seo_structured_data_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."villa_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "villa_page" ADD CONSTRAINT "villa_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "villa_page" ADD CONSTRAINT "villa_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cottage_page_seo_structured_data_amenities" ADD CONSTRAINT "cottage_page_seo_structured_data_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cottage_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cottage_page" ADD CONSTRAINT "cottage_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cottage_page" ADD CONSTRAINT "cottage_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cabin_page_seo_structured_data_amenities" ADD CONSTRAINT "cabin_page_seo_structured_data_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cabin_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cabin_page" ADD CONSTRAINT "cabin_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cabin_page" ADD CONSTRAINT "cabin_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "camping_ground_page_seo_structured_data_amenities" ADD CONSTRAINT "camping_ground_page_seo_structured_data_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."camping_ground_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "camping_ground_page" ADD CONSTRAINT "camping_ground_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "camping_ground_page" ADD CONSTRAINT "camping_ground_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "attraction_amenities_page_seo_schema_categories" ADD CONSTRAINT "attraction_amenities_page_seo_schema_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."attraction_amenities_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "attraction_amenities_page_seo_schema_amenities" ADD CONSTRAINT "attraction_amenities_page_seo_schema_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."attraction_amenities_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "attraction_amenities_page_seo_schema_hours_days" ADD CONSTRAINT "attraction_amenities_page_seo_schema_hours_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."attraction_amenities_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "attraction_amenities_page" ADD CONSTRAINT "attraction_amenities_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "attraction_amenities_page" ADD CONSTRAINT "attraction_amenities_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_page" ADD CONSTRAINT "activities_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_page" ADD CONSTRAINT "activities_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dining_page" ADD CONSTRAINT "dining_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dining_page" ADD CONSTRAINT "dining_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_page" ADD CONSTRAINT "events_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_page" ADD CONSTRAINT "events_page_meeting_and_event_area_outdoor_image_id_media_id_fk" FOREIGN KEY ("meeting_and_event_area_outdoor_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_page" ADD CONSTRAINT "events_page_meeting_and_event_area_indoor_image_id_media_id_fk" FOREIGN KEY ("meeting_and_event_area_indoor_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_page" ADD CONSTRAINT "events_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_indoor_page" ADD CONSTRAINT "events_indoor_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_indoor_page" ADD CONSTRAINT "events_indoor_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_outdoor_page" ADD CONSTRAINT "events_outdoor_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_outdoor_page" ADD CONSTRAINT "events_outdoor_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservation_faq_page_must_know_section_info_cards" ADD CONSTRAINT "reservation_faq_page_must_know_section_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reservation_faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reservation_faq_page_faq_section_faqs" ADD CONSTRAINT "reservation_faq_page_faq_section_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reservation_faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reservation_faq_page_contact_section_images" ADD CONSTRAINT "reservation_faq_page_contact_section_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservation_faq_page_contact_section_images" ADD CONSTRAINT "reservation_faq_page_contact_section_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reservation_faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reservation_faq_page_contact_section_contacts" ADD CONSTRAINT "reservation_faq_page_contact_section_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reservation_faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reservation_faq_page_terms_section_rules" ADD CONSTRAINT "reservation_faq_page_terms_section_rules_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservation_faq_page_terms_section_rules" ADD CONSTRAINT "reservation_faq_page_terms_section_rules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reservation_faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reservation_faq_page" ADD CONSTRAINT "reservation_faq_page_reservation_c_t_a_background_image_id_media_id_fk" FOREIGN KEY ("reservation_c_t_a_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservation_faq_page" ADD CONSTRAINT "reservation_faq_page_reservation_c_t_a_icon_id_media_id_fk" FOREIGN KEY ("reservation_c_t_a_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservation_faq_page" ADD CONSTRAINT "reservation_faq_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservation_form_page" ADD CONSTRAINT "reservation_form_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "accommodations_images_order_idx" ON "accommodations_images" USING btree ("_order");
  CREATE INDEX "accommodations_images_parent_id_idx" ON "accommodations_images" USING btree ("_parent_id");
  CREATE INDEX "accommodations_images_image_idx" ON "accommodations_images" USING btree ("image_id");
  CREATE INDEX "accommodations_bed_configuration_order_idx" ON "accommodations_bed_configuration" USING btree ("_order");
  CREATE INDEX "accommodations_bed_configuration_parent_id_idx" ON "accommodations_bed_configuration" USING btree ("_parent_id");
  CREATE INDEX "accommodations_tent_configuration_order_idx" ON "accommodations_tent_configuration" USING btree ("_order");
  CREATE INDEX "accommodations_tent_configuration_parent_id_idx" ON "accommodations_tent_configuration" USING btree ("_parent_id");
  CREATE INDEX "accommodations_other_order_idx" ON "accommodations_other" USING btree ("_order");
  CREATE INDEX "accommodations_other_parent_id_idx" ON "accommodations_other" USING btree ("_parent_id");
  CREATE INDEX "accommodations_updated_at_idx" ON "accommodations" USING btree ("updated_at");
  CREATE INDEX "accommodations_created_at_idx" ON "accommodations" USING btree ("created_at");
  CREATE INDEX "accommodations__status_idx" ON "accommodations" USING btree ("_status");
  CREATE INDEX "_accommodations_v_version_images_order_idx" ON "_accommodations_v_version_images" USING btree ("_order");
  CREATE INDEX "_accommodations_v_version_images_parent_id_idx" ON "_accommodations_v_version_images" USING btree ("_parent_id");
  CREATE INDEX "_accommodations_v_version_images_image_idx" ON "_accommodations_v_version_images" USING btree ("image_id");
  CREATE INDEX "_accommodations_v_version_bed_configuration_order_idx" ON "_accommodations_v_version_bed_configuration" USING btree ("_order");
  CREATE INDEX "_accommodations_v_version_bed_configuration_parent_id_idx" ON "_accommodations_v_version_bed_configuration" USING btree ("_parent_id");
  CREATE INDEX "_accommodations_v_version_tent_configuration_order_idx" ON "_accommodations_v_version_tent_configuration" USING btree ("_order");
  CREATE INDEX "_accommodations_v_version_tent_configuration_parent_id_idx" ON "_accommodations_v_version_tent_configuration" USING btree ("_parent_id");
  CREATE INDEX "_accommodations_v_version_other_order_idx" ON "_accommodations_v_version_other" USING btree ("_order");
  CREATE INDEX "_accommodations_v_version_other_parent_id_idx" ON "_accommodations_v_version_other" USING btree ("_parent_id");
  CREATE INDEX "_accommodations_v_parent_idx" ON "_accommodations_v" USING btree ("parent_id");
  CREATE INDEX "_accommodations_v_version_version_updated_at_idx" ON "_accommodations_v" USING btree ("version_updated_at");
  CREATE INDEX "_accommodations_v_version_version_created_at_idx" ON "_accommodations_v" USING btree ("version_created_at");
  CREATE INDEX "_accommodations_v_version_version__status_idx" ON "_accommodations_v" USING btree ("version__status");
  CREATE INDEX "_accommodations_v_created_at_idx" ON "_accommodations_v" USING btree ("created_at");
  CREATE INDEX "_accommodations_v_updated_at_idx" ON "_accommodations_v" USING btree ("updated_at");
  CREATE INDEX "_accommodations_v_latest_idx" ON "_accommodations_v" USING btree ("latest");
  CREATE INDEX "_accommodations_v_autosave_idx" ON "_accommodations_v" USING btree ("autosave");
  CREATE INDEX "activities_points_order_idx" ON "activities_points" USING btree ("_order");
  CREATE INDEX "activities_points_parent_id_idx" ON "activities_points" USING btree ("_parent_id");
  CREATE INDEX "activities_image_idx" ON "activities" USING btree ("image_id");
  CREATE INDEX "activities_updated_at_idx" ON "activities" USING btree ("updated_at");
  CREATE INDEX "activities_created_at_idx" ON "activities" USING btree ("created_at");
  CREATE INDEX "attractions_points_order_idx" ON "attractions_points" USING btree ("_order");
  CREATE INDEX "attractions_points_parent_id_idx" ON "attractions_points" USING btree ("_parent_id");
  CREATE INDEX "attractions_image_idx" ON "attractions" USING btree ("image_id");
  CREATE INDEX "attractions_updated_at_idx" ON "attractions" USING btree ("updated_at");
  CREATE INDEX "attractions_created_at_idx" ON "attractions" USING btree ("created_at");
  CREATE INDEX "amenities_points_order_idx" ON "amenities_points" USING btree ("_order");
  CREATE INDEX "amenities_points_parent_id_idx" ON "amenities_points" USING btree ("_parent_id");
  CREATE INDEX "amenities_image_idx" ON "amenities" USING btree ("image_id");
  CREATE INDEX "amenities_updated_at_idx" ON "amenities" USING btree ("updated_at");
  CREATE INDEX "amenities_created_at_idx" ON "amenities" USING btree ("created_at");
  CREATE INDEX "dining_area_points_order_idx" ON "dining_area_points" USING btree ("_order");
  CREATE INDEX "dining_area_points_parent_id_idx" ON "dining_area_points" USING btree ("_parent_id");
  CREATE INDEX "dining_area_image_idx" ON "dining_area" USING btree ("image_id");
  CREATE INDEX "dining_area_updated_at_idx" ON "dining_area" USING btree ("updated_at");
  CREATE INDEX "dining_area_created_at_idx" ON "dining_area" USING btree ("created_at");
  CREATE INDEX "meeting_event_area_images_order_idx" ON "meeting_event_area_images" USING btree ("_order");
  CREATE INDEX "meeting_event_area_images_parent_id_idx" ON "meeting_event_area_images" USING btree ("_parent_id");
  CREATE INDEX "meeting_event_area_images_image_idx" ON "meeting_event_area_images" USING btree ("image_id");
  CREATE INDEX "meeting_event_area_updated_at_idx" ON "meeting_event_area" USING btree ("updated_at");
  CREATE INDEX "meeting_event_area_created_at_idx" ON "meeting_event_area" USING btree ("created_at");
  CREATE INDEX "meeting_package_features_order_idx" ON "meeting_package_features" USING btree ("_order");
  CREATE INDEX "meeting_package_features_parent_id_idx" ON "meeting_package_features" USING btree ("_parent_id");
  CREATE INDEX "meeting_package_package_features_special_features_order_idx" ON "meeting_package_package_features_special_features" USING btree ("_order");
  CREATE INDEX "meeting_package_package_features_special_features_parent_id_idx" ON "meeting_package_package_features_special_features" USING btree ("_parent_id");
  CREATE INDEX "meeting_package_package_features_order_idx" ON "meeting_package_package_features" USING btree ("_order");
  CREATE INDEX "meeting_package_package_features_parent_id_idx" ON "meeting_package_package_features" USING btree ("_parent_id");
  CREATE INDEX "meeting_package_updated_at_idx" ON "meeting_package" USING btree ("updated_at");
  CREATE INDEX "meeting_package_created_at_idx" ON "meeting_package" USING btree ("created_at");
  CREATE INDEX "games_ground_points_order_idx" ON "games_ground_points" USING btree ("_order");
  CREATE INDEX "games_ground_points_parent_id_idx" ON "games_ground_points" USING btree ("_parent_id");
  CREATE INDEX "games_ground_image_idx" ON "games_ground" USING btree ("image_id");
  CREATE INDEX "games_ground_updated_at_idx" ON "games_ground" USING btree ("updated_at");
  CREATE INDEX "games_ground_created_at_idx" ON "games_ground" USING btree ("created_at");
  CREATE INDEX "additional_rent_package_features_order_idx" ON "additional_rent_package_features" USING btree ("_order");
  CREATE INDEX "additional_rent_package_features_parent_id_idx" ON "additional_rent_package_features" USING btree ("_parent_id");
  CREATE INDEX "additional_rent_updated_at_idx" ON "additional_rent" USING btree ("updated_at");
  CREATE INDEX "additional_rent_created_at_idx" ON "additional_rent" USING btree ("created_at");
  CREATE INDEX "map_markers_points_order_idx" ON "map_markers_points" USING btree ("_order");
  CREATE INDEX "map_markers_points_parent_id_idx" ON "map_markers_points" USING btree ("_parent_id");
  CREATE INDEX "map_markers_points_related_accommodation_idx" ON "map_markers_points" USING btree ("related_accommodation_id");
  CREATE INDEX "map_markers_points_related_meeting_event_area_idx" ON "map_markers_points" USING btree ("related_meeting_event_area_id");
  CREATE INDEX "map_markers_points_related_dining_area_idx" ON "map_markers_points" USING btree ("related_dining_area_id");
  CREATE INDEX "map_markers_points_related_attraction_idx" ON "map_markers_points" USING btree ("related_attraction_id");
  CREATE INDEX "map_markers_points_related_amenity_idx" ON "map_markers_points" USING btree ("related_amenity_id");
  CREATE INDEX "map_markers_updated_at_idx" ON "map_markers" USING btree ("updated_at");
  CREATE INDEX "map_markers_created_at_idx" ON "map_markers" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "customers_updated_at_idx" ON "customers" USING btree ("updated_at");
  CREATE INDEX "customers_created_at_idx" ON "customers" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_accommodations_id_idx" ON "payload_locked_documents_rels" USING btree ("accommodations_id");
  CREATE INDEX "payload_locked_documents_rels_activities_id_idx" ON "payload_locked_documents_rels" USING btree ("activities_id");
  CREATE INDEX "payload_locked_documents_rels_attractions_id_idx" ON "payload_locked_documents_rels" USING btree ("attractions_id");
  CREATE INDEX "payload_locked_documents_rels_amenities_id_idx" ON "payload_locked_documents_rels" USING btree ("amenities_id");
  CREATE INDEX "payload_locked_documents_rels_dining_area_id_idx" ON "payload_locked_documents_rels" USING btree ("dining_area_id");
  CREATE INDEX "payload_locked_documents_rels_meeting_event_area_id_idx" ON "payload_locked_documents_rels" USING btree ("meeting_event_area_id");
  CREATE INDEX "payload_locked_documents_rels_meeting_package_id_idx" ON "payload_locked_documents_rels" USING btree ("meeting_package_id");
  CREATE INDEX "payload_locked_documents_rels_games_ground_id_idx" ON "payload_locked_documents_rels" USING btree ("games_ground_id");
  CREATE INDEX "payload_locked_documents_rels_additional_rent_id_idx" ON "payload_locked_documents_rels" USING btree ("additional_rent_id");
  CREATE INDEX "payload_locked_documents_rels_map_markers_id_idx" ON "payload_locked_documents_rels" USING btree ("map_markers_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_customers_id_idx" ON "payload_locked_documents_rels" USING btree ("customers_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "footer_footer_image_idx" ON "footer" USING btree ("footer_image_id");
  CREATE INDEX "main_page_services_order_idx" ON "main_page_services" USING btree ("_order");
  CREATE INDEX "main_page_services_parent_id_idx" ON "main_page_services" USING btree ("_parent_id");
  CREATE INDEX "main_page_services_image_idx" ON "main_page_services" USING btree ("image_id");
  CREATE INDEX "main_page_features_order_idx" ON "main_page_features" USING btree ("_order");
  CREATE INDEX "main_page_features_parent_id_idx" ON "main_page_features" USING btree ("_parent_id");
  CREATE INDEX "main_page_testimonials_order_idx" ON "main_page_testimonials" USING btree ("_order");
  CREATE INDEX "main_page_testimonials_parent_id_idx" ON "main_page_testimonials" USING btree ("_parent_id");
  CREATE INDEX "main_page_testimonials_image_idx" ON "main_page_testimonials" USING btree ("image_id");
  CREATE INDEX "main_page_packages_order_idx" ON "main_page_packages" USING btree ("_order");
  CREATE INDEX "main_page_packages_parent_id_idx" ON "main_page_packages" USING btree ("_parent_id");
  CREATE INDEX "main_page_packages_image_idx" ON "main_page_packages" USING btree ("image_id");
  CREATE INDEX "main_page_activities_order_idx" ON "main_page_activities" USING btree ("_order");
  CREATE INDEX "main_page_activities_parent_id_idx" ON "main_page_activities" USING btree ("_parent_id");
  CREATE INDEX "main_page_activities_image_idx" ON "main_page_activities" USING btree ("image_id");
  CREATE INDEX "main_page_reviews_image_order_idx" ON "main_page_reviews_image" USING btree ("_order");
  CREATE INDEX "main_page_reviews_image_parent_id_idx" ON "main_page_reviews_image" USING btree ("_parent_id");
  CREATE INDEX "main_page_reviews_image_image_idx" ON "main_page_reviews_image" USING btree ("image_id");
  CREATE INDEX "main_page_reviews_order_idx" ON "main_page_reviews" USING btree ("_order");
  CREATE INDEX "main_page_reviews_parent_id_idx" ON "main_page_reviews" USING btree ("_parent_id");
  CREATE INDEX "main_page_reviews_customer_image_idx" ON "main_page_reviews" USING btree ("customer_image_id");
  CREATE INDEX "main_page_social_links_order_idx" ON "main_page_social_links" USING btree ("_order");
  CREATE INDEX "main_page_social_links_parent_id_idx" ON "main_page_social_links" USING btree ("_parent_id");
  CREATE INDEX "main_page_hero_image_idx" ON "main_page" USING btree ("hero_image_id");
  CREATE INDEX "main_page_about_image_idx" ON "main_page" USING btree ("about_image_id");
  CREATE INDEX "main_page_location_image_idx" ON "main_page" USING btree ("location_image_id");
  CREATE INDEX "main_page_social_background_image_idx" ON "main_page" USING btree ("social_background_image_id");
  CREATE INDEX "main_page_seo_seo_og_image_idx" ON "main_page" USING btree ("seo_og_image_id");
  CREATE INDEX "map_page_seo_seo_og_image_idx" ON "map_page" USING btree ("seo_og_image_id");
  CREATE INDEX "accommodations_page_seo_structured_data_amenities_order_idx" ON "accommodations_page_seo_structured_data_amenities" USING btree ("_order");
  CREATE INDEX "accommodations_page_seo_structured_data_amenities_parent_id_idx" ON "accommodations_page_seo_structured_data_amenities" USING btree ("_parent_id");
  CREATE INDEX "accommodations_page_hero_image_idx" ON "accommodations_page" USING btree ("hero_image_id");
  CREATE INDEX "accommodations_page_seo_seo_og_image_idx" ON "accommodations_page" USING btree ("seo_og_image_id");
  CREATE INDEX "villa_page_seo_structured_data_amenities_order_idx" ON "villa_page_seo_structured_data_amenities" USING btree ("_order");
  CREATE INDEX "villa_page_seo_structured_data_amenities_parent_id_idx" ON "villa_page_seo_structured_data_amenities" USING btree ("_parent_id");
  CREATE INDEX "villa_page_hero_background_image_idx" ON "villa_page" USING btree ("hero_background_image_id");
  CREATE INDEX "villa_page_seo_seo_og_image_idx" ON "villa_page" USING btree ("seo_og_image_id");
  CREATE INDEX "cottage_page_seo_structured_data_amenities_order_idx" ON "cottage_page_seo_structured_data_amenities" USING btree ("_order");
  CREATE INDEX "cottage_page_seo_structured_data_amenities_parent_id_idx" ON "cottage_page_seo_structured_data_amenities" USING btree ("_parent_id");
  CREATE INDEX "cottage_page_hero_background_image_idx" ON "cottage_page" USING btree ("hero_background_image_id");
  CREATE INDEX "cottage_page_seo_seo_og_image_idx" ON "cottage_page" USING btree ("seo_og_image_id");
  CREATE INDEX "cabin_page_seo_structured_data_amenities_order_idx" ON "cabin_page_seo_structured_data_amenities" USING btree ("_order");
  CREATE INDEX "cabin_page_seo_structured_data_amenities_parent_id_idx" ON "cabin_page_seo_structured_data_amenities" USING btree ("_parent_id");
  CREATE INDEX "cabin_page_hero_background_image_idx" ON "cabin_page" USING btree ("hero_background_image_id");
  CREATE INDEX "cabin_page_seo_seo_og_image_idx" ON "cabin_page" USING btree ("seo_og_image_id");
  CREATE INDEX "camping_ground_page_seo_structured_data_amenities_order_idx" ON "camping_ground_page_seo_structured_data_amenities" USING btree ("_order");
  CREATE INDEX "camping_ground_page_seo_structured_data_amenities_parent_id_idx" ON "camping_ground_page_seo_structured_data_amenities" USING btree ("_parent_id");
  CREATE INDEX "camping_ground_page_hero_background_image_idx" ON "camping_ground_page" USING btree ("hero_background_image_id");
  CREATE INDEX "camping_ground_page_seo_seo_og_image_idx" ON "camping_ground_page" USING btree ("seo_og_image_id");
  CREATE INDEX "attraction_amenities_page_seo_schema_categories_order_idx" ON "attraction_amenities_page_seo_schema_categories" USING btree ("_order");
  CREATE INDEX "attraction_amenities_page_seo_schema_categories_parent_id_idx" ON "attraction_amenities_page_seo_schema_categories" USING btree ("_parent_id");
  CREATE INDEX "attraction_amenities_page_seo_schema_amenities_order_idx" ON "attraction_amenities_page_seo_schema_amenities" USING btree ("_order");
  CREATE INDEX "attraction_amenities_page_seo_schema_amenities_parent_id_idx" ON "attraction_amenities_page_seo_schema_amenities" USING btree ("_parent_id");
  CREATE INDEX "attraction_amenities_page_seo_schema_hours_days_order_idx" ON "attraction_amenities_page_seo_schema_hours_days" USING btree ("_order");
  CREATE INDEX "attraction_amenities_page_seo_schema_hours_days_parent_id_idx" ON "attraction_amenities_page_seo_schema_hours_days" USING btree ("_parent_id");
  CREATE INDEX "attraction_amenities_page_hero_image_idx" ON "attraction_amenities_page" USING btree ("hero_image_id");
  CREATE INDEX "attraction_amenities_page_seo_seo_og_image_idx" ON "attraction_amenities_page" USING btree ("seo_og_image_id");
  CREATE INDEX "activities_page_hero_image_idx" ON "activities_page" USING btree ("hero_image_id");
  CREATE INDEX "activities_page_meta_meta_image_idx" ON "activities_page" USING btree ("meta_image_id");
  CREATE INDEX "dining_page_hero_image_idx" ON "dining_page" USING btree ("hero_image_id");
  CREATE INDEX "dining_page_meta_meta_image_idx" ON "dining_page" USING btree ("meta_image_id");
  CREATE INDEX "events_page_hero_image_idx" ON "events_page" USING btree ("hero_image_id");
  CREATE INDEX "events_page_meeting_and_event_area_outdoor_image_idx" ON "events_page" USING btree ("meeting_and_event_area_outdoor_image_id");
  CREATE INDEX "events_page_meeting_and_event_area_indoor_image_idx" ON "events_page" USING btree ("meeting_and_event_area_indoor_image_id");
  CREATE INDEX "events_page_meta_meta_image_idx" ON "events_page" USING btree ("meta_image_id");
  CREATE INDEX "events_indoor_page_hero_image_idx" ON "events_indoor_page" USING btree ("hero_image_id");
  CREATE INDEX "events_indoor_page_meta_meta_image_idx" ON "events_indoor_page" USING btree ("meta_image_id");
  CREATE INDEX "events_outdoor_page_hero_image_idx" ON "events_outdoor_page" USING btree ("hero_image_id");
  CREATE INDEX "events_outdoor_page_meta_meta_image_idx" ON "events_outdoor_page" USING btree ("meta_image_id");
  CREATE INDEX "reservation_faq_page_must_know_section_info_cards_order_idx" ON "reservation_faq_page_must_know_section_info_cards" USING btree ("_order");
  CREATE INDEX "reservation_faq_page_must_know_section_info_cards_parent_id_idx" ON "reservation_faq_page_must_know_section_info_cards" USING btree ("_parent_id");
  CREATE INDEX "reservation_faq_page_faq_section_faqs_order_idx" ON "reservation_faq_page_faq_section_faqs" USING btree ("_order");
  CREATE INDEX "reservation_faq_page_faq_section_faqs_parent_id_idx" ON "reservation_faq_page_faq_section_faqs" USING btree ("_parent_id");
  CREATE INDEX "reservation_faq_page_contact_section_images_order_idx" ON "reservation_faq_page_contact_section_images" USING btree ("_order");
  CREATE INDEX "reservation_faq_page_contact_section_images_parent_id_idx" ON "reservation_faq_page_contact_section_images" USING btree ("_parent_id");
  CREATE INDEX "reservation_faq_page_contact_section_images_image_idx" ON "reservation_faq_page_contact_section_images" USING btree ("image_id");
  CREATE INDEX "reservation_faq_page_contact_section_contacts_order_idx" ON "reservation_faq_page_contact_section_contacts" USING btree ("_order");
  CREATE INDEX "reservation_faq_page_contact_section_contacts_parent_id_idx" ON "reservation_faq_page_contact_section_contacts" USING btree ("_parent_id");
  CREATE INDEX "reservation_faq_page_terms_section_rules_order_idx" ON "reservation_faq_page_terms_section_rules" USING btree ("_order");
  CREATE INDEX "reservation_faq_page_terms_section_rules_parent_id_idx" ON "reservation_faq_page_terms_section_rules" USING btree ("_parent_id");
  CREATE INDEX "reservation_faq_page_terms_section_rules_icon_idx" ON "reservation_faq_page_terms_section_rules" USING btree ("icon_id");
  CREATE INDEX "reservation_faq_page_reservation_c_t_a_reservation_c_t_a_background_image_idx" ON "reservation_faq_page" USING btree ("reservation_c_t_a_background_image_id");
  CREATE INDEX "reservation_faq_page_reservation_c_t_a_reservation_c_t_a_icon_idx" ON "reservation_faq_page" USING btree ("reservation_c_t_a_icon_id");
  CREATE INDEX "reservation_faq_page_seo_seo_og_image_idx" ON "reservation_faq_page" USING btree ("seo_og_image_id");
  CREATE INDEX "reservation_form_page_meta_meta_image_idx" ON "reservation_form_page" USING btree ("meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "accommodations_images" CASCADE;
  DROP TABLE "accommodations_bed_configuration" CASCADE;
  DROP TABLE "accommodations_tent_configuration" CASCADE;
  DROP TABLE "accommodations_other" CASCADE;
  DROP TABLE "accommodations" CASCADE;
  DROP TABLE "_accommodations_v_version_images" CASCADE;
  DROP TABLE "_accommodations_v_version_bed_configuration" CASCADE;
  DROP TABLE "_accommodations_v_version_tent_configuration" CASCADE;
  DROP TABLE "_accommodations_v_version_other" CASCADE;
  DROP TABLE "_accommodations_v" CASCADE;
  DROP TABLE "activities_points" CASCADE;
  DROP TABLE "activities" CASCADE;
  DROP TABLE "attractions_points" CASCADE;
  DROP TABLE "attractions" CASCADE;
  DROP TABLE "amenities_points" CASCADE;
  DROP TABLE "amenities" CASCADE;
  DROP TABLE "dining_area_points" CASCADE;
  DROP TABLE "dining_area" CASCADE;
  DROP TABLE "meeting_event_area_images" CASCADE;
  DROP TABLE "meeting_event_area" CASCADE;
  DROP TABLE "meeting_package_features" CASCADE;
  DROP TABLE "meeting_package_package_features_special_features" CASCADE;
  DROP TABLE "meeting_package_package_features" CASCADE;
  DROP TABLE "meeting_package" CASCADE;
  DROP TABLE "games_ground_points" CASCADE;
  DROP TABLE "games_ground" CASCADE;
  DROP TABLE "additional_rent_package_features" CASCADE;
  DROP TABLE "additional_rent" CASCADE;
  DROP TABLE "map_markers_points" CASCADE;
  DROP TABLE "map_markers" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "customers" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "main_page_services" CASCADE;
  DROP TABLE "main_page_features" CASCADE;
  DROP TABLE "main_page_testimonials" CASCADE;
  DROP TABLE "main_page_packages" CASCADE;
  DROP TABLE "main_page_activities" CASCADE;
  DROP TABLE "main_page_reviews_image" CASCADE;
  DROP TABLE "main_page_reviews" CASCADE;
  DROP TABLE "main_page_social_links" CASCADE;
  DROP TABLE "main_page" CASCADE;
  DROP TABLE "map_page" CASCADE;
  DROP TABLE "accommodations_page_seo_structured_data_amenities" CASCADE;
  DROP TABLE "accommodations_page" CASCADE;
  DROP TABLE "villa_page_seo_structured_data_amenities" CASCADE;
  DROP TABLE "villa_page" CASCADE;
  DROP TABLE "cottage_page_seo_structured_data_amenities" CASCADE;
  DROP TABLE "cottage_page" CASCADE;
  DROP TABLE "cabin_page_seo_structured_data_amenities" CASCADE;
  DROP TABLE "cabin_page" CASCADE;
  DROP TABLE "camping_ground_page_seo_structured_data_amenities" CASCADE;
  DROP TABLE "camping_ground_page" CASCADE;
  DROP TABLE "attraction_amenities_page_seo_schema_categories" CASCADE;
  DROP TABLE "attraction_amenities_page_seo_schema_amenities" CASCADE;
  DROP TABLE "attraction_amenities_page_seo_schema_hours_days" CASCADE;
  DROP TABLE "attraction_amenities_page" CASCADE;
  DROP TABLE "activities_page" CASCADE;
  DROP TABLE "dining_page" CASCADE;
  DROP TABLE "events_page" CASCADE;
  DROP TABLE "events_indoor_page" CASCADE;
  DROP TABLE "events_outdoor_page" CASCADE;
  DROP TABLE "reservation_faq_page_must_know_section_info_cards" CASCADE;
  DROP TABLE "reservation_faq_page_faq_section_faqs" CASCADE;
  DROP TABLE "reservation_faq_page_contact_section_images" CASCADE;
  DROP TABLE "reservation_faq_page_contact_section_contacts" CASCADE;
  DROP TABLE "reservation_faq_page_terms_section_rules" CASCADE;
  DROP TABLE "reservation_faq_page" CASCADE;
  DROP TABLE "reservation_form_page" CASCADE;
  DROP TABLE "contact_form" CASCADE;
  DROP TYPE "public"."accommodations_bed_type";
  DROP TYPE "public"."accommodations_type";
  DROP TYPE "public"."accommodations_location";
  DROP TYPE "public"."enum_accommodations_unit_type";
  DROP TYPE "public"."enum_accommodations_cabin_type";
  DROP TYPE "public"."enum_accommodations_status";
  DROP TYPE "public"."enum__accommodations_v_version_unit_type";
  DROP TYPE "public"."enum__accommodations_v_version_cabin_type";
  DROP TYPE "public"."enum__accommodations_v_version_status";
  DROP TYPE "public"."enum_activities_age_range";
  DROP TYPE "public"."enum_attractions_age_range";
  DROP TYPE "public"."meeting_event_area_location";
  DROP TYPE "public"."meeting_event_area_building_type";
  DROP TYPE "public"."meeting_event_area_area_type";
  DROP TYPE "public"."enum_main_page_activities_icon";
  DROP TYPE "public"."enum_main_page_social_links_platform";
  DROP TYPE "public"."enum_main_page_seo_structured_data_organization_type";
  DROP TYPE "public"."enum_accommodations_page_seo_structured_data_accommodation_type";
  DROP TYPE "public"."enum_villa_page_seo_structured_data_accommodation_type";
  DROP TYPE "public"."enum_cottage_page_seo_structured_data_accommodation_type";
  DROP TYPE "public"."enum_cabin_page_seo_structured_data_accommodation_type";
  DROP TYPE "public"."enum_camping_ground_page_seo_structured_data_accommodation_type";
  DROP TYPE "public"."enum_attraction_amenities_page_seo_schema_categories_item";
  DROP TYPE "public"."enum_attraction_amenities_page_seo_schema_amenities_item";
  DROP TYPE "public"."enum_attraction_amenities_page_seo_schema_hours_days_day";
  DROP TYPE "public"."enum_attraction_amenities_page_seo_schema_type";
  DROP TYPE "public"."enum_attraction_amenities_page_seo_schema_price";
  DROP TYPE "public"."enum_reservation_faq_page_must_know_section_info_cards_icon";
  DROP TYPE "public"."enum_reservation_faq_page_contact_section_contacts_type";`)
}
