CREATE TABLE IF NOT EXISTS constituencies (
    id SERIAL PRIMARY KEY,
    county_id INTEGER NOT NULL,
    constituency_name VARCHAR(150) NOT NULL,
    mp_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_county
        FOREIGN KEY (county_id)
        REFERENCES counties(id)
        ON DELETE CASCADE
);