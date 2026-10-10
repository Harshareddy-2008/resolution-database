import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(),
  systemUserId: text("system_user_id").notNull().unique(),
  email: text("email").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("user"), // 'user' | 'company' | 'coaching' | 'admin'
  emailVerified: boolean("email_verified").notNull().default(false),
  twoFactorEnabled: boolean("two_factor_enabled").notNull().default(false),
  status: text("status").notNull().default("active"), // 'active' | 'suspended'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull()
    .unique(),
  dob: text("dob"),
  gender: text("gender"),
  mobileNumber: text("mobile_number"),
  country: text("country").default("India"),
  state: text("state"),
  city: text("city"),
  postalCode: text("postal_code"),
  highestQualification: text("highest_qualification"),
  collegeName: text("college_name"),
  graduationYear: integer("graduation_year"),
  fieldOfStudy: text("field_of_study"),
  careerStatus: text("career_status").notNull().default("unemployed_graduate"),
  // 'undergraduate' | 'unemployed_graduate' | 'employed_graduate' | 'postgraduate' | 'other'
  currentYear: text("current_year"),
  expectedGradYear: integer("expected_grad_year"),
  interests: text("interests"),
  preferredJobRoles: text("preferred_job_roles"),
  preferredLocation: text("preferred_location"),
  expectedSalary: integer("expected_salary"),
  currentCompany: text("current_company"),
  currentDesignation: text("current_designation"),
  currentIndustry: text("current_industry"),
  workLocation: text("work_location"),
  joiningDate: text("joining_date"),
  currentSalary: integer("current_salary"),
  experienceYears: integer("experience_years").default(0),
  employeeIdEncrypted: text("employee_id_encrypted"),
  savedJobIds: jsonb("saved_job_ids").default([]),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const educationRecords = pgTable("education_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  degree: text("degree").notNull(),
  branch: text("branch"),
  institution: text("institution").notNull(),
  startYear: integer("start_year"),
  endYear: integer("end_year"),
  grade: text("grade"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const employmentRecords = pgTable("employment_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  companyName: text("company_name").notNull(),
  designation: text("designation").notNull(),
  industry: text("industry"),
  location: text("location"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isCurrent: boolean("is_current").default(true),
  salary: integer("salary"),
  currency: text("currency").default("INR"),
  verificationStatus: text("verification_status").default("self_reported"),
  // 'self_reported' | 'employer_verified' | 'unverified'
  isPlacementOrigin: boolean("is_placement_origin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  fileName: text("file_name").notNull(),
  fileMimeType: text("file_mime_type").default("application/pdf"),
  rawText: text("raw_text"),
  aiSummary: text("ai_summary"),
  readinessScore: integer("readiness_score"),
  readinessExplanation: text("readiness_explanation"),
  readinessLimitations: text("readiness_limitations"),
  experienceYearsExtracted: integer("experience_years_extracted").default(0),
  suggestedJobRoles: jsonb("suggested_job_roles").default([]),
  missingSkillsAnalysis: jsonb("missing_skills_analysis").default([]),
  improvementSuggestions: jsonb("improvement_suggestions").default([]),
  extractedProjects: jsonb("extracted_projects").default([]),
  extractedCertifications: jsonb("extracted_certifications").default([]),
  extractedEducation: jsonb("extracted_education").default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  category: text("category").notNull(), // 'technical' | 'programming' | 'tool' | 'soft' | 'domain'
  demandScore: integer("demand_score").default(75),
  avgSalaryImpact: integer("avg_salary_impact").default(850000),
  createdAt: timestamp("created_at").defaultNow(),
});

export const extractedSkills = pgTable("extracted_skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  resumeId: integer("resume_id").references(() => resumes.id),
  skillName: text("skill_name").notNull(),
  category: text("category").notNull().default("technical"),
  proficiency: text("proficiency").notNull().default("Intermediate"),
  sourceType: text("source_type").notNull().default("explicit"), // 'explicit' | 'inferred' | 'user_added'
  evidenceExplanation: text("evidence_explanation"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  ownerUserId: integer("owner_user_id").references(() => users.id),
  companyName: text("company_name").notNull(),
  officialEmail: text("official_email").notNull(),
  contactPerson: text("contact_person").notNull(),
  contactNumber: text("contact_number").notNull(),
  website: text("website"),
  description: text("description"),
  industry: text("industry").notNull(),
  companySize: text("company_size"),
  yearEstablished: integer("year_established"),
  headquarters: text("headquarters"),
  country: text("country").default("India"),
  state: text("state"),
  city: text("city"),
  officeAddress: text("office_address"),
  logoUrl: text("logo_url"),
  verificationDocuments: text("verification_documents"),
  verificationStatus: text("verification_status").notNull().default("pending"),
  // 'pending' | 'approved' | 'rejected'
  createdAt: timestamp("created_at").defaultNow(),
});

export const companyLocations = pgTable("company_locations", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .references(() => companies.id)
    .notNull(),
  city: text("city").notNull(),
  state: text("state"),
  country: text("country").notNull().default("India"),
  address: text("address"),
  isHeadquarters: boolean("is_headquarters").default(false),
});

export const recruiters = pgTable("recruiters", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .references(() => companies.id)
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  designation: text("designation").notNull(),
  department: text("department"),
  isPrimary: boolean("is_primary").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobListings = pgTable("job_listings", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .references(() => companies.id)
    .notNull(),
  jobTitle: text("job_title").notNull(),
  department: text("department"),
  industry: text("industry").notNull(),
  description: text("description").notNull(),
  requiredSkills: jsonb("required_skills").notNull().default([]),
  preferredSkills: jsonb("preferred_skills").default([]),
  educationalQualifications: text("educational_qualifications"),
  requiredExperience: integer("required_experience").default(0),
  vacancies: integer("vacancies").default(1),
  employmentType: text("employment_type").notNull().default("Full-Time"),
  workMode: text("work_mode").notNull().default("Hybrid"), // 'On-site' | 'Hybrid' | 'Remote'
  location: text("location").notNull(),
  country: text("country").default("India"),
  salaryMin: integer("salary_min").notNull(),
  salaryMax: integer("salary_max").notNull(),
  currency: text("currency").default("INR"),
  benefits: text("benefits"),
  applicationDeadline: text("application_deadline"),
  interviewProcess: text("interview_process"),
  requiredCertifications: text("required_certifications"),
  status: text("status").notNull().default("published"), // 'published' | 'paused' | 'closed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .references(() => jobListings.id)
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  status: text("status").notNull().default("Applied"),
  // 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Offered' | 'Hired' | 'Rejected'
  aiMatchScore: integer("ai_match_score").default(0),
  matchingSkills: jsonb("matching_skills").default([]),
  missingSkills: jsonb("missing_skills").default([]),
  matchExplanation: text("match_explanation"),
  coverNote: text("cover_note"),
  appliedAt: timestamp("applied_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const interviews = pgTable("interviews", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id")
    .references(() => jobApplications.id)
    .notNull(),
  scheduledAt: text("scheduled_at").notNull(),
  mode: text("mode").notNull().default("Video Call"),
  meetingLinkOrLocation: text("meeting_link_or_location"),
  interviewerName: text("interviewer_name"),
  notes: text("notes"),
  status: text("status").default("Scheduled"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const placements = pgTable("placements", {
  id: serial("id").primaryKey(),
  candidateUserId: integer("candidate_user_id")
    .references(() => users.id)
    .notNull(),
  jobId: integer("job_id").references(() => jobListings.id),
  companyId: integer("company_id")
    .references(() => companies.id)
    .notNull(),
  companyName: text("company_name").notNull(),
  designation: text("designation").notNull(),
  industry: text("industry").default("Technology"),
  joiningDate: text("joining_date").notNull(),
  workLocation: text("work_location").notNull(),
  offeredSalary: integer("offered_salary").notNull(),
  currency: text("currency").default("INR"),
  employmentType: text("employment_type").default("Full-Time"),
  confirmationStatus: text("confirmation_status").default("Confirmed"),
  candidateConsent: boolean("candidate_consent").default(true),
  coachingCenterAttributedId: integer("coaching_center_attributed_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const coachingCenters = pgTable("coaching_centers", {
  id: serial("id").primaryKey(),
  ownerUserId: integer("owner_user_id").references(() => users.id),
  centerName: text("center_name").notNull(),
  officialEmail: text("official_email").notNull(),
  contactNumber: text("contact_number").notNull(),
  website: text("website"),
  description: text("description"),
  country: text("country").default("India"),
  state: text("state"),
  city: text("city").notNull(),
  address: text("address"),
  trainingMode: text("training_mode").notNull().default("Hybrid"),
  trainingDomains: jsonb("training_domains").default([]),
  trainerDetails: text("trainer_details"),
  logoUrl: text("logo_url"),
  accreditationDocs: text("accreditation_docs"),
  approvalStatus: text("approval_status").notNull().default("pending"),
  // 'pending' | 'approved' | 'rejected'
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  centerId: integer("center_id")
    .references(() => coachingCenters.id)
    .notNull(),
  courseName: text("course_name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  skillsTaught: jsonb("skills_taught").notNull().default([]),
  level: text("level").notNull().default("Intermediate"), // 'Beginner' | 'Intermediate' | 'Advanced'
  duration: text("duration").notNull(),
  fees: integer("fees").notNull(),
  currency: text("currency").default("INR"),
  deliveryMode: text("delivery_mode").notNull().default("Online"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  classSchedule: text("class_schedule"),
  prerequisites: text("prerequisites"),
  trainerInfo: text("trainer_info"),
  certificationDetails: text("certification_details"),
  syllabus: text("syllabus"),
  enrollmentCapacity: integer("enrollment_capacity").default(50),
  completionCriteria: text("completion_criteria"),
  placementAssistance: boolean("placement_assistance").default(true),
  rating: integer("rating").default(48), // 48 = 4.8
  createdAt: timestamp("created_at").defaultNow(),
});

export const courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id")
    .references(() => courses.id)
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  status: text("status").notNull().default("Active"), // 'Active' | 'Completed' | 'Dropped'
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  feedbackRating: integer("feedback_rating"),
  feedbackComment: text("feedback_comment"),
});

export const courseProgress = pgTable("course_progress", {
  id: serial("id").primaryKey(),
  enrollmentId: integer("enrollment_id")
    .references(() => courseEnrollments.id)
    .notNull(),
  progressPercentage: integer("progress_percentage").notNull().default(0),
  modulesCompleted: integer("modules_completed").default(0),
  totalModules: integer("total_modules").default(10),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
});

export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  courseId: integer("course_id").references(() => courses.id),
  title: text("title").notNull(),
  issuingOrganization: text("issuing_organization").notNull(),
  issueDate: text("issue_date").notNull(),
  credentialCode: text("credential_code").notNull(),
  skillsAcquired: jsonb("skills_acquired").default([]),
  isVerified: boolean("is_verified").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const salaryHistory = pgTable("salary_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  recordedDate: text("recorded_date").notNull(),
  annualSalary: integer("annual_salary").notNull(),
  currency: text("currency").default("INR"),
  companyName: text("company_name").notNull(),
  roleTitle: text("role_title").notNull(),
  industry: text("industry").default("Technology"),
  stageType: text("stage_type").notNull().default("update"),
  // 'initial' | 'placement' | 'promotion' | 'transition' | 'retention_checkin'
  verificationStatus: text("verification_status").notNull().default("self_reported"),
  // 'self_reported' | 'employer_verified' | 'unverified'
  createdAt: timestamp("created_at").defaultNow(),
});

export const careerMilestones = pgTable("career_milestones", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  milestoneType: text("milestone_type").notNull(),
  // 'education' | 'course_completed' | 'certification' | 'placement' | 'promotion' | 'role_change' | 'skill_acquired'
  title: text("title").notNull(),
  organization: text("organization"),
  description: text("description"),
  milestoneDate: text("milestone_date").notNull(),
  verificationStatus: text("verification_status").default("self_reported"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const retentionCheckIns = pgTable("retention_check_ins", {
  id: serial("id").primaryKey(),
  placementId: integer("placement_id")
    .references(() => placements.id)
    .notNull(),
  employeeUserId: integer("employee_user_id")
    .references(() => users.id)
    .notNull(),
  checkpointDays: integer("checkpoint_days").notNull(), // 90 | 180 | 365
  placementCompany: text("placement_company").notNull(),
  designation: text("designation").notNull(),
  joiningDate: text("joining_date").notNull(),
  followUpDueDate: text("follow_up_due_date").notNull(),
  emailNotificationStatus: text("email_notification_status").notNull().default("Pending"),
  // 'Pending' | 'Sent' | 'Delivered' | 'Failed'
  responseDate: text("response_date"),
  followUpStatus: text("follow_up_status").notNull().default("Scheduled"),
  // 'Scheduled' | 'Reminder Sent' | 'Awaiting Response' | 'Confirmed Employed' | 'Confirmed Unemployed' | 'Employment Changed' | 'Verification Required' | 'Closed'
  currentEmploymentStatus: text("current_employment_status").default("Unknown"),
  // 'Unknown' | 'Employed Same Company' | 'Employed Different Company' | 'Unemployed'
  remainsWithOriginalCompany: boolean("remains_with_original_company"),
  newCompanyName: text("new_company_name"),
  updatedSalary: integer("updated_salary"),
  assistanceRequested: boolean("assistance_requested").default(false),
  assistanceNotes: text("assistance_notes"),
  verificationStatus: text("verification_status").default("Unverified"),
  nextFollowUpDate: text("next_follow_up_date"),
  secureToken: text("secure_token").notNull(),
  reminderCount: integer("reminder_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const emailNotifications = pgTable("email_notifications", {
  id: serial("id").primaryKey(),
  recipientUserId: integer("recipient_user_id").references(() => users.id),
  recipientEmail: text("recipient_email").notNull(),
  templateType: text("template_type").notNull(),
  // '90_day_checkin' | '180_day_checkin' | '365_day_checkin' | 'placement_confirmation' | 'email_verification'
  subject: text("subject").notNull(),
  bodyPreview: text("body_preview").notNull(),
  deliveryStatus: text("delivery_status").notNull().default("Delivered"),
  // 'Queued' | 'Sent' | 'Delivered' | 'Failed'
  idempotencyKey: text("idempotency_key").notNull().unique(),
  sentAt: timestamp("sent_at").defaultNow(),
  errorMessage: text("error_message"),
});

export const userConsents = pgTable("user_consents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull()
    .unique(),
  shareProfileWithRecruiters: boolean("share_profile_with_recruiters").notNull().default(true),
  shareSalaryForAnalytics: boolean("share_salary_for_analytics").notNull().default(true),
  allowRetentionCheckInEmails: boolean("allow_retention_check_in_emails").notNull().default(true),
  shareResumeWithMatchedCompanies: boolean("share_resume_with_matched_companies").notNull().default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  actorUserId: integer("actor_user_id"),
  actorName: text("actor_name").notNull(),
  actorRole: text("actor_role").notNull(),
  action: text("action").notNull(),
  targetEntity: text("target_entity").notNull(),
  targetId: text("target_id"),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow(),
});
