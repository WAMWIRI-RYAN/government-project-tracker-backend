CREATE TABLE IF NOT EXISTS projects (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(255) NOT NULL,

    category VARCHAR(100),

    type VARCHAR(100),

    status VARCHAR(50) DEFAULT 'Ongoing',

    description TEXT,

    budget_allocated NUMERIC(15,2),

    funding_source VARCHAR(255),

    contractor VARCHAR(255),

    official_progress_pct INTEGER DEFAULT 0,

    citizen_progress_avg INTEGER DEFAULT 0,

    risk_score INTEGER DEFAULT 0,

    county VARCHAR(100),

    constituency VARCHAR(100),

    ward VARCHAR(100),

    governor VARCHAR(150),

    mp VARCHAR(150),

    mca VARCHAR(150),

    latitude DOUBLE PRECISION NOT NULL,

    longitude DOUBLE PRECISION NOT NULL,

    start_date DATE,

    expected_completion DATE,

    actual_completion DATE,

    created_by UUID REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);