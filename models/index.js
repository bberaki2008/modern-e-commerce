// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.hasOne(Category, {
  foreignKey: 'product_id',
  // When we delete a Product, make sure to also delete the associated Category.
  onDelete: 'CASCADE',
});
// Categories have many Products
Tag.hasMany(Product, {
  foreignKey: 'product_id',
  OnDelete: 'CASCADE',
})
// Products belongToMany Tags (through ProductTag)
Product.hasMany(Tag, {
  foreignKey: 'tag_id',
  OnDelete: 'CASCADE',
})
// Tags belongToMany Products (through ProductTag)
Tag.hasMany(ProductTag, {
  foreignKey: 'id',
  OnDelete: 'CASCADE',
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
