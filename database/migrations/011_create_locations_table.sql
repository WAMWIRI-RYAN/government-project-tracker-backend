CREATE TABLE IF NOT EXISTS locations (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(150) NOT NULL,

    level VARCHAR(20) NOT NULL,

    parent_id UUID,

    code VARCHAR(20) UNIQUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_parent_location
        FOREIGN KEY (parent_id)
        REFERENCES locations(id)
        ON DELETE CASCADE

);