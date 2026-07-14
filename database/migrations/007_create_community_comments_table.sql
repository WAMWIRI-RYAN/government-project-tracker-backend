CREATE TABLE IF NOT EXISTS community_comments (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    project_id UUID NOT NULL,

    user_id UUID NOT NULL,

    comment_text TEXT NOT NULL,

    is_edited BOOLEAN DEFAULT FALSE,

    is_deleted BOOLEAN DEFAULT FALSE,

    parent_comment_id UUID,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_comment_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_comment_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_parent_comment
        FOREIGN KEY (parent_comment_id)
        REFERENCES community_comments(id)
        ON DELETE CASCADE

);