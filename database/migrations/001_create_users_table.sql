CREATE TABLE IF NOT EXISTS users (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    firebase_uid VARCHAR(255) UNIQUE,

    name VARCHAR(150) NOT NULL,

    username VARCHAR(100) UNIQUE,

    email VARCHAR(255) UNIQUE NOT NULL,

    password VARCHAR(255),

    bio TEXT,

    county VARCHAR(100),

    constituency VARCHAR(100),

    ward VARCHAR(100),

    visibility VARCHAR(20) DEFAULT 'REAL_NAME',

    hide_real_name BOOLEAN DEFAULT FALSE,

    profile_pic_url TEXT,

    interests TEXT[],

    skills TEXT[],

    role VARCHAR(20) DEFAULT 'CITIZEN',

    trust_score INTEGER DEFAULT 0,

    verified_reports INTEGER DEFAULT 0,

    account_status VARCHAR(20) DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);