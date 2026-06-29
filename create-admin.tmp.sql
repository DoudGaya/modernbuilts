INSERT INTO "user" (
  "id",
  "name",
  "email",
  "password",
  "phone",
  "email_verified",
  "image",
  "role",
  "referralID",
  "isTwoFactorEnabled"
)
VALUES (
  'admin_c679d0b1e71648fe82664956a5739da0',
  'StableBricks Admin',
  'admin@stablebricks.com',
  '$2a$10$8dJ8pqCu82CDZfOvPaLHEuBqHykMFeJPhGPqAuUpRBpQv6.L6mQnu',
  NULL,
  NOW(),
  NULL,
  'ADMIN'::"UserRole",
  'ADMIN',
  false
)
ON CONFLICT ("email") DO UPDATE SET
  "name" = EXCLUDED."name",
  "password" = EXCLUDED."password",
  "role" = 'ADMIN'::"UserRole",
  "email_verified" = NOW(),
  "isTwoFactorEnabled" = false;
