CREATE TABLE "fleet_vehicles" (
	"fleet_id" uuid NOT NULL,
	"vehicle_plate_number" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "fleet_vehicles_fleet_id_vehicle_plate_number_pk" PRIMARY KEY("fleet_id","vehicle_plate_number")
);
--> statement-breakpoint
CREATE TABLE "fleets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"plate_number" varchar(255) PRIMARY KEY NOT NULL,
	"latitude" numeric(10, 8),
	"longitude" numeric(11, 8),
	"altitude" numeric(10, 2),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "fleet_vehicles" ADD CONSTRAINT "fleet_vehicles_fleet_id_fleets_id_fk" FOREIGN KEY ("fleet_id") REFERENCES "public"."fleets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fleet_vehicles" ADD CONSTRAINT "fleet_vehicles_vehicle_plate_number_vehicles_plate_number_fk" FOREIGN KEY ("vehicle_plate_number") REFERENCES "public"."vehicles"("plate_number") ON DELETE cascade ON UPDATE no action;