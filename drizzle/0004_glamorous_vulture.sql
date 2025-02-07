DROP INDEX "user_email_idx";--> statement-breakpoint
DROP INDEX "employee_id_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_userId_idx" ON "accounts" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_userId_idx" ON "sessions" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "users_employeeId_idx" ON "users" USING btree ("employeeId");