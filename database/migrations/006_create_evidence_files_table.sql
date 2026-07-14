CREATE TABLE IF NOT EXISTS evidence_files (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    audit_id UUID NOT NULL,

    file_url TEXT NOT NULL,

    file_name VARCHAR(255),

    file_type VARCHAR(30) NOT NULL,

    file_size BIGINT,

    mime_type VARCHAR(100),

    capture_method VARCHAR(30),

    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_evidence_audit
        FOREIGN KEY (audit_id)
        REFERENCES audits(id)
        ON DELETE CASCADE

);