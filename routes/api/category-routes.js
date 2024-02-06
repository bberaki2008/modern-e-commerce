const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // This route uses async/await with '.catch()' for errors
// and no HTTP status codes
  const categoryData = await Category.findAll({
    include:[{model: Product }],
  }).catch((err) => {
    res.status(500).json(err);
  });
  res.json(categoryData);

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // Get one book from the book table
//   Category.findOne(
//     {
//       // Gets the book based on the isbn given in the request parameters
//       where: { 
//         id: req.params.id 
//       },
//     }
//   ).then((categoryData) => {
//     res.json(categoryData);
//   });
// });
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.post('/', async (req, res) => {
  // create a new category
  try {
  const categoryData = await Category.create(req.body);
  // 200 status code means the request is successful
  res.status(200).json(categoryData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // Calls the update method on the Book model
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      category_name: req.body.title,
    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      // Sends the updated book as a json response
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

// router.delete('/:id', async (req, res) => {
//   // delete a category by its `id` value
//   // Looks for the books based on isbn given in the request parameters and deletes the instance from the database
//   const deletedCategory = await Category.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((deletedCategory) => {
//       res.status(200).json(deletedCategory);
//     })
//     .catch((err) => res.status(500).json(err));
// });

module.exports = router;
