CREATE TABLE IF NOT EXISTS user_settings (

    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,

    hide_real_name BOOLEAN DEFAULT FALSE,

    require_biometrics BOOLEAN DEFAULT FALSE,

    alert_project_updates BOOLEAN DEFAULT TRUE,

    alert_watchlist BOOLEAN DEFAULT TRUE,

    alert_ai_risk BOOLEAN DEFAULT TRUE,

    alert_gov_response BOOLEAN DEFAULT TRUE,

    alert_email BOOLEAN DEFAULT TRUE,

    alert_sms BOOLEAN DEFAULT FALSE,

    dark_mode BOOLEAN DEFAULT FALSE,

    language VARCHAR(50) DEFAULT 'English',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);