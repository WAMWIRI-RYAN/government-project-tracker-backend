CREATE TABLE IF NOT EXISTS watchlist (

    user_id UUID NOT NULL,

    project_id UUID NOT NULL,

    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, project_id),

    CONSTRAINT fk_watchlist_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_watchlist_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE

);