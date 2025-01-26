import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  integer,
  boolean,
  date,
  json,
  decimal,
  PgTable,
} from "drizzle-orm/pg-core";

// USERS
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    role: text("role").notNull().default("employee"),
    image: text("image"),
    department: text("department"),
    position: text("position"),
    employeeId: text("employeeId"),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("user_email_idx").on(table.email),
    employeeIdIdx: uniqueIndex("employee_id_idx").on(table.employeeId),
  })
);

// PERFORMANCE REVIEWS
export const performanceReviews = pgTable("performance_reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId").references(() => users.id),
  reviewerId: uuid("reviewerId").references(() => users.id),
  reviewPeriod: text("reviewPeriod").notNull(), // e.g., "2024-Q1"
  status: text("status").notNull().default("pending"), // pending, in_progress, completed
  businessDevelopmentScore: decimal("businessDevelopmentScore", {
    precision: 4,
    scale: 2,
  }),
  projectImplementationScore: decimal("projectImplementationScore", {
    precision: 4,
    scale: 2,
  }),
  brandingScore: decimal("brandingScore", { precision: 4, scale: 2 }),
  peopleProcessScore: decimal("peopleProcessScore", { precision: 4, scale: 2 }),
  overallScore: decimal("overallScore", { precision: 4, scale: 2 }),
  feedback: text("feedback"),
  goals: json("goals").default([]),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// KPIs
export const kpis = pgTable("kpis", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // business_development, project_implementation, etc.
  metric: text("metric").notNull(),
  target: decimal("target", { precision: 10, scale: 2 }),
  weight: integer("weight").notNull(),
  active: boolean("active").default(true),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// ATTENDANCE
export const attendance = pgTable("attendance", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId").references(() => users.id),
  date: date("date").notNull(),
  checkIn: timestamp("checkIn"),
  checkOut: timestamp("checkOut"),
  status: text("status").notNull(), // present, absent, late, leave
  workMode: text("workMode").default("office"), // office, remote, hybrid
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// LEAVE MANAGEMENT
export const leaves = pgTable("leaves", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId").references(() => users.id),
  approverId: uuid("approverId").references(() => users.id),
  type: text("type").notNull(), // annual, sick, maternity, etc.
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  reason: text("reason"),
  approverNotes: text("approverNotes"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// GOALS
export const goals = pgTable("goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId").references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  status: text("status").notNull().default("in_progress"),
  startDate: date("startDate"),
  dueDate: date("dueDate"),
  completedDate: date("completedDate"),
  priority: text("priority").default("medium"),
  progress: integer("progress").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// FEEDBACK
export const feedback = pgTable("feedback", {
  id: uuid("id").defaultRandom().primaryKey(),
  fromUserId: uuid("fromUserId").references(() => users.id),
  toUserId: uuid("toUserId").references(() => users.id),
  type: text("type").notNull(), // peer, manager, self
  content: text("content").notNull(),
  rating: integer("rating"),
  reviewPeriod: text("reviewPeriod"),
  visibility: text("visibility").default("private"), // private, public
  createdAt: timestamp("createdAt").defaultNow(),
});

// DEPARTMENTS
export const departments = pgTable("departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  managerId: uuid("managerId").references(() => users.id),
  active: boolean("active").default(true),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}) satisfies PgTable;

// Add self-reference as a separate relation
export const departmentsRelations = pgTable("departments_relations", {
  departmentId: uuid("department_id").references(() => departments.id),
  parentDepartmentId: uuid("parent_department_id").references(
    () => departments.id
  ),
}) satisfies PgTable;
