CREATE TABLE IF NOT EXISTS user_achievements (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    achievement_name VARCHAR(255) NOT NULL,

    achievement_description TEXT,

    badge_icon VARCHAR(255),

    points_awarded INTEGER DEFAULT 0,

    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_achievement_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);