CREATE TABLE IF NOT EXISTS project_timeline (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    project_id UUID NOT NULL,

    event_title VARCHAR(255) NOT NULL,

    event_description TEXT,

    status_color VARCHAR(20) DEFAULT 'PENDING',

    event_date DATE NOT NULL,

    created_by UUID,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_timeline_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_timeline_user
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL

);