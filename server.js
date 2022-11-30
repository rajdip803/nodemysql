const product1s = sequelize.define('/models/product1s');
const files = sequelize.define('/models/files');

files.hasOne(product1s); // A HasOne B
//A.belongsTo(B); // A BelongsTo B
product1s.hasMany(files); // A HasMany B
//A.belongsToMany(B);