const isProduction = process.env.NODE_ENV === 'production';

function validateProductionSettings() {
    if (!isProduction) return;

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET must be set in production environment');
    }
    if (!process.env.ADMIN_PASSWORD) {
        throw new Error('ADMIN_PASSWORD must be changed in production environment');
    }
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI must be set in production environment');
    }
}

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI ,
    JWT_SECRET: process.env.JWT_SECRET ,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ,
    NODE_ENV: process.env.NODE_ENV ,
    validateProductionSettings
};

