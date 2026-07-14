CREATE TABLE IF NOT EXISTS notifications (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID,

    project_id UUID,

    category VARCHAR(30) NOT NULL,

    priority VARCHAR(20) DEFAULT 'POSITIVE',

    title VARCHAR(255) NOT NULL,

    description TEXT NOT NULL,

    is_read BOOLEAN DEFAULT FALSE,

    is_gov_response BOOLEAN DEFAULT FALSE,

    action_url VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_notification_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_notification_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE SET NULL

);