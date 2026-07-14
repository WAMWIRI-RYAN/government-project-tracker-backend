CREATE TABLE IF NOT EXISTS audits (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tracking_id VARCHAR(20) UNIQUE NOT NULL,

    user_id UUID NOT NULL,

    project_id UUID NOT NULL,

    ground_status VARCHAR(50) NOT NULL,

    progress_estimate INTEGER CHECK (
        progress_estimate >= 0
        AND progress_estimate <= 100
    ),

    quality_assessment VARCHAR(30),

    safety_assessment VARCHAR(30),

    comments TEXT,

    gps_latitude DOUBLE PRECISION,

    gps_longitude DOUBLE PRECISION,

    is_gps_verified BOOLEAN DEFAULT FALSE,

    gps_offset_meters INTEGER,

    verification_status VARCHAR(30) DEFAULT 'PENDING',

    verified_by UUID,

    verified_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_audit_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_verified_by
        FOREIGN KEY (verified_by)
        REFERENCES users(id)
        ON DELETE SET NULL

);